import express, { Router, Request, Response } from 'express';
import { Connection, Channel, connect } from 'amqplib';
import { config } from 'dotenv';

config();
const app = express();
const router = Router();
const port = process.env.PORT || 3333;
const uri = process.env.RABBIT_URI || '';


app.use(express.json());

router.post('', async (req: Request, res: Response) => {
  try {
    const { queue, message } = req.body;
    const conn: Connection = await connect(uri);
    const channel: Channel = await conn.createChannel();

    channel.sendToQueue(queue, Buffer.from(message));
    return res.status(200).send('Mensagem enviada com sucesso');
  } catch(erro) {
    return res.status(500).send(erro.message);
  }
});

app.use(router);
app.listen(port, () => console.log(`Server rodando na porta: ${port}`));
