const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "tts",
  aliases: ["speak"],
  version: "1.0",
  author: "o",
  role: 0,
  usePrefix: true,
  description: "Convert text to speech.",
  commandCategory: "audio",
  guide: "{p}tts <text> or reply to a message with {p}tts",
  coolDowns: 5,
  premium: false,
};

module.exports.run = async ({ event, args, message }) => {
  let text = args.join(" ");

  if (!text && event.messageReply) {
    text = event.messageReply.body;
  }

  if (!text) {
    return message.reply("❌ Please provide text for TTS.");
  }

  try {
    const apiURL = `http://152.70.49.30:6969/api/vit?text=${encodeURIComponent(text)}`;
    const response = await axios.get(apiURL, { responseType: "arraybuffer" });

    const filePath = path.join(__dirname, "cache", `tts_${Date.now()}.mp3`);
    fs.writeFileSync(filePath, Buffer.from(response.data));

    const stream = fs.createReadStream(filePath);
    await message.reply({ body: "🎙 Here is your speech:", attachment: stream });

    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("TTS Error:", error.message);
    return message.reply("❌ Error generating TTS.");
  }
};
