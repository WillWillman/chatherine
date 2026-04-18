import * as vscode from 'vscode';

export type BudgetConfig = {
  model: vscode.LanguageModelChat;
  budgetPercentage?: number;
};

export type BudgetItem = {
  content: any;
  priority: number;
  tokens?: number;
};

type ManageBudget = (config: BudgetConfig) => (items: BudgetItem[]) => Promise<BudgetItem[]>;

export const manageBudget: ManageBudget = ({ model, budgetPercentage = 85 }) => async (items) => {
  const maxTokens = Math.floor(model.maxInputTokens * (budgetPercentage / 100));

  // Sort by priority (lower number = higher priority)
  const sortedItems = [...items].sort((a, b) => a.priority - b.priority);

  // Count tokens for each item
  const itemsWithTokens = await Promise.all(
    sortedItems.map(async (item) => ({
      ...item,
      tokens: await countTokens(model, item.content),
    })),
  );

  // Select items that fit within budget
  const selectedItems: BudgetItem[] = [];
  let totalTokens = 0;

  for (const item of itemsWithTokens) {
    if (totalTokens + item.tokens <= maxTokens) {
      selectedItems.push(item);
      totalTokens += item.tokens;
    }
  }

  return selectedItems;
};

const countTokens = async (model: vscode.LanguageModelChat, content: any): Promise<number> => {
  try {
    const text = typeof content === 'string' ? content : JSON.stringify(content);
    return await model.countTokens(text);
  } catch {
    // Fallback: rough estimate of ~4 characters per token
    const text = typeof content === 'string' ? content : JSON.stringify(content);
    return Math.ceil(text.length / 4);
  }
};
