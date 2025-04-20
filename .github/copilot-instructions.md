<!-- - Avoid 3rd party packages. -->
- Use npm.
- Node 20.
- Use single quotes.
- Use trailing commas on multiline arrays or args.
- Use semi-colons at end of lines.
- Prefer modern JavaScript (e.g. Object.entries, .reduce, Array.fromAsync, Promise.all).
- For React, avoid inline {} and wrap elements in dedicated components.
- Favor arrow functions.
- Prefer one-liner functions without explicit 'return'.
- Adopt a functional programming style.
- Avoid unnecessary wrapping of functions in arrow functions.

# Testing
- validate using the `runUnitTests` MCP tool that is registered
- Use `jest.restoreAllMocks` in `beforeEach` to reset mocks before each test.
- Prefer `jest.spyOn` over `jest.mock` for mocking functions or methods.
- Use `jest.replaceProperty` to replace object properties instead of creating mock objects.
- Ensure tests are isolated and do not rely on shared state between tests.
- Write clear and specific assertions for mocked functions or replaced properties.
