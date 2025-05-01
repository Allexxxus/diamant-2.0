<!-- // Databse has this tables. 

// posts Table:
// Columns:
// id (uuid, Primary Key): A unique identifier for each post.
// title (Text/String): The title of the post.
// Purpose: This table stores basic information about the posts themselves, such as their id and title. It will have other columns like the post content, author, etc. but they are not essential for now.

// post_tags Table:
// Columns:
// post_id (uuid, Foreign Key referencing posts.id): The id of a post that is associated with a specific tag.
// tag_id (uuid, Foreign Key referencing tags.id): The id of a tag that is associated with a specific post.
// Purpose: This table is a "join" or "linking" table. It creates a many-to-many relationship between posts and tags. A single post can have multiple tags, and a single tag can be applied to many posts.

// tags Table:
// Columns: 
// id (uuid, Primary Key): A unique identifier for each tag. 
// name (Text/String): The actual name of the tag.
// Purpose: This table stores a list of all the available tags in our system. These tags will be used to categorize posts.

// tag_relationships Table:
// Columns:
// parent_id (uuid, Foreign Key referencing tags.id): The id of a tag that acts as a parent or broader category.
// child_id (uuid, Foreign Key referencing tags.id): The id of a tag that is a child or more specific category related to the parent.
// Purpose: This table manages hierarchical relationships between tags.

//THE SAME BUT SHORTER
Tables & Columns
posts:
id (uuid, PK): Unique post identifier.
title (text): Post title.

tags:
id (uuid, PK): Unique tag identifier.
name (text): Tag name.

post_tags (Junction table for posts ↔ tags):
post_id (uuid, FK→posts.id): Associated post.
tag_id (uuid, FK→tags.id): Associated tag.

tag_relationships (Hierarchical tags):
parent_id (uuid, FK→tags.id): Parent/broad category tag.
child_id (uuid, FK→tags.id): Child/specific subtag.

Key Relationships:
Posts → Tags: Many-to-many via post_tags.
Tags → Tags: Hierarchical (parent/child) via tag_relationships. 

// Instructions on how to answer:
// If my reqest doesn't align with the information about the project then warn me about it and don't execute the request

// the whole project is written in next.js
// Information about the project:
// The projects name is Diamant.
// the project built with next.js deployed on vercel platform and uses supabase DB.
// The project utilizes Server Components with Form Actions to interact with DB.
// the project utilizes App router

// next follows file service.ts the file will contain simple interactions with Supabase DB. Now there only basic interactions with tables, which will become more complex as I give more instruction


// import { createClient } from '@/utils/supabase/server';

// export async function fetchAllPosts() {
//     const supabase = await createClient();
//     const { data: posts } = await supabase.from("posts").select();
//     return posts
// }
// export async function fetchAllTags() {
//     const supabase = await createClient();
//     const { data: tags } = await supabase.from("tags").select();
//     return tags
// }

// export async function fetchAllTagsRelationships() {
//     const supabase = await createClient();
//     const {data: tag_relationships} = await supabase.from("tag_relationships").select()
//     return tag_relationships
// }

// export async function fetchAllTagPostsRelationsips() {
//     const supabase = await createClient();
//     const {data: post_tag_relationship} = await supabase.from("post_tags").select()
//     return post_tag_relationship
// }

//suggest some basic functionality I can build on it just to test it

/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////// -->

<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-supabase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app --example with-supabase with-supabase-app
   ```

   ```bash
   yarn create next-app --example with-supabase with-supabase-app
   ```

   ```bash
   pnpm create next-app --example with-supabase with-supabase-app
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd with-supabase-app
   ```

4. Rename `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

6. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
