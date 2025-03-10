const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "cd",
  version: "1.0.0",
  aliases: ["ai-music", "suno-music"],
  author: "dipto",
  countDown: 5,
  role: 0,
  description: "Generate AI music using Suno V3",
  category: "media",
  guide: "{pn} <prompt>\nExample: {pn} lo-fi chill vibes",
};

module.exports.run = async ({ message, args }) => {
  if (!args.length) return message.reply("❌ Please provide a prompt.");
  
  const apiUrl = https://renzweb.onrender.com/api/suno-v3?prompt=${encodeURIComponent(args.join(" "))}&supporter_key=admin_renz_key;
  
  message.reply("🎶 Generating AI music... Please wait.");

  try {
    const { data } = await axios.get(apiUrl);
    if (data.ok && data.result) {
      const { audio_url, image_large_url, prompt } = data.result;

      await message.stream({ url: image_large_url, caption: 🎼 **Prompt:** ${prompt} });
      await message.stream({ url: audio_url, caption: "🎧 Here's your generated music!" });
    } else {
      message.reply("❌ Failed to generate music.");
    }
  } catch (error) {
    message.reply("⚠️ Error: " + error.message);
  }
};
