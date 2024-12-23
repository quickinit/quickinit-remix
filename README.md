# 🚀 QuickInit Remix Starter Template

A modern, production-ready starter template for Remix applications featuring shadcn/ui components, form validation, and
automated deployments.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Remix](https://img.shields.io/badge/Remix-2.5-blueviolet.svg)](https://remix.run/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- **Remix 2.5** with nested routing
- **TypeScript** for type safety
- **shadcn/ui** for beautiful, accessible components
- **Tailwind CSS** for styling
- **Zod** for robust form validation
- **Remix Forms** for enhanced form handling
- **ESLint** and **Prettier** for code quality
- **Vitest** and **Testing Library** for testing
- **Husky** for Git hooks
- **Commitlint** for consistent commit messages
- **Absolute Imports** configured
- **Dark Mode** support with shadcn/ui
- **Resource Routes** examples
- **Error Boundary** setup
- **Environment Variables** configuration
- **Server-Side Logging** using winston
- **State Management** using Remix's built-in features
- GitHub Workflows for merge checks

## 📦 Getting Started

### Quick Installation

```bash
npx create-qi@latest
```

### Prerequisites

- Node.js 20 or later
- pnpm (recommended) or npm

### Manual Installation

1. Clone the repository:

```bash
git clone https://github.com/quickinit/quickinit-remix.git your-project
cd your-project
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
pnpm dev
```

Visit [http://localhost:5173/](http://localhost:5173/) to see your application.

## 🏗️ Project Structure

```
├── .husky/             # Git hooks configuration
├── app/
│   ├── routes/         # Application routes
│   ├── components/     # Reusable components
│   │   └── ui/        # shadcn/ui components
│   ├── utils/         # Utility functions
│   ├── type/          # Types
│   ├── services/      # External service integrations
│   └── hooks/         # Custom React hooks
├── config/            # Global configuration files
├── public/            # Static assets
├── tests/            # Test files
└── .github/
    └── workflows/    # Github workflows
```

## 🛠️ Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm test` - Run tests with Vitest
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript checks
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code format
- `pnpm prepare` - Install Husky hooks
- `pnpm db:generate` - Generate Prisma schema
- `pnpm db:push` - Push Prisma schema
- `pnpm db:studio` - Open Prisma studio
- `pnpm db:migrate` - Run database migrations
- `pnpm db:deploy` - Deploy migrations
- `pnpm db:reset` - Reset database

### Form Handling

This template uses Zod with Remix Forms for enhanced form handling:

```typescript
import { z } from "zod";
import { Form } from "@remix-run/react";
import { validateForm } from "~/utils/validation";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function action({ request }) {
  const formData = await request.formData();
  const validation = await validateForm(formData, schema);

  if (!validation.success) {
    return json({ errors: validation.errors });
  }
  // Handle successful validation
}

export function LoginForm() {
  return <Form method="post">{/* Form fields */}</Form>;
}
```

### Environment Variables

Configure your environment variables in `.env`:

```env
DATABASE_URL="mongodb://localhost:27017/starter"
SESSION_SECRET="super-secret"
PUBLIC_URL="http://localhost:3000"
API_BASE_URL="http://localhost:3000/api"
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Code Quality

This template includes:

- ESLint for code linting
- Prettier for code formatting
- Husky for Git hooks
- Commitlint for commit message standards

## 📚 Documentation

- [Remix Documentation](https://remix.run/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Remix Forms](https://remix.run/docs/en/main/guides/forms)
- [Zod](https://zod.dev)

## 🚀 Deployment

The template uses GitHub Actions for automated deployments. The workflow is triggered when:

- A commit message contains "DEPLOY"
- Push to main branch
- Pull request to main branch

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com)
- [Remix](https://remix.run)
- [Tailwind CSS](https://tailwindcss.com)

## 📧 Contact

- [Rushi Gandhi](https://rushi-web.vercel.app/)
- [Nilesh Darji](https://nileshdarji.me/)
