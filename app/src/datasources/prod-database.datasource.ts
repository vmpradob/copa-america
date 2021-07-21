import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'prod_database',
  connector: 'mysql',
  url: '',
  host: 'database',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'prod'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ProdDatabaseDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'prod_database';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.prod_database', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
