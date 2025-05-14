# Contributing to Easy Fixer

Thank you for being part of the Easy Fixer development team! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Team Standards](#team-standards)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Testing Guidelines](#testing-guidelines)

## Team Standards

As a private project development team, we strive to maintain high-quality code and productive collaboration. Please:

- Communicate regularly with the team
- Keep your assigned tasks updated in our project management system
- Follow the coding standards and guidelines in this document
- Review pull requests from team members promptly

## Getting Started

1. **Clone the repository** locally

   ```bash
   git clone https://github.com/EasyFixerApp/easy-fixer.git
   cd easy-fixer
   ```

2. **Set up your environment**

   ```bash
   # If you have nvm installed
   nvm use

   # Install dependencies
   npm install
   ```

3. **Start development**

   ```bash
   # This automatically starts the Docker container with PostgreSQL
   npm run dev
   ```

## Development Workflow

1. **Create a new branch** for your feature or bugfix

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```

2. **Make your changes** and ensure they follow our coding standards

3. **Test your changes**

   ```bash
   npm test
   ```

4. **Check code quality**

   ```bash
   npm run lint:check
   npm run format:check
   ```

5. **Commit your changes** following commit message guidelines

6. **Push to the repository**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request** using our PR template

## Pull Request Process

1. **Fill out the PR template** completely
2. **Link any related issues** in the PR description
3. **Request reviews** from team members
4. **Address any feedback** from code reviews
5. **Ensure all tests pass** and code quality checks pass
6. **Update documentation** as necessary

Pull requests are usually reviewed within 2 working days.

## Coding Standards

We use ESLint and Prettier to enforce coding standards:

- **TypeScript**: Follow TypeScript best practices
- **React**: Follow React best practices and hooks guidelines
- **API**: Follow RESTful API design principles
- **Testing**: Write meaningful tests with good coverage

To check your code against our standards:

```bash
# Check linting
npm run lint:check

# Check formatting
npm run format:check
```

To automatically fix issues:

```bash
# Fix linting issues
npm run lint:fix

# Fix formatting issues
npm run format:fix
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types include:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Example:

```
feat(client): add ability to create service requests

- Added form component for service requests
- Implemented validation using Zod
- Added connection to API

Closes #123
```

## Testing Guidelines

- **Write tests for new features** and bug fixes
- **Maintain test coverage** above 80%
- **Test both happy paths and edge cases**
- **Mock external dependencies** appropriately

Run tests:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Questions?

If you have questions or need help, please:

1. Ask in the team communication channel
2. Contact the project lead directly
3. Add a comment to the relevant issue or PR

Thank you for contributing to Easy Fixer!
