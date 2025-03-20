import express, { Request, Response } from "express";
import {
  connectToRabbitMQ,
  sendMessageToA,
  consumeMessagesFromA,
} from "./rabbitmq";

const app = express();
app.use(express.json());

// Send message to Service A
app.post("/send-to-a", async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body;
  if (!message) {
    res.status(400).send("Message is required");
    return;
  }

  try {
    const channel = await connectToRabbitMQ();
    await sendMessageToA(channel, message);
    res.send("Message sent to Service A");
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start consuming messages from Service A
(async () => {
  const channel = await connectToRabbitMQ();
  consumeMessagesFromA(channel);
})();

app.listen(4000, () => {
  console.log("Service B running on port 4000");
});
