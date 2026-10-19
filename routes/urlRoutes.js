
const express = require("express");
const crypto = require("crypto");
const Url = require("../models/Url");

const router = express.Router();

// 1. Create a short URL
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  // Validate input
  if (typeof originalUrl !== "string" || !originalUrl.trim()) {
    return res.status(400).json({
      success: false,
      message: "Please provide an originalUrl."
    });
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(originalUrl.trim());
  } catch {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid URL."
    });
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return res.status(400).json({
      success: false,
      message: "Only HTTP and HTTPS URLs are supported."
    });
  }

  try {
    // Generate a unique short code
    let shortCode;

    do {
      shortCode = crypto.randomBytes(4).toString("hex");
    } while (await Url.exists({ shortCode }));

    // Save URL in MongoDB
    const savedUrl = await Url.create({
      originalUrl: parsedUrl.toString(),
      shortCode
    });

    const baseUrl = `http://localhost:${process.env.PORT || 5000}`;

    return res.status(201).json({
      success: true,
      message: "Short URL created successfully!",
      data: {
        originalUrl: savedUrl.originalUrl,
        shortCode: savedUrl.shortCode,
        shortUrl: `${baseUrl}/${savedUrl.shortCode}`,
        clicks: savedUrl.clicks,
        createdAt: savedUrl.createdAt
      }
    });
  } catch (error) {
    console.error("Error creating short URL:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to create short URL."
    });
  }
});

// 2. Get URL statistics
// IMPORTANT: Keep this route above /:shortCode
router.get("/stats/:shortCode", async (req, res) => {
  try {
    const url = await Url.findOne({
      shortCode: req.params.shortCode
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found."
      });
    }

    const baseUrl = `http://localhost:${process.env.PORT || 5000}`;

    return res.status(200).json({
      success: true,
      data: {
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: `${baseUrl}/${url.shortCode}`,
        clicks: url.clicks,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt
      }
    });
  } catch (error) {
    console.error("Stats error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch URL statistics."
    });
  }
});

// 3. Redirect short URL to original URL
router.get("/:shortCode", async (req, res) => {
  try {
    const url = await Url.findOneAndUpdate(
      { shortCode: req.params.shortCode },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found."
      });
    }

    return res.redirect(302, url.originalUrl);
  } catch (error) {
    console.error("Redirect error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to redirect."
    });
  }
});

// Export the router only after defining all routes
module.exports = router;
