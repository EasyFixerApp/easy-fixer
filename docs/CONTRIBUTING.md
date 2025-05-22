# Contributing to Easy Fixer

Thank you for being part of the Easy Fixer development team! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Team Standards](#team-standards)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Naming and Message Guidelines](#naming-and-message-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Branching Strategy](#branching-strategy)

## Team Standards

While we maintain coding standards and processes to ensure quality and consistency, we recognize that:

- **Rules Are Guidelines** - Standards exist to help, not hinder. If you have a valid reason to deviate from a rule, and provide explanation where needed.
- **Growth Through Feedback** - If you're new to these standards or feeling overwhelmed, just start coding! The team will provide constructive feedback to help you adapt gradually.
- **Continuous Improvement** - Our standards evolve based on team experiences and project needs. Suggestions for improving our practices are welcome.

As a private project development team, we strive to maintain high-quality code and productive collaboration. Please:

- Communicate regularly with the team
- Keep your assigned tasks updated in our project management system
- Follow the coding standards and guidelines in this document
- Review pull requests from team members promptly

### Team Values

We operate according to these core values:

- **Collaboration** - We work together, share knowledge, and support each other
- **Quality** - We strive for maintainable, well-tested, and reliable code
- **Learning** - We embrace continuous improvement and knowledge sharing
- **Pragmatism** - We value practical solutions over perfection
- **Transparency** - We communicate openly about progress, challenges, and decisions
- **Respect** - We value diverse perspectives and treat each other with respect

Remember that code reviews are collaborative learning opportunities, not criticisms. We're all working toward the same goal of learning and building a great product.

## Getting Started

For detailed project information, please refer to these sections in the README.md:

- [Quick Start](../README.md#-quick-start) - Installation prerequisites and step-by-step setup guide for local environment
- [Development](../README.md#-development) - Available commands and development workflow
- [Project Structure](../README.md#-project-structure) - Explanation of the monorepo and file organization
- [Architecture Principles](../README.md#-architecture-principles) - System design and code organization principles
- [API Documentation](../README.md#-api-documentation) - How to access and use the OpenAPI documentation
- [Tech Stack](../README.md#-tech-stack) - Overview of all technologies used in the project

## Development Workflow

0. **Always pull or fetch** to stay in sync with the remote repo
1. **Create a new branch** for your feature or bugfix
2. **Make your changes** and ensure they follow our coding standards
3. **Test your changes**
4. **Check code quality**
5. **Commit your changes** following commit message guidelines
6. **Push to the repository**
7. **Create a Pull Request** using our PR template

```bash
#0
git pull
#1
git switch -c [branch-name]
#2
#3 #4 those are also enforced through actions and hooks
npm run check:staged
npm run test
#5
git commit
#6
git push
```

## Pull Request Process

1. **Fill out the PR template** completely
2. **Link any related issues** in the PR description
3. **Request reviews** from team members
4. **Address any feedback** from code reviews
5. **Ensure all tests pass** and code quality checks pass
6. **Update documentation** as necessary

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

## Naming and Message Guidelines

Follow consistent naming and message conventions to improve clarity and organization.

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools
- `hotfix`: Urgent fixes applied directly to production code
- `release`: Changes related to preparing a new release version

### Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```plaintext
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Example:

```plaintext
feat(client): add ability to create service requests

- Added form component for service requests
- Implemented validation using Zod
- Added connection to API

Closes #123
```

### Branch Naming Convention

Use the type prefixes to categorize your branches:

```plaintext
<type>/<short-description>
```

Examples:

- `feat/user-authentication`
- `fix/login-validation-error`
- `docs/update-api-documentation`
- `refactor/service-matching-algorithm`

### Pull Request Naming Convention

Use [WIP] prefix or draft PRs to communicate that the PR is not finished yet.

Use a similar format for pull request titles, with more detailed context:

```plaintext
<type>(<scope>): <description>
```

Examples:

- `feat(client): add service request creation workflow`
- `fix(api): resolve missing authentication tokens`
- `docs(readme): update deployment instructions`

## Testing Guidelines

- **Write tests for new features** and bug fixes
- **Maintain test coverage**
- **Test both happy paths and edge cases**
- **Mock external dependencies** appropriately
- **balance between integration and unit tests**

Run tests:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Test Driven Development
npm run test:watch

# Vitest UI
npm run test:ui
```

## Branching Strategy

### Current Approach (MVP Development)

During initial development:

- All feature/fix branches are created from `main`
- All changes are merged back to `main` through pull requests
- Simplified workflow for rapid development

```plaintext
main <──────────────────────┐
  │                         │
  └──► branch ──────────────┘
```

### Future Approach

As the project matures, we'll adopt a more structured branching strategy with three main patterns:

#### 1. Development Workflow

Feature and bug fix branches are created from and merged back to the development branch:

```plaintext
development
    │
    ├──► feature/new-component ──┐
    │                            │
    ├──► fix/login-issue ────────┤
    │                            │
    └──► feat/user-profile ──────┘
             │
             v
        development
```

#### 2. Release Process

When ready for release, code flows from development to main:

```plaintext
development ──────► release/1.0 ──────► main
                                          │
                                          v
                                      development
```

#### 3. Hotfix Process

Emergency fixes go directly to main and are backported to development:

```plaintext
    main
     │
     ├──► hotfix/critical-bug ───┐
     │                           │
     v                           v
    main ────────────────► development
```

- **main**: Production code; always stable
- **development**: Integration branch where all features come together before release
  - **feature/bug branches**: Individual features or bugfixes (from and to `development`)
- **release**: Preparing for a new production release (from `development` to `main` and back to `development`)
- **hotfix**: Emergency fixes for production issues (from `main` to `main` and `development`)

This approach will provide better stability for production while allowing continuous development.

## Questions?

If you have questions or need help, please:

1. Ask in the team communication channel
2. Add a comment to the relevant issue or PR

Thank you for contributing to Easy Fixer!
