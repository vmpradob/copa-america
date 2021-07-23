import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Player, PlayerRelations, Team, Substitution} from '../models';
import {TeamRepository} from './team.repository';
import {MatchRepository} from './match.repository';
import {SubstitutionRepository} from './substitution.repository';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.passport,
  PlayerRelations
> {

  public readonly team: BelongsToAccessor<Team, typeof Player.prototype.passport>;

  public readonly substitutions: HasManyRepositoryFactory<Substitution, typeof Player.prototype.passport>;

  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>, @repository.getter('SubstitutionRepository') protected substitutionRepositoryGetter: Getter<SubstitutionRepository>,
  ) {
    super(Player, dataSource);
    this.substitutions = this.createHasManyRepositoryFactoryFor('substitutions', substitutionRepositoryGetter,);
    this.registerInclusionResolver('substitutions', this.substitutions.inclusionResolver);
    this.team = this.createBelongsToAccessorFor('team', teamRepositoryGetter,);
    this.registerInclusionResolver('team', this.team.inclusionResolver);
  }
}
