import amqp from "amqplib";
import { createOrCheckQueue, createRabbitmqChannel, createRabbitmqConnection, exchangeName, msg, queueName, createOrCheckExchange } from "./rabbitmq.service";
import { Log } from "./helper";

const publishLogs= async (log_msg: string)=>
{
   // (1) create connection 
   const connection = await createRabbitmqConnection("amqp://localhost")

   // (2) create a channel 
   const channel = await createRabbitmqChannel(connection)

   // (3) assert the exchange existence 
   await createOrCheckExchange(channel, exchangeName, "fanout", true)

   // (4) publish the message to the exchange 
   channel.publish(exchangeName, "", Buffer.from(log_msg))

   // (5) console checking 
   Log(`msg (${log_msg} has been sent to the exchange (${exchangeName}))`)

   // (6) close the conection 
   setTimeout(() =>
   {
      connection.close()
   }, 500)
}

(
   async () =>
   {
      await publishLogs("log_msg")
   }
)()

