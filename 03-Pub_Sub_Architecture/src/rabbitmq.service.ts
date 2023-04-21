import rabbitmq from "amqplib"

export const queueName: string = "pub_sub_queue";
export const msg : string = `msg added at ${( 24 - new Date().getHours() )}`
export const exchangeName : string = "pub_sub_exchange"

// create a connection 
export const createRabbitmqConnection = async (instanceUrl : string) => await rabbitmq.connect(instanceUrl)

// create a channel via this connection
export const createRabbitmqChannel = async (connection : rabbitmq.Connection) => await (connection).createChannel()

// create or check if there is any queue with that given name 
export const createOrCheckQueue = async (channel : rabbitmq.Channel, queueName : string, isDurable : boolean, isExclusive: boolean = false) => await (channel).assertQueue(queueName, {durable: isDurable, exclusive: isExclusive})

// create or check if there is an exchange with that given name 
export const createOrCheckExchange = async (channel: rabbitmq.Channel, exchangeName: string, exchangeType: string, isDurable: boolean) => await channel.assertExchange(exchangeName, exchangeType, {durable: isDurable})