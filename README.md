# Next13-URL-Shortener

[![SonarCloud Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kylemocode_next13-url-shortener&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=kylemocode_next13-url-shortener)

A fullstack URL shortener app built with Next.js v13 server components (beta), Prisma, API Routes, and AWS RDS.

![](https://i.imgur.com/t5167pA.png)

## Functionalities

- Verify if the URL user inputted is valid or not
- User can see the click count of the shorten URL

## Architecture

### Frontend

This application use some experimental features such as [App Directory](https://nextjs.org/blog/next-13#new-app-directory-beta) and [React Server Components](https://nextjs.org/blog/next-13#server-components) in Next.js v13, which might be changed in the future stable version, but I think it is a great opportunity to try these new things.

#### Tech Stack

- `Next.js v13`
- `TypeScript`
- `TailwindCSS` (I used to use `styled-components` as CSS framework but I found that React Server Components doesn't support `CSS-in-JS` solutions now. Ref: https://beta.nextjs.org/docs/styling/css-in-js)

#### Lighthouse Score

![](https://i.imgur.com/pR05R1v.png)

This simple application get great Lighthouse scores in Performance and SEO.

### Backend

Because this is a simple application, I think serverless solution like Next.js's build in API routes is a good choice to build API endpoints.

As for database, I choose to use a hosted MySQL database instance from AWS RDS, which will not cost and money in this simple application, and we can scaling it easily in the future if necessary.

Inspired by [this talk session](https://www.youtube.com/watch?v=quNLtK7hWYs), I found that [Prisma ORM](https://www.prisma.io/) fits with Next.js very well. It not only support query builder but also support database migration and TypeScript type definition based on our schema.

For our use case, we have to update many entities simultaneously in specific API endpoint, and transaction provided by Prisma come in handy.

#### Entity Schema

![](https://i.imgur.com/VaWqd2T.png)

### CI/CD Pipeline

I use Github Actions to build the CI pipeline, which run `build` and `lint` for now in order to make this application more stable. I also enable the cache mechanism of actions so that it doesn't need to install yarn & dependencies every time, improving the pipeline performance.

I also integrated SonarCloud to scan the code quality of the repo. It will trigger scan automatically when new code merge in master branch, and the Quality Gate Status badge will update based on the scan result.

As for CD, the application will deploy to vercel platform when the new code merged into master branch.

### ID generator

use `nanoid` as ID generator, which may not occur collision (better than `uuid`)

![](https://i.imgur.com/uCjRRXh.png)

But I may optimize this probrem in the future.

### Commit Message

All commit message is started with emoji from [gitmoji](https://gitmoji.dev/) so that we can easily identify the category of each task, and the message format also follow the Conventional Commits.

## TODO List & Roadmap

- [ ] Redis Cache to cache DB data (because we have to record analytic click count, we may need to add message queue to process analytic relative DB query asynchronously even when cache hit)
- [ ] More smooth user experience
- [ ] User login system
- [ ] User can create, update and delete multiple short URL
- [ ] Integrate testing in CI Pipeline
- [ ] Integrate SonarCloud in GitHub Status check
