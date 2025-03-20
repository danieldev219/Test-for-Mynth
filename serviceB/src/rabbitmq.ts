import amqp from "amqplib";

const QUEUE_TO_A = "queue_to_a"; // Queue for sending messages to Service A
const QUEUE_FROM_A = "queue_from_a"; // Queue for receiving messages from Service A

// Connect to RabbitMQ and return a channel
export async function connectToRabbitMQ() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  // Assert queues
  await channel.assertQueue(QUEUE_TO_A, { durable: false });
  await channel.assertQueue(QUEUE_FROM_A, { durable: false });

  return channel;
}

// Send a message to Service A
export async function sendMessageToA(channel: amqp.Channel, message: string) {
  channel.sendToQueue(QUEUE_TO_A, Buffer.from(message));
  console.log(`Service B sent: ${message}`);
}

// Consume messages from Service A
export async function consumeMessagesFromA(channel: amqp.Channel) {
  channel.consume(QUEUE_FROM_A, (msg) => {
    if (msg) {
      console.log(`Service B received: ${msg.content.toString()}`);
      channel.ack(msg); // Acknowledge the message
    }
  });
}
