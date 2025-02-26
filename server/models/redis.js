import redis from "redis";

export const client = redis.createClient();

//client.subscribe('__keyevent@0__:expired');
client.on('error', err => console.log('Redis Client Error', err));

client.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.log('Failed to connect to Redis', err)); 