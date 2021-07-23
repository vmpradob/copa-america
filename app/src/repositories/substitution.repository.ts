import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Substitution, SubstitutionRelations, Player, Match} from '../models';
import {PlayerRepository} from './player.repository';
import {MatchRepository} from './match.repository';

export class SubstitutionRepository extends DefaultCrudRepository<
  Substitution,
  typeof Substitution.prototype.id,
  SubstitutionRelations
> {

  public readonly player: BelongsToAccessor<Player, typeof Substitution.prototype.id>;

  public readonly match: BelongsToAccessor<Match, typeof Substitution.prototype.id>;

  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Substitution, dataSource);
    this.match = this.createBelongsToAccessorFor('match', matchRepositoryGetter,);
    this.registerInclusionResolver('match', this.match.inclusionResolver);
    this.player = this.createBelongsToAccessorFor('player', playerRepositoryGetter,);
    this.registerInclusionResolver('player', this.player.inclusionResolver);
  }
}
