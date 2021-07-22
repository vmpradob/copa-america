import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Host, HostRelations} from '../models';

export class HostRepository extends DefaultCrudRepository<
  Host,
  typeof Host.prototype.id,
  HostRelations
> {
  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource,
  ) {
    super(Host, dataSource);
  }
}
