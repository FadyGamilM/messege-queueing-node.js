import rabbitmq from "amqplib"

export const queueName: string = "simple_queue";
export const msg : string = `msg added at ${( 24 - new Date().getHours() )}`


// create a connection 
export const createRabbitmqConnection = async (instanceUrl : string) => await rabbitmq.connect(instanceUrl)

// create a channel via this connection
export const createRabbitmqChannel = async (connection : rabbitmq.Connection) => await (connection).createChannel()

// create or check if there is any queue with that given name 
export const createOrCheckQueue = async (channel : rabbitmq.Channel, queueName : string, isDurable : boolean) => await (channel).assertQueue(queueName, {durable: isDurable})