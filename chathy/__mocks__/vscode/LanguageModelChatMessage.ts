export const LanguageModelChatMessage = {
  User: jest.fn().mockImplementation((text) => ({ role: 'user', content: text })),
  Assistant: jest.fn().mockImplementation((text) => ({ role: 'assistant', content: text })),
  System: jest.fn().mockImplementation((text) => ({ role: 'system', content: text })),
};
