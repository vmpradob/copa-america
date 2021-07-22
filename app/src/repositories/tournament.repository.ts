import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Tournament, TournamentRelations} from '../models';

export class TournamentRepository extends DefaultCrudRepository<
  Tournament,
  typeof Tournament.prototype.id,
  TournamentRelations
> {
  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource,
  ) {
    super(Tournament, dataSource);
  }
}
