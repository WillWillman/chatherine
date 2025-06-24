import { get } from './get';
import { reset } from './reset';

export const SecretClient = (commandContext) => ({
  get: get(commandContext),
  reset: () => reset(commandContext),
});
