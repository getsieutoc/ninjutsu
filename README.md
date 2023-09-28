This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

This template includes the following:

- Next.js 13
- TypeScript
- ESLint
- Prettier
- Chakra UI
- Prisma
- Next-Auth
- Docker Compose with:
    - PostgresQL
    - Redis
    - Mailpit

## Demo

https://nextjs-template-demo.vercel.app


## Getting Started

#### For Development

- We use `pnpm` package manager. Get it [here](https://pnpm.io/installation).
- Make sure Docker up and running.
- If your Docker account has 2FA enabled, you have to create a Personal Access Token and login before:
    - Follow [this guide](https://docs.docker.com/docker-hub/access-tokens/).
    - Login with `docker login --username <your-username>`

#### Clone the project

You can either use this template by:

- Click the **"Use this template"** button and follow the instruction
- Or using the script below:

```bash
npx tiged websitesieutoc/nextjs-template your-project
```

Then, search and replace `nextjs-template` with your project slug.

#### Install dependencies

```bash
cd your-project
pnpm install
```

#### Setup environment variables

For the first time, you need some default environment variables:

```bash
cp .env.example .env
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and start developing.

## Good to know

- This project uses `App Router` feature.
- We try to take adventage of Next.js's ecosystem, thus most of the features here are built on top of Next.js best practices.
- We use Chakra UI as our primary library. For ready-made themes, please find it at our [themes](https://github.com/websitesieutoc/themes) repo.
- In the future we will launch a tool for customising your own themes soon!

#### Why do not use <headless-cms-name> here?

- We're fully aware of the headless CMS system. 
- But there are ton of boilerplats out there, which already do a great jobs, so we do not want to re-invent them.
- Most of them are really tightly coupled with the headless CMS API, so customers always end up to hack around a lot.
- We need only a lite version of CMS, nothing else.
