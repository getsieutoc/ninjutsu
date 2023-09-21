This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- Add 5th line
- Add 4th line
- Add 3rd line
- Add 2nd line
- Add 1st line

## Features

This template includes the following:

- Next.js 13
- TypeScript
- ESLint
- Prettier
- Chakra UI
- Prisma
- Next-Auth
- Docker compose with:
    - PostgresQL
    - Redis
    - Mailpit

## Demo

https://nextjs-template-demo.vercel.app


## Getting Started

#### Clone the project

You can either use this template by:

- Click the **"Use this template"** button and follow the instruction
- Or using the script below:

```bash
npx tiged sangdth/nextjs-template your-project
```

Then, search and replace `nextjs-template` with your project slug.

#### Install dependencies

```bash
cd your-project
npm install
```

#### Setup environment variables

For the first time, you need some default environment variables:

```bash
cp .env.example .env
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
