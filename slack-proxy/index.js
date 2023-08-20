import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const app = express();
const PORT = 5020;
app.use(express.json());

app.options("/channels", cors());

app.get("/", (req, res) => res.send("Ok"));

app.get("/channels", async (req, res) => {
  const response = await axios.get("https://slack.com/api/conversations.list", {
    headers: {
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
    },
  });
  return res.send(
    response.data.channels.map((channel) => {
      const { id, name } = channel;
      return { id, name };
    })
  );
});

app.use(cors());

app.post("/message", async (req, res) => {
  const { message, channel } = req.body;
  if (message && channel) {
    try {
      const response = await axios.post(
        "https://slack.com/api/chat.postMessage",
        { text: message, channel },
        {
          headers: {
            Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.send(response.data);
    } catch (error) {
      console.log(error.message);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(400);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
