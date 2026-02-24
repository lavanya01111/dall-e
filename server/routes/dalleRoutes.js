import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Hello from image generator!');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Use Unsplash's free source endpoint as a simple, no-key image provider.
    // This isn't truly "AI", but will return a relevant image for the prompt.
    const unsplashUrl = `https://source.unsplash.com/512x512/?${encodeURIComponent(
      prompt
    )}`;

    const response = await fetch(unsplashUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Image API error:', errorText);
      return res
        .status(response.status)
        .json({ error: 'Failed to generate image' });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;