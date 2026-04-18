import * as vscode from 'vscode';
import { renderPrompt, UserMessage, AssistantMessage, PromptElement, BasePromptElementProps, PromptSizing } from '@vscode/prompt-tsx';
import { withFileContent, sendRequest, streamResponse } from '..';
import { extractTextContent } from '../extractTextContent';
import { ChatRequestHandler } from '../../../interfaces';

type ChatStreamOptions = {
  maxHistoryTurns?: number;
  maxReferencesCount?: number;
  budgetPercentage?: number;
};

type ChatStream = (instructions?: (string | object | number | boolean)[], options?: ChatStreamOptions) => ChatRequestHandler;

interface ChatPromptProps extends BasePromptElementProps {
  instructionText: string;
  references: any[];
  history: readonly (vscode.ChatRequestTurn | vscode.ChatResponseTurn)[];
  userPrompt: string;
}

class ChatPrompt extends PromptElement<ChatPromptProps> {
  render(_state: void, _sizing: PromptSizing) {
    const referencesText = this.props.references
      .map(ref => `\n\nFile: ${ref.value?.path || ref.value?.uri?.path || 'unknown'}\n\n${ref.fileContent || ''}`)
      .join('\n');

    const contextMessage = this.props.instructionText + (referencesText ? '\n' + referencesText : '');

    return (
      <>
        <UserMessage priority={100}>
          {contextMessage}
        </UserMessage>

        {this.props.history.map((turn, idx) => {
          if (turn instanceof vscode.ChatRequestTurn) {
            return (
              <UserMessage priority={50 - idx}>
                {turn.prompt}
              </UserMessage>
            );
          } else if (turn instanceof vscode.ChatResponseTurn) {
            return (
              <AssistantMessage priority={50 - idx}>
                {extractTextContent(turn)}
              </AssistantMessage>
            );
          }
          return null;
        })}

        <UserMessage priority={200}>
          {this.props.userPrompt}
        </UserMessage>
      </>
    );
  }
}

export const chatStream: ChatStream = (instructions = [], options = {}) => async (request, context, stream, token) => {
  // Get configuration
  const config = vscode.workspace.getConfiguration('chatherine');
  const maxHistoryTurns = options.maxHistoryTurns ?? config.get<number>('maxHistoryTurns', 5);
  const maxReferencesCount = options.maxReferencesCount ?? config.get<number>('maxReferencesCount', 10);
  const budgetPercentage = options.budgetPercentage ?? config.get<number>('tokenBudgetPercentage', 85);

  const references = await Promise.all(request.references.map(withFileContent(stream)));

  console.log('Chat stream request:', {
    model: request.model.id,
    instructions,
    userPrompt: request.prompt,
    tools: request.toolReferences,
    references,
    context,
  });

  const limitedReferences = references.slice(0, maxReferencesCount);
  const rawHistory = context.history.slice(-maxHistoryTurns);

  // Build prompt using @vscode/prompt-tsx for automatic token budget management
  const instructionText = Array.isArray(instructions)
    ? instructions.map(i => typeof i === 'string' ? i : JSON.stringify(i)).join('\n')
    : String(instructions);

  const { messages } = await renderPrompt(
    ChatPrompt,
    {
      instructionText,
      references: limitedReferences,
      history: rawHistory,
      userPrompt: request.prompt,
    },
    { modelMaxPromptTokens: Math.floor(request.model.maxInputTokens * budgetPercentage / 100) },
    request.model
  );

  await sendRequest(request.model, token)(messages, request.toolReferences)
    .then(streamResponse(stream))
    .catch(async (error) => {
      stream.progress('Error in chat stream' + error.message);
      if (error.message.includes('Model is not supported for this request.')) {
        const [baseModel] = await vscode.lm.selectChatModels({ vendor: 'copilot', family: 'gpt-4o' });
        stream.progress('Model is not supported for this request. Using backup model...' + baseModel.id);
        return sendRequest(baseModel, token)(messages, request.toolReferences)
          .then(streamResponse(stream));
      }
      throw error;
    });
};
