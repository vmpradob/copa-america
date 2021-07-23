import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Group, GroupRelations, Tournament, Team, Host} from '../models';
import {TournamentRepository} from './tournament.repository';
import {TeamRepository} from './team.repository';
import {HostRepository} from './host.repository';

export class GroupRepository extends DefaultCrudRepository<
  Group,
  typeof Group.prototype.id,
  GroupRelations
> {

  public readonly tournament: BelongsToAccessor<Tournament, typeof Group.prototype.id>;

  public readonly teams: HasManyRepositoryFactory<Team, typeof Group.prototype.id>;

  public readonly host: BelongsToAccessor<Host, typeof Group.prototype.id>;

  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource, @repository.getter('TournamentRepository') protected tournamentRepositoryGetter: Getter<TournamentRepository>, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('HostRepository') protected hostRepositoryGetter: Getter<HostRepository>,
  ) {
    super(Group, dataSource);
    this.host = this.createBelongsToAccessorFor('host', hostRepositoryGetter,);
    this.registerInclusionResolver('host', this.host.inclusionResolver);
    this.teams = this.createHasManyRepositoryFactoryFor('teams', teamRepositoryGetter,);
    this.registerInclusionResolver('teams', this.teams.inclusionResolver);
    this.tournament = this.createBelongsToAccessorFor('tournament', tournamentRepositoryGetter,);
    this.registerInclusionResolver('tournament', this.tournament.inclusionResolver);
  }
}
