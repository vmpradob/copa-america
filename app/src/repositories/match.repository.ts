import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Match, MatchRelations, Stadium, Stage, Team, Substitution, Tournament} from '../models';
import {StadiumRepository} from './stadium.repository';
import {StageRepository} from './stage.repository';
import {TeamRepository} from './team.repository';
import {SubstitutionRepository} from './substitution.repository';
import {TournamentRepository} from './tournament.repository';

export class MatchRepository extends DefaultCrudRepository<
  Match,
  typeof Match.prototype.id,
  MatchRelations
> {

  public readonly stadium: BelongsToAccessor<Stadium, typeof Match.prototype.id>;

  public readonly stage: BelongsToAccessor<Stage, typeof Match.prototype.id>;

  public readonly team: BelongsToAccessor<Team, typeof Match.prototype.id>;

  public readonly substitutions: HasManyRepositoryFactory<Substitution, typeof Match.prototype.id>;

  public readonly tournament: BelongsToAccessor<Tournament, typeof Match.prototype.id>;

  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource, @repository.getter('StadiumRepository') protected stadiumRepositoryGetter: Getter<StadiumRepository>, @repository.getter('StageRepository') protected stageRepositoryGetter: Getter<StageRepository>, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('SubstitutionRepository') protected substitutionRepositoryGetter: Getter<SubstitutionRepository>, @repository.getter('TournamentRepository') protected tournamentRepositoryGetter: Getter<TournamentRepository>,
  ) {
    super(Match, dataSource);
    this.tournament = this.createBelongsToAccessorFor('tournament', tournamentRepositoryGetter,);
    this.registerInclusionResolver('tournament', this.tournament.inclusionResolver);
    this.substitutions = this.createHasManyRepositoryFactoryFor('substitutions', substitutionRepositoryGetter,);
    this.registerInclusionResolver('substitutions', this.substitutions.inclusionResolver);
    this.team = this.createBelongsToAccessorFor('team', teamRepositoryGetter,);
    this.registerInclusionResolver('team', this.team.inclusionResolver);
    this.stage = this.createBelongsToAccessorFor('stage', stageRepositoryGetter,);
    this.registerInclusionResolver('stage', this.stage.inclusionResolver);
    this.stadium = this.createBelongsToAccessorFor('stadium', stadiumRepositoryGetter,);
    this.registerInclusionResolver('stadium', this.stadium.inclusionResolver);
  }
}
