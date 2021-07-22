import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Stage, StageRelations} from '../models';

export class StageRepository extends DefaultCrudRepository<
  Stage,
  typeof Stage.prototype.id,
  StageRelations
> {
  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource,
  ) {
    super(Stage, dataSource);
  }
}
