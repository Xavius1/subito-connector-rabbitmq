import type { IChannel } from './Channel.js';

/**
 * Create a new RabbitMQ repository
 * @public
 */
class Repository {
  protected channel: IChannel;

  constructor(channel: IChannel) {
    this.channel = channel;
  }

  /**
   * Publish a new message
   *
   * @param msg - Message to publish
   * @returns
   *
   * @public
   */
  async publish(msg: unknown) {
    return this.channel.publish(msg);
  }

  /**
   * Start to consume the queue
   *
   * @returns
   *
   * @public
   */
  async consume(service: Function) {
    return this.channel.consume(service);
  }
}

export default Repository;
