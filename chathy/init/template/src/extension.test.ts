import * as chathy from '@chatherine/chathy';
import * as commands from './commands';
import { activate } from './extension';

describe('activate', () => {
  it('should register the commands', () => {
    jest.spyOn(chathy, 'activate').mockReturnValue(jest.fn());

    activate(chathy.mocks.extensionContext);

    expect(chathy.activate).toHaveBeenCalledWith(commands, 'documentation');
    expect(chathy.activate({ cmd: () => () => ({}) }, 'cmd')).toHaveBeenCalledWith(chathy.mocks.extensionContext);
  });
});
