This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
git clone https://imran_bappy@bitbucket.org/saifdxb/resume-maker.git
# then
npm install
# then
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Structure

- `src/` - Contains the Next.js app.

  - `app/` - Contains the pages .

    - `components/` - Contains the common components.

      - `HOC/` - Contains the common HOC componets.
      - `Common/` - Contains the common components.
        - `Input/` - Contains the all input components.
        - `Card/` - Contains the all input components.
        - `Loader/` - Contains the all input components.

    - `Layout/` - Contains the layout components.
    - `pages/` - Contains the all pages.
      - `jobs/` - Contains the all jobs componet.
      - `job/` - Contains the all job componet.
      - `404/` - Contains the all 404 componet.

  - `data/` -
  - `graphql/` -
  - `hooks/` -
  - `sections/` -
  - `theme/` -
  - `utils/` -

- `public/` - Contains the Next.js app.

  - `assets/` - Contains the assets.
  - `fonts/` - Contains the fonts.
  - `images/` - Contains the images.
  - `videos/` - Contains the videos.
  - `data/` - Contains the data.

- `docs/` - Contains the documentation.
- `scripts/` - Contains the scripts.
- `tests/` - Contains the tests.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
