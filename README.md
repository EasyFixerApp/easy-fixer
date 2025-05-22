<div>
<img alt="GitHub license" src="https://img.shields.io/badge/license-MIT-blue">
<img alt="Node.js" src="https://img.shields.io/badge/Node.js-v22-green?logo=node.js">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript">
<img alt="Express" src="https://img.shields.io/badge/Express-5.1.0-lightgrey?logo=express">
<img alt="Next.js" src="https://img.shields.io/badge/Next.js-15.3.1-black?logo=next.js">
<img alt="React" src="https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react">
<img alt="Prisma" src="https://img.shields.io/badge/Prisma-6.7.0-2D3748?logo=prisma">
<img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?&logo=tailwind-css">
</div>

# Easy Fixer

Easy Fixer is an intelligent platform designed to seamlessly connect individuals in need of on-site services—such as home or building repairs—with nearby skilled professionals. By leveraging real-time location data, the system efficiently matches service requests with available workers in the area. This not only ensures rapid problem resolution for users but also creates valuable job opportunities for local service providers.

## Table of Contents

- [✨ Key Features](#-key-features)
- [🚀 Quick Start](#-quick-start)
- [📚 API Documentation](#-api-documentation)
- [🛠 Tech Stack](#-tech-stack)
- [🏗 Project Structure](#-project-structure)
- [🏛 Architecture Principles](#-architecture-principles)
- [💻 Development](#-development)
- [👥 Join the Team](#-join-the-team)
- [📄 License](#-license)

## ✨ Key Features

### 👤 Clients

- **Seamless Onboarding**: Clients sign up and quickly complete a guided onboarding process.
- **Effortless Service Requests**: Submit detailed service requests with descriptions, location, and optional images.
- **Real-Time Matching**: Instantly get matched with nearby skilled workers based on service needs and availability.
- **Service Tracking**: Monitor the status of requests from creation to completion.
- **Feedback System**: Mark jobs as complete and rate workers to maintain service quality.

### 🛠️ Workers

- **Profile Setup**: Sign up, create a professional profile, and define your service radius and availability.
- **Job Discovery & Matching**: Browse open jobs or receive automatic job matches tailored to your skills and location.
- **Task Execution**: Accept assignments, complete them, and upload evidence of completion.
- **Earnings & Reviews**: Track your earnings, receive client feedback, and manage your work history.

### 🛡️ Admins

- **Platform Oversight**: Use dashboards to monitor real-time platform activity and key metrics.
- **User & Dispute Management**: Handle user accounts, resolve disputes, and oversee request statuses.
- **System Configuration**: Manage service categories, platform settings, and access in-depth reporting tools.

## 🚀 Quick Start

### Prerequisites

- `Node.js (v22.15.0)` - for easier version management use `nvm`
- `Docker` and `Docker Compose` (for running development container: PostgreSQL database)
- `Git`

Click to download: [node](https://nodejs.org/en/download), [nvm](https://github.com/nvm-sh/nvm), [docker](https://docs.docker.com/get-docker/), [git](https://git-scm.com/downloads)

### Setup Guide

1. **Clone the repository**
2. **Use correct Node version**
3. **Setup the DB local server**
4. **Install dependencies**
5. **Start development environment**

```bash
git clone https://github.com/EasyFixerApp/easy-fixer.git
cd easy-fixer

# If you have nvm installed or make sure you've the correct version
nvm use

# If you're running your own local db server, add the url to /api/.env
npm run docker:setup

# Should generate all needed additional files
npm install

# This should run the project locally with all its dependencies
npm run dev
```

That's it! The API will be available at <http://localhost:4000> and the web app at <http://localhost:3000>.

> [!NOTE]
> For running locally, you might not need to set environment variables. If needed, edit the `.env` files created in `apps/api/` and `apps/web/`.

## 📚 API Documentation

API documentation (OAS3) is automatically generated. After starting the local API server, you can access the API documentation at:

```bash
http://localhost:4000/api-docs
```

or

```bash
code ./apps/api/docs/oas.json
code ./apps/api/docs/oas.yaml
```

## 🛠 Tech Stack

### Common

- **TypeScript** - Type safety and developer experience
- **Vitest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **GitHub Actions** - Enforcing standards and CI/CD

### Frontend

- **Next.js 15/React 19** - React framework with server-side rendering
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Query** - Data fetching and server state management
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form handling

### Backend

- **Express.js 5** - Node.js web application framework
- **Prisma 6** - Next-generation ORM for Node.js and TypeScript
- **PostgreSQL** - Relational database (via Docker)
- **Zod** - TypeScript-first schema validation
- **Swagger/OpenAPI** - API documentation
- **Winston** - Logging library
- **Helmet** - Security middleware
- **Express Rate Limit** - API rate limiting

## 🏗 Project Structure

This project uses a monorepo structure organized into three main sections:

### Root Structure

```plaintext
easy-fixer/
├── apps/               # Application code (API and web)
│   ├── web/            # Next App
│   └── api/            # Express App
├── packages/           #
│   └── shared/         # Shared code package
├── scripts/            # Helper scripts
├── docs/               # Project documentation, standards, ...
├── package.json        # Root package configuration
├── .nvmrc              # Node version specification
├── .npmrc              # NPM configuration
└── README.md           # This file
```

### API Structure

```plaintext
apps/api/
├── docs/               # API documentation files, e.g. generated oas.yaml, erd.svg
├── prisma/             # Database schema and migrations
├── src/                # Source code
│   ├── features/       # API features by domain or feature
│   │   ├── example/    # Example: user-related files
│   │   │   │             These sub-modules can be removed or extended as needed
│   │   │   ├── controllers/ # Request handlers
│   │   │   └── services/    # Business logic and db interactions
│   │   │   ├── repo/        # Data access, a facade between Prisma and the service
│   │   │   ├── models/      # Data model and DTOs, validation schemas, mappers
│   │   │   ├── middleware/  # Middlewares specific to this feature
│   │   │   ├── router/      # Routes and their OAS docs as YAML JSDoc
│   │   │   ├── docs/        # Support for docs such as Response OAS schemas
│   │   └── v1.router.ts     # API version router that includes all features routes
│   ├── middleware/     # Global or app middlewares
│   ├── lib/            # Reusable core modules. e.g. db client, logger instance
│   ├── utils/          # Small, pure, generic helper functions
│   ├── types/          # TypeScript global type definitions
│   ├── config/         # Application configuration
│   ├── app.ts          # Express app setup
│   └── server.ts       # Entry point
├── tests/              # Test files
│   ├── integration/    # Integration tests
│   └── unit/           # Unit tests
│       └── src/features/user/services/
│           └── crud.test.ts
├── scripts/            # API utility scripts
├── logs/               # Generated logs
├── compose.yaml        # Docker Compose configuration
└── package.json        # API package configuration
```

### Web Structure

See next project structure [docs](https://nextjs.org/docs/app/getting-started/project-structure)

```plaintext
apps/web/
├── public/             # Static assets
├── src/                # Source code
│   ├── app/            # Next.js app router
│   │   ├── layout.tsx      # Root layout (shared UI for all pages)
│   │   ├── template.tsx    # Root template (preserves state on navigation)
│   │   ├── not-found.tsx   # Custom 404 page
│   │   ├── loading.tsx     # Global loading UI
│   │   ├── error.tsx       # Global error handler
│   │   ├── page.tsx        # Landing page content
│   │   ├── dashboard/      # Dashboard feature
│   │   │    ├── page.tsx           # Dashboard main content
│   │   │    ├── layout.tsx         # Dashboard layout wrapper
│   │   │    ├── components/        # Dashboard-specific components
│   │   │    ├── hooks/             # Dashboard-specific hooks
│   │   │    └── utils/             # Dashboard-specific utilities
│   │   ├── [slug]/         # Dynamic route example
│   │   ├── (group)/        # Route grouping example (doesn't affect URL)
│   │   │    ├── login/     # Auth login route
│   │   │    └── logout/    # Auth logout route
│   │   └── _private/       # Private folder (not included in routing)
│   ├── components/     # Shared reusable components
│   ├── hooks/          # Shared React hooks
│   ├── lib/            # Core libraries & utilities
│   ├── services/       # External service integrations
│   │   └── api/        # API client for backend communication
│   ├── styles/         # Global styling & theme configuration
│   ├── types/          # TypeScript global type definitions
│   ├── store/          # Global state management (if needed)
│   └── utils/          # Shared utility functions
├── tests/              # Test files
└── package.json        # Web package configuration
```

## 🏛 Architecture Principles

### System Architecture

While this project uses a monorepo for easier development, it's designed with distributed and decoupled implementation in mind. The architecture follows a clear separation of concerns:

- **Web App (Next.js)**: Responsible solely for generating the view layer for end users, whether through server-side rendering (SSR), client-side rendering (CSR), or static site generation (SSG).

- **API (Express)**: Handles all business logic and controls the flow between (end users/client apps) and the database. It exposes a RESTful interface that any client can consume.

This architectural decision provides several advantages:

- **Platform Flexibility**: New client applications (mobile apps, desktop apps) can be added without duplicating business logic
- **Scalability**: Each component can be scaled independently based on its specific needs
- **Maintainability**: Clear boundaries make the codebase easier to understand and modify
- **Deployment Options**: Components can be deployed separately if needed as the system grows

The project pragmatically encourages modularity and discourages tight coupling between components, leading to improved developer experience, easier maintenance, and better scalability as the application grows.

### Core Organization Principles

The project follows a **feature-first** architecture (also known as vertical slicing or modular architecture) that prioritizes organizing code by domain/ features/use cases rather than technical layers.

- **Features over Technical Layers**: Code is primarily organized by feature/domain, then by technical concern within each feature

  ```plaintext
  # Express Example
  features/user/(controller.ts, service.ts, repo.ts)

  # Next.js Example
  app/home/(page.tsx, components/, hooks/)
  ```

- **Cross-Cutting Concerns Placement**: Common utilities and shared code are placed at the closest appropriate level to their consumers

  ```plaintext
  # Global middleware
  src/middleware/
  # Feature-specific middleware
  src/features/user/middleware/

  # Global components
  src/components/
  # Feature-specific components
  src/app/home/components/
  ```

- **Folder Structure Pragmatism**: Folders are only created when multiple related files exist

  ```plaintext
  # Single controller
  features/user/controller.ts
  # Multiple controllers
  features/user/controllers/auth.ts, profile.ts
  ```

- **Single Responsibility Files**: Each file should generally have one main export named after the file. This is pragmatic—not a rigid rule. For instance, Small, closely related functionalities can be grouped in one file as long as the file remains focused and manageable.

  ```plaintext
  errorHandler.ts       # exports function errorHandler

  # example exception
  features/
  └── user/
    ├── router.ts       # exports userRouter but named differently, context is enough.
  ```

- **Tests**: test folders structure should reflect the structure in src as much as possible.

This architecture promotes:

- 🔍 Better discoverability - related code stays together
- 🔄 Easier feature iteration - changes to a feature affect only its directory
- 🧩 Clear boundaries - dependencies between features are explicit
- 🚀 Improved maintainability - new team members can understand isolated features more quickly

## 💻 Development

For more information see [CONTRIBUTING](./docs/CONTRIBUTING.md)

For moving between the app directories you can use the following installed commands:

```bash
go-root
go-api
go-web
```

Most scripts can be run in specific workspaces by adding `-w` followed by the workspace name:

```bash
# Run a script in the root workspace
npm run [script]

# Run a command in specific workspace [web, api, easy-fixer-shared]
npm run [script] -w [name]
```

**Main scripts:**

```bash
# Development
npm run dev                 # Run the project in development mode
npm run build               # Build all packages and applications
npm run start               # Start all applications in production mode

# Testing & Quality
npm run test                # Run all tests
npm run test:coverage       # Run tests with coverage report
npm run test:watch          # Run tests in watch mode for Test Driven Development
npm run test:ui             # Run tests with vitest user interface

npm run lint:check          # Check linting in all packages
npm run lint:fix            # Fix linting issues in all packages
npm run format:check        # Check formatting with Prettier
npm run format:fix          # Fix formatting issues with Prettier
npm run check:staged        # Checks quality only for staged files, auto on commit

# Database
npm run docker:setup        # Set up development Docker container for database
npm run db:setup -w api     # Initialize and set up the database

# Documentation
npm run oas:generate -w api # Generate OpenAPI documentation

# Environment & Cleanup
npm run setup:env           # Set up development environment variables
npm run setup:nav           # Set up navigation helpers
npm run clean:all           # Clean all build artifacts and node_modules
```

## 👥 Join the Team

This is not an open source project, but we welcome new team members! If you're interested in joining the development team, please contact the current developers.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
