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
  async publish(msg: { [key: string]: any}) {
    const cleanContext = { ...this.context };
    delete cleanContext.dataSources;
    delete cleanContext.services;

    return this.channel.publish({
      ...msg,
      context: cleanContext
    });
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
