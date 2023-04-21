import rabbitmq, { ConsumeMessage } from "amqplib";

import { createOrCheckQueue, createRabbitmqChannel, createRabbitmqConnection, queueName, createOrCheckExchange, exchangeName, msg } from "./rabbitmq.service";
import { Log } from "./helper";

export const consumeMsg = async () =>
{
   // create a connection
   let connection = await createRabbitmqConnection("amqp://localhost")

   // create a channel 
   let channel = await createRabbitmqChannel(connection)
   
   // assert the queue exists to consume msgs from it
   await createOrCheckExchange(channel, exchangeName, "fanout", false)
   
   // let the rabbitmq name a queue for us
   let queue = await createOrCheckQueue(channel, "", false, true)

   // wait for consuming 
   Log(`waiting for messages from the queue (${queue.queue})`)

   // bind this queue 
   await channel.bindQueue(queue.queue, exchangeName, "") // pattern is the binding key and here we don't care because we need to publish to all consumers

   // consume the msg 
   await channel.consume(queue.queue, msg =>
   {
      Log(`[RECEIVED] : received (${msg?.content.toString()}) from queue (${queue.queue})`)
   }, {noAck: false}) // noAck = false means that the rabbitmq won't remove the message after its consumed directly via the consumer, so no automatic removing and this help us in case of the consumer-service goes down after consuming the message, the message would be deleted, but now it won't be deleted untill we specify that in our callback consuming messages method
};
(
   async () =>
   {
      await consumeMsg()
   }
)()