import {
  AIClient,
  SecretClient,
  UserPromptClient,
} from '../clients';

export const getModel = async (commandContext) => {
  const secretClient = SecretClient(commandContext);
  const aiClient = AIClient({
    apiKey: await secretClient.get('apiKey'),
    endpoint: await secretClient.get('endpoint'),
  });

  const configuredModel = commandContext
    .workspaceConfiguration
    .get('byoAI.model');

  if (configuredModel) {
    return aiClient.getModel(configuredModel);
  }

  return aiClient
    .listModels()
    .then(models => models.sort((a, b) => a.localeCompare(b)))
    .then(models => UserPromptClient.showQuickPick('Select a model', models))
    .then(aiClient.getModel);
};
