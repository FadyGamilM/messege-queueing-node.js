import rabbitmq from "amqplib";

import { createOrCheckQueue, createRabbitmqChannel, createRabbitmqConnection, queueName } from "./rabbitmq.service";
import { Log } from "./logger";

export const consumeMsg = async () =>
{
   // create a connection
   let connection = await createRabbitmqConnection("amqp://localhost")

   // create a channel 
   let channel = await createRabbitmqChannel(connection)
   
   // assert the queue exists to consume msgs from it
   await createOrCheckQueue(channel, queueName, false)
   
   // consume the msg 
   await channel.consume(queueName, msg =>
   {
      Log(`[RECEIVED] : received (${msg?.content.toString()}) from queue (${queueName}) at ${24-new Date().getHours()}`)
   }, {noAck: true})
};
(
   async () =>
   {
      await consumeMsg()
   }
)()