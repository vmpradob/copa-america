import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Stadium, StadiumRelations} from '../models';

export class StadiumRepository extends DefaultCrudRepository<
  Stadium,
  typeof Stadium.prototype.id,
  StadiumRelations
> {
  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource,
  ) {
    super(Stadium, dataSource);
  }
}
