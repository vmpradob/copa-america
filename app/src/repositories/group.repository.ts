import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Group, GroupRelations} from '../models';

export class GroupRepository extends DefaultCrudRepository<
  Group,
  typeof Group.prototype.id,
  GroupRelations
> {
  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource,
  ) {
    super(Group, dataSource);
  }
}
