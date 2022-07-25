import type { Connection } from 'amqplib'; 
import amqp from 'amqplib';
import Channel from './Channel.js';
import type { IChannel } from './Channel.js';

/**
 * RabbitMQ credentials
 * @public
 */
export type Credentials = {
  hostname: string
  username: string
  password: string
}

/**
 * Create a new RabbitMQ connection
 * @public
 */
class Connector {
  protected broker: Connection | null = null;

  protected credentials: Credentials;

  constructor(credentials: Credentials) {
    this.credentials = credentials;
  }

  /**
   * Connect to the RabbitMQ host
   * @returns 
   * 
   * @public
   */
  async connect(): Promise<this> {
    this.broker = await amqp.connect(this.credentials);

    return this;
  }

  /**
   * Get a channel
   * 
   * @param queue - Queue to bind to the channel
   * @returns 
   * 
   * @public
   */
  async channel(queue: string): Promise<IChannel> {
    if(!this.broker) {
      throw new Error('Broker not connected');
    }

    const channel = new Channel(this.broker);
    await channel.bind(queue);

    return channel;
  }
}

export default Connector;
