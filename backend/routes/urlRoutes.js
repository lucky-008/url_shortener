
import express from "express";
import shortid from "shortid";
import Url from "../models/Url.js";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const shortId = shortid.generate();

  const newUrl = await Url.create({ originalUrl, shortId });
  res.json(newUrl);
});

router.get("/:shortId", async (req, res) => {
  const url = await Url.findOne({ shortId: req.params.shortId });
  if (!url) return res.status(404).json("Not found");

  url.clicks++;
  await url.save();
  res.redirect(url.originalUrl);
});

export default router;
