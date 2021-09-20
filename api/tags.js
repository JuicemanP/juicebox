const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  // read the tagname from the params
  const tagName = req.params.tagName;
  try {
    const posts = getPostsByTagName(tagName);
    res.send({ posts: posts });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;
