import amqp from "amqplib";

const QUEUE_TO_B = "queue_to_b"; // Queue for sending messages to Service B
const QUEUE_FROM_B = "queue_from_b"; // Queue for receiving messages from Service B

// Connect to RabbitMQ and return a channel
export async function connectToRabbitMQ() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  // Assert queues
  await channel.assertQueue(QUEUE_TO_B, { durable: false });
  await channel.assertQueue(QUEUE_FROM_B, { durable: false });

  return channel;
}

// Send a message to Service B
export async function sendMessageToB(channel: amqp.Channel, message: string) {
  channel.sendToQueue(QUEUE_TO_B, Buffer.from(message));
  console.log(`Service A sent: ${message}`);
}

// Consume messages from Service B
export async function consumeMessagesFromB(channel: amqp.Channel) {
  channel.consume(QUEUE_FROM_B, (msg) => {
    if (msg) {
      console.log(`Service A received: ${msg.content.toString()}`);
      channel.ack(msg); // Acknowledge the message
    }
  });
}
