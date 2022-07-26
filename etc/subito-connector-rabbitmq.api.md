## API Report File for "subito-connector-rabbitmq"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import type { Channel as Channel_2 } from 'amqplib';
import type { Connection } from 'amqplib';
import { Repository as Repository_2 } from 'subito-lib';
import { Repository as Repository_3 } from 'subito-graphql';

// @public
export class ApolloRepository extends Repository_3 {
    constructor(channel: IChannel);
    // (undocumented)
    protected channel: IChannel;
    consume(service: Function): Promise<true>;
    publish(msg: {
        [key: string]: any;
    }): Promise<boolean | undefined>;
}

// @public
export class Channel implements IChannel {
    constructor(broker: Connection);
    bind(queue: string): Promise<this>;
    // (undocumented)
    protected broker: Connection;
    // (undocumented)
    protected channel: Channel_2 | null;
    consume(service: Function): Promise<true>;
    isBinded(): boolean;
    publish(msg: unknown): Promise<boolean | undefined>;
    // (undocumented)
    protected queue: string;
}

// @public
export class Connector {
    constructor(credentials: Credentials);
    // (undocumented)
    protected broker: Connection | null;
    channel(queue: string): Promise<IChannel>;
    connect(): Promise<this>;
    // (undocumented)
    protected credentials: Credentials;
}

// @public
export type Credentials = {
    hostname: string;
    username: string;
    password: string;
};

// @public
export interface IChannel {
    // (undocumented)
    bind(queue: string): Promise<this>;
    // (undocumented)
    consume(service: Function): Promise<true>;
    // (undocumented)
    publish(msg: unknown): Promise<boolean | undefined>;
}

// @public
export class Repository extends Repository_2 {
    constructor(channel: IChannel);
    // (undocumented)
    protected channel: IChannel;
    consume(service: Function): Promise<true>;
    publish(msg: {
        [key: string]: any;
    }): Promise<boolean | undefined>;
}

```
