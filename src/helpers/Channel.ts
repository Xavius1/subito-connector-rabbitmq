import type { Channel as TChannel, Connection } from 'amqplib';

/**
 * Channel interface
 * @public
 */
export interface IChannel {
  bind(queue: string): Promise<this>
  consume(service: Function): Promise<true>
  publish(msg: unknown): Promise<boolean | undefined>
}

/**
 * Create a new RabbitMQ channel
 * @public
 */
class Channel implements IChannel {
  protected broker: Connection;

  protected channel: TChannel | null = null;

  protected queue: string = '';

  constructor(broker: Connection) {
    this.broker = broker;
  }

  /**
   * Bind a queue to the channel
   * 
   * @param queue - Queue to bind
   * @returns 
   * 
   * @public
   */
  async bind(queue: string) {
    this.channel = await this.broker.createChannel();
    this.queue = queue;
    await this.channel.assertQueue(queue, { durable: true, autoDelete: false });

    return this;
  }

  /**
   * Start to consume the queue
   *
   * @returns
   *
   * @public
   */
  async consume(service: Function): Promise<true> {
    const { channel, queue } = this;
    this.isBinded();

    channel?.consume(queue, async (msg) => {
      if (msg !== null) {
        try {
          await service(JSON.parse(msg.content.toString()));
          channel.ack(msg);
        } catch (err) {
          console.log(err); // eslint-disable-line no-console
        }
      }
    });

    return true;
  }

  /**
   * Publish a new message
   *
   * @param msg - Message to publish
   * @returns
   *
   * @public
   */
  async publish(msg: unknown): Promise<boolean | undefined> {
    this.isBinded();
    return this.channel?.sendToQueue(this.queue, Buffer.from(JSON.stringify(msg)));
  }

  /**
   * Check if the channel is binded to a queue
   * @returns 
   * 
   * @public
   */
  isBinded() {
    if(!this.channel) {
      throw new Error('Channel not binded');
    }

    return true;
  }
}

export default Channel;
