import {Log} from "./logger"
import rabbitmq from "amqplib"
import {msg, queueName, createOrCheckQueue, createRabbitmqChannel, createRabbitmqConnection} from "./rabbitmq.service"
Log("[Simple publisher subscriber pattern]");



// publish a message
export const publishMsg = async (msg: string) =>
{
   // create a connection 
   let connection = await createRabbitmqConnection("amqp://localhost")

   // create a channel
   let channel = await createRabbitmqChannel(connection);

   // create a queue 
   createOrCheckQueue(channel, queueName, false)

   // send the message to the queue 
   channel.sendToQueue(queueName, Buffer.from(msg))
   
   Log(`[SENT] : msg (${msg}) has been sent to ${queueName} queue`)

   // close the connection 
   setTimeout(async () =>
   {
   await connection.close()
      process.exit(0)
   }, 500)
};

(
   async( ) =>
   await publishMsg("hey")
)()