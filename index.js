const { Client } = require("@notionhq/client");
const express = require("express");
const fs = require("fs");

const app = express();

require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_KEY });
const database_id = process.env.NOTION_DATABASE_ID;

const getTarget = async (slug) => {
  const response = await notion.databases.query({
    database_id,
    filter: {
      property: "Slug",
      text: {
        equals: slug,
      },
    },
  });
  return response.results.length > 0
    ? response.results[0].properties["Target"].url
    : "";
};

app.get("/", async (req, res) => {
  try {
    return res.redirect(302, process.env.MAIN_DOMAIN);
  } catch (err) {
    console.error(err);
  }
});

app.get("/gh/:repo", async (req, res) => {
  try {
    const { repo } = req.params;
    const { GITHUB_USERNAME: ghUsername } = process.env;

    const { ok: repoExists } = await fetch(
      `https://api.github.com/repos/${ghUsername}/${repo}`
    );

    if (repoExists) {
      return res.redirect(302, `https://github.com/${ghUsername}/${repo}`);
    }
    let page = fs.readFileSync(__dirname + "/public/404.html", "utf8");
    page = page.replace("tochange", "");
    res.status(404).send(page);
    return;
  } catch (e) {
    console.error(e);
  }
});

app.get("/*", async (req, res) => {
  const target = await getTarget(req.originalUrl.substring(1));
  if (target) return res.redirect(302, target);

  let page = fs.readFileSync(__dirname + "/public/404.html", "utf8");
  page = page.replace("tochange", req.url);
  return res.status(400).send(page);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  console.log(`Shortener listening on port ${PORT}`);
  if (err) console.error(err);
});
