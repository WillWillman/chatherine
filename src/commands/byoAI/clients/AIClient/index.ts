import { listModels } from './listModels';
import { getModel } from './getModel';

export const AIClient = (config) => ({
  listModels: listModels(config),
  getModel: getModel(config),
});
