const axios = require("axios");
const fs = require("fs");
const path = require("path");

const baseApiUrl = async () => {
  const base = await axios.get(
`https://raw.githubusercontent.com/shaonproject/Shaon/main/api.json`
  );
  return base.data.api;
};

module.exports.config = {
  name: "tik",
  version: "1.0.1",
  author: "Dipto",
  countDown: 0,
  role: 0,
  description: {
    en: "Auto download video from TikTok, Facebook, Instagram, YouTube, and more",
  },
  category: "𝗠𝗘𝗗𝗜𝗔",
  commandCategory: "𝗠𝗘𝗗𝗜𝗔",
  guide: {
    en: "[video_link]",
  },
};

module.exports.run = async ({ bot, msg }) => {
  this.onChat({ bot, msg });
};

module.exports.onChat = async ({ bot, msg }) => {
  const messageText = msg.link_preview_options?.url || msg.text || "";

  try {
    if (
      messageText.startsWith("https://vt.tiktok.com") ||
      messageText.startsWith("https://www.tiktok.com/") ||
      messageText.startsWith("https://vm.tiktok.com")
      ) {
      const chatId = msg.chat.id;
      const messageId = msg.message_id;

      const wait = await bot.sendMessage(chatId, "⏳ Processing your request...", {
        reply_to_message_id: messageId,
      });
// Store the ID of the "processing" message//
      const waitMId = wait.message_id; 
      const imagesPath = path.join(__dirname, "caches", "diptoo.jpg");

      const { data } = await axios.get(
        `${await baseApiUrl()}/tiktok/downloadvideo?url=${encodeURIComponent(messageText)}`
      );
      const imagesBuffer = (
        await axios.get(data.data.images, { responseType: "arraybuffer" })
      ).data;

      fs.writeFileSync(imagePath, Buffer.from(imageBuffer, "utf-8"));

      // Delete the "processing" message///
 await bot.deleteMessage(chatId, waitMId);

      await bot.sendVideo(
        chatId,
        imagePath,
        {
          caption: `🔰Downloaded Tiktok Video✅`,
          reply_to_message_id: messageId,
        },
        {
          filename: "video.jpg",
          contentType: "video/jpg",
        },
      );

      fs.unlinkSync(imagePath);
    }
  } catch (error) {
    await bot.sendMessage(msg.chat.id, `❎ Error: ${error.message}`);
  }
};
