export const window = {
  showInformationMessage: jest.fn(),
  showErrorMessage: jest.fn(),
  showInputBox: jest.fn().mockResolvedValue(''),
};
