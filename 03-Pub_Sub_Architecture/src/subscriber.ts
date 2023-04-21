import rabbitmq, { ConsumeMessage } from "amqplib";

import { createOrCheckQueue, createRabbitmqChannel, createRabbitmqConnection, queueName } from "./rabbitmq.service";
import { Log } from "./helper";

export const consumeMsg = async () =>
{
   // create a connection
   let connection = await createRabbitmqConnection("amqp://localhost")

   // create a channel 
   let channel = await createRabbitmqChannel(connection)
   
   // assert the queue exists to consume msgs from it
   await createOrCheckQueue(channel, queueName, true)
   
   // utilize the prefetch instead of round-robin 
   await channel.prefetch(1)

   // consume the msg 
   await channel.consume(queueName, msg =>
   {
      Log(`[RECEIVED] : received (${msg?.content.toString()}) from queue (${queueName}) at ${24 - new Date().getHours()}`)
      // ack the queue to remove the message manually 
      if (msg !== null) {
         channel.ack(msg )
      }
   }, {noAck: false}) // noAck = false means that the rabbitmq won't remove the message after its consumed directly via the consumer, so no automatic removing and this help us in case of the consumer-service goes down after consuming the message, the message would be deleted, but now it won't be deleted untill we specify that in our callback consuming messages method
};
(
   async () =>
   {
      await consumeMsg()
   }
)()