# Easy Fixer

<div align="center">
<img alt="GitHub license" src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge">
<img alt="Node.js" src="https://img.shields.io/badge/Node.js-v22-green?style=for-the-badge&logo=node.js">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript">
<img alt="Express" src="https://img.shields.io/badge/Express-5.1.0-lightgrey?style=for-the-badge&logo=express">
<img alt="Next.js" src="https://img.shields.io/badge/Next.js-15.3.1-black?style=for-the-badge&logo=next.js">
<img alt="React" src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react">
<img alt="Prisma" src="https://img.shields.io/badge/Prisma-6.7.0-2D3748?style=for-the-badge&logo=prisma">
<img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css">
</div>

**Smart Service Request Management System**

Easy Fixer is a platform that connects people who need building repairs with nearby skilled workers. It intelligently matches service requests with available workers based on proximity (within 40km) to ensure quick problem resolution and provide job opportunities for local craftsmen.

## Table of Contents

- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [🏗 Architecture](#-architecture)
- [🚀 Quick Start](#-quick-start)
- [💻 Development](#-development)
- [🧪 Testing](#-testing)
- [📚 API Documentation](#-api-documentation)
- [🔄 User Flows](#-user-flows)
- [👥 Join the Team](#-join-the-team)
- [📄 License](#-license)

## ✨ Features

### For Clients

- **Create service requests** with problem descriptions and optional images
- **Find nearby workers** based on your location and service needs
- **Track request status** from creation to completion
- **Rate and review** workers after service completion

### For Workers

- **Set your availability and service radius**
- **Browse and apply for jobs** in your area
- **Get automatically matched** to relevant service requests
- **Track earnings and manage your profile**

### For Admins

- **Monitor system performance** with comprehensive dashboards
- **Manage users, disputes and service categories**
- **Access analytics and reporting tools**

## 🛠 Tech Stack

### Frontend

- **Next.js 15** - React framework with server-side rendering
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type safety and developer experience

### Backend

- **Express.js 5** - Node.js web application framework
- **Prisma 6** - Next-generation ORM for Node.js and TypeScript
- **PostgreSQL** - Relational database (via Docker)
- **Zod** - TypeScript-first schema validation
- **Swagger/OpenAPI** - API documentation

### Testing & Quality

- **Vitest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

## 🏗 Architecture

This project uses a monorepo structure to organize multiple applications:

```
easy-fixer/
├── apps/               # Application code
│   ├── api/            # Express.js backend API
│   │   ├── prisma/     # Database schema and migrations
│   │   ├── scripts/    # API utility scripts
│   │   ├── src/        # Source code
│   │   │   ├── config/     # Application configuration
│   │   │   ├── controllers/# Route handlers
│   │   │   ├── middleware/ # Express middleware
│   │   │   ├── models/     # Data models
│   │   │   ├── routes/     # API route definitions
│   │   │   ├── services/   # Business logic
│   │   │   ├── types/      # TypeScript type definitions
│   │   │   ├── utils/      # Utility functions
│   │   │   └── server.ts   # Entry point
│   │   └── tests/      # API tests
│   └── web/            # Next.js frontend
│       ├── app/        # App router components and pages
│       ├── components/ # Reusable React components
│       ├── hooks/      # Custom React hooks
│       ├── lib/        # Utility functions
│       ├── public/     # Static assets
│       └── types/      # TypeScript type definitions
├── packages/           # Shared code packages
├── scripts/            # Helper scripts
├── docs/               # Documentation
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js (v22.15.0)** - If you have multiple Node versions, use [nvm](https://github.com/nvm-sh/nvm)
- **Docker** and Docker Compose (for PostgreSQL database)
- **Git**

### Setup Guide

1. **Clone the repository**

   ```bash
   git clone https://github.com/EasyFixerApp/easy-fixer.git
   cd easy-fixer
   ```

2. **Use correct Node version** (if needed)

   ```bash
   # If you have nvm installed
   nvm use
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start development environment**
   ```bash
   # This automatically starts the Docker container with PostgreSQL
   npm run dev
   ```

That's it! The API will be available at http://localhost:4000 and the web app at http://localhost:3000.

> **Note:** For local development, you might not need to set environment variables. If needed, edit the `.env` files created in `apps/api/` and `apps/web/`.

## 💻 Development

**Running commands in workspaces:**

Most commands can be run in specific workspaces by adding `-w` followed by the workspace name:

```bash
# Run a command in the API workspace
npm run [command] -w api

# Run a command in the web workspace
npm run [command] -w web
```

**Main development commands:**

```bash
# Start both frontend and backend (automatically starts Docker)
npm run dev

# Start only the API (automatically starts Docker)
npm run dev -w api

# Start only the web app
npm run dev -w web
```

### Code Quality

```bash
# Run linting checks
npm run lint:check

# Fix linting issues
npm run lint:fix

# Check code formatting
npm run format:check

# Fix formatting issues
npm run format:fix
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📚 API Documentation

API documentation is automatically generated using Swagger/OpenAPI. After starting the API server, you can access the API documentation at:

```
http://localhost:4000/api-docs
```

You can also generate the documentation manually:

```bash
npm run docs:generate -w api
```

## 🔄 User Flows

### Client Flow

1. Sign up and complete onboarding
2. Create service request with details and location
3. Review and select from matched workers
4. Track service progress
5. Mark as complete and provide rating

### Worker Flow

1. Sign up and create professional profile
2. Set availability and service area
3. Browse jobs or receive match notifications
4. Accept and complete assignments
5. Upload completion evidence and receive payment

### Admin Flow

1. Monitor service activity through dashboards
2. Manage users and handle disputes
3. Configure system settings and categories

## 👥 Join the Team

This is not an open source project, but we welcome new team members! If you're interested in joining the development team, please contact the current developers.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
