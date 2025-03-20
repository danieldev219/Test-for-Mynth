import express, { Request, Response } from "express";
import {
  connectToRabbitMQ,
  sendMessageToB,
  consumeMessagesFromB,
} from "./rabbitmq";

const app = express();
app.use(express.json());

// Send message to Service B
app.post("/send-to-b", async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body;
  if (!message) {
    res.status(400).send("Message is required");
    return;
  }

  try {
    const channel = await connectToRabbitMQ();
    await sendMessageToB(channel, message);
    res.send("Message sent to Service B");
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start consuming messages from Service B
(async () => {
  const channel = await connectToRabbitMQ();
  consumeMessagesFromB(channel);
})();

app.listen(3000, () => {
  console.log("Service A running on port 3000");
});
