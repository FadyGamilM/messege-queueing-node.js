import {Log} from "./logger"
import rabbitmq from "amqplib"

Log("[Simple publisher subscriber pattern]");
const queueName: string = "simple_queue"
const msg : string = `msg added at ${( 24 - new Date().getHours() )}`

// connect to the rabbitmq server
// 1] create a connection to the rabbitmq instance
const connectToRabbitmq = async (instanceUrl: string) => await rabbitmq.connect(instanceUrl)

// 2] create a channel via this connection
const createRabbitmqChannel = async () => (await connectToRabbitmq("amqp://localhost")).createChannel()


// publish a message
const publishMsg = async (msg: string) =>
{
   let channel = await createRabbitmqChannel();

   // create a queue 
   await channel.assertQueue(queueName, {durable: false});

   // send the message to the queue 
   // durable means the rabbitmq server won't create a new queue with thi name if the server is restarted
   channel.sendToQueue(queueName, Buffer.from(msg))
   
   Log(`[SENT] : msg has been sent to ${queueName} queue`)

   // close the connection 
   setTimeout(async () =>
   {
      (await connectToRabbitmq("amqp://localhost")).close()
      process.exit(0)
   }, 500)
};