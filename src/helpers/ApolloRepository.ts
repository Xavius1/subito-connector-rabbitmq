import { Repository as Base } from 'subito-graphql';
import type { IChannel } from './Channel.js';

/**
 * Create a new RabbitMQ repository compitable Apollo data source
 * @public
 */
class Repository extends Base {
  protected channel: IChannel;

  constructor(channel: IChannel) {
    super();
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
