import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Player, PlayerRelations} from '../models';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.passport,
  PlayerRelations
> {
  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource,
  ) {
    super(Player, dataSource);
  }
}
