This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Preview Live:  [Link](https://next-cart-towx.vercel.app/)

## Getting Started

## Setup

1.  Clone the repository:

    ```bash
    git clone https://github.com/nitesh2920/Next-Cart.git
    cd Next-Cart
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```
    
## Folder Structure

```
.
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── cart/
│   ├── layout/
│   ├── product/
│   ├── search/
│   └── ui/
├── hooks/
├── lib/
├── store/
├── types/
├── utils/
└── public/
```

*   `app/`: Contains the main application code, including pages and layouts.
*   `components/`: Contains reusable UI components.
*   `hooks/`: Contains custom React hooks.
*   `lib/`: Contains utility functions and API client.
*   `store/`: Contains the application's state management logic using Zustand.
*   `types/`: Contains TypeScript type definitions.
*   `utils/`: Contains helper functions.
