# messege-queueing-node.js
this is a program illustrate the using of rabbitMQ and a message queue with a nodejs technology.

## `Project number 2 | Copmetting-Consumers Architecture`
➜ known as work queue architecture </br>
➜ used to handle the problem of intensive tasks </br>
➜ Scenairo: </br>
   - publisher publish a message to the queue
   - consumer consume the message 
   - the consumer is taking a lot of time processing the task
   - the publisher sends more messages 
   - the queue is almost full 
   - the publisher can't send any more !!
  
➜ Solution: </br>
   - initiate another consumer/s `listen on the same queue`
   - balance the load between all the consumers 
   - use the prefetch to avoid the default round-robin algorithm.

## `Project number 3 | Pub-Sub Architecture`
➜ used when we need to publish a message to all the consumers </br>
➜ usually we use the fanout exchange </br>
➜ Steps :
   - each consumer service asserts that the exchange exists
   - then create an anonymous queue so it will be removed after the consuemr service finishes its work
   - the rabbitmq server will give this queue a random name
   - the consumer service binds the created queue to the existing exchange
   - then the consumer service starts consuming

