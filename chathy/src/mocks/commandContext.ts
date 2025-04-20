import { extensionContext } from './extensionContext';
import { workspaceConfiguration } from './workspaceConfiguration';

export const commandContext = {
  extensionContext,
  workspaceConfiguration,
  workspaceRoot: '/path/to/mock',
};