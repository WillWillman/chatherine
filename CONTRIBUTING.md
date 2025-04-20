# Contributing to Chatherine

Thank you for considering contributing to the Chatherine project! We welcome contributions from the community to help improve and grow this project. Please take a moment to review the guidelines below before you get started.

## Getting Started

1. **Fork the Repository**: Start by forking the repository to your GitHub account.
2. **Clone the Repository**: Clone your forked repository to your local machine:
  ```bash
  git clone https://github.com/your-username/chatherine.git
  ```
3. **Install Dependencies**: Navigate to the project directory and install dependencies using npm:
  ```bash
  cd chatherine
  npm install
  ```

## Development Workflow

- **Create a Branch**: Create a new branch for your feature or bug fix:
  ```bash
  git checkout -b feature/your-feature-name
  ```
- **Write Code**: Follow the project's coding standards and guidelines.
- **Run Tests**: Ensure all tests pass before submitting your changes:
  ```bash
  npm test
  ```
- **Commit Changes**: Use clear and descriptive commit messages:
  ```bash
  git commit -m 'Add feature: your-feature-name'
  ```
- **Push Changes**: Push your branch to your forked repository:
  ```bash
  git push origin feature/your-feature-name
  ```

## Pull Request Guidelines

1. **Open a Pull Request**: Submit your pull request to the `main` branch of the original repository.
2. **Provide Context**: Include a clear description of your changes and the problem they solve.
3. **Link Issues**: If your pull request addresses an issue, link it in the description (e.g., `Closes #123`).
4. **Review Process**: Be responsive to feedback from maintainers and make necessary changes.

## Code Style

- Keep with the style of the repo
- Prefer small simple to test functional style programming
- See the ./github/copilot-instructions.md for more details

## Testing

- Optionally start the projects [mcp server(s)](.vscode/mcp.json)
- Keep with the style of the repo
- Use the mocks provided and extend as needed
- avoid `jest.Mock` and prefer `jest.spyOn`
- Use `jest.restoreAllMocks` in `beforeEach` to reset mocks.
- Automated tests must pass in pipeline before merging.
  - Document in PR any changes to existing tests

## Reporting Issues

If you encounter a bug or have a feature request, please [open an issue](https://github.com/your-username/chatherine/issues) with a clear description and steps to reproduce (if applicable).

---

Thank you for contributing to Chatherine! Your efforts are greatly appreciated.
