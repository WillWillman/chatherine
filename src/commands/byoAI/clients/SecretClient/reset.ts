export const reset = async (commandContext) => {
  await commandContext.extensionContext.secrets.delete('chatherine.byoAI.apiKey');
  await commandContext.extensionContext.secrets.delete('chatherine.byoAI.endpoint');
};
