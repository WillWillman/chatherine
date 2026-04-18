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

  const configuredModelId = commandContext
    .workspaceConfiguration
    .get('byoAI.model');

  const models = await aiClient.listModels();
  const configuredModel = models.find(m => m.id === configuredModelId) ?? (configuredModelId ? { id: configuredModelId } : undefined);

  if (configuredModel) {
    return aiClient.getModel(configuredModel);
  }

  return aiClient
    .listModels()
    .then(models => models.sort((a, b) => a.id.localeCompare(b.id)))
    .then(models => UserPromptClient.showQuickPick('Select a model', models.map(({ id }) => id)))
    .then(selectedId => models.find(m => m.id === selectedId))
    .then(model => aiClient.getModel(model));
};
