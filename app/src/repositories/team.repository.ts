import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Team, TeamRelations} from '../models';

export class TeamRepository extends DefaultCrudRepository<
  Team,
  typeof Team.prototype.id,
  TeamRelations
> {
  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource,
  ) {
    super(Team, dataSource);
  }
}
