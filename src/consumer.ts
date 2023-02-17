import { Connection, Channel, connect, Message } from 'amqplib';
import { config } from 'dotenv';

config();
const uri = process.env.RABBIT_URI || '';

async function consume(): Promise<any> {
  const conn: Connection = await connect(uri);
  const channel: Channel = await conn.createChannel();

  await channel.consume('test', (message: Message) => {
    console.log(message.content.toString());
    return channel.ack(message);
  });
}

consume();
