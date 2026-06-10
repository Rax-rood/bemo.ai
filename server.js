import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

/* =========================
   CHAT ENDPOINT
========================= */
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    // 1. send to n8n
    const n8nResponse = await axios.post(
      "https://aivoteam.app.n8n.cloud/webhook-test/8d8fde50-0858-45ca-abc1-f773d3a151eb",
      { message }
    );

    const data = n8nResponse.data;

    // 3. normal reply
    return res.json({
      reply: data.reply || "No response"
    });

  } catch (err) {
    return res.json({
      reply: "server <==> n8n: " + err.message
    });
  }
});



/* =========================
   START SERVER
========================= */
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});