export const chat = {
  createChatParticipant: jest.fn().mockImplementation((name, handler) => ({
    id: 'id',
    iconPath: null,
    onDidReceiveFeedback: jest.fn(),
    dispose: jest.fn(),
    requestHandler: handler,
  })),
};
