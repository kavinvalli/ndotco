# ndotco - Notion Alternative for [dotco](https://github.com/someshkar/dotco) made by [@someshkar](https://github.com/someshkar)

A URL shortener using Notion and Vercel

## Setup

1. Clone the repository and install dependencies.

```sh
git clone https://github.com/kavin25/ndotco
cd ndotco
npm i
```

2. Setup a notion database with two columns - `Slug` (replace the Name Column
   with this) and `Target` which would be a URL Type

3. Get your Notion Credentials [here](https://www.notion.so/my-integrations)

4. Replace `.env` variables

```sh
cp .env.example .env
```

> Note: In production (Vercel), you'll have to enter the env variables manually

5. Deploy to Vercel
