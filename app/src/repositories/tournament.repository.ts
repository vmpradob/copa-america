import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Tournament, TournamentRelations, Group, Match, Team, Stadium, Stage, Host} from '../models';
import {GroupRepository} from './group.repository';
import {MatchRepository} from './match.repository';
import {TeamRepository} from './team.repository';
import {StadiumRepository} from './stadium.repository';
import {StageRepository} from './stage.repository';
import {HostRepository} from './host.repository';

export class TournamentRepository extends DefaultCrudRepository<
  Tournament,
  typeof Tournament.prototype.id,
  TournamentRelations
> {

  public readonly groups: HasManyRepositoryFactory<Group, typeof Tournament.prototype.id>;

  public readonly matches: HasManyRepositoryFactory<Match, typeof Tournament.prototype.id>;

  public readonly teams: HasManyThroughRepositoryFactory<Team, typeof Team.prototype.id,
          Group,
          typeof Tournament.prototype.id
        >;

  public readonly stadiums: HasManyThroughRepositoryFactory<Stadium, typeof Stadium.prototype.id,
          Match,
          typeof Tournament.prototype.id
        >;

  public readonly stages: HasManyThroughRepositoryFactory<Stage, typeof Stage.prototype.id,
          Match,
          typeof Tournament.prototype.id
        >;

  public readonly hosts: HasManyThroughRepositoryFactory<Host, typeof Host.prototype.id,
          Group,
          typeof Tournament.prototype.id
        >;

  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('StadiumRepository') protected stadiumRepositoryGetter: Getter<StadiumRepository>, @repository.getter('StageRepository') protected stageRepositoryGetter: Getter<StageRepository>, @repository.getter('HostRepository') protected hostRepositoryGetter: Getter<HostRepository>,
  ) {
    super(Tournament, dataSource);
    this.hosts = this.createHasManyThroughRepositoryFactoryFor('hosts', hostRepositoryGetter, groupRepositoryGetter,);
    this.registerInclusionResolver('hosts', this.hosts.inclusionResolver);
    this.stages = this.createHasManyThroughRepositoryFactoryFor('stages', stageRepositoryGetter, matchRepositoryGetter,);
    this.registerInclusionResolver('stages', this.stages.inclusionResolver);
    this.stadiums = this.createHasManyThroughRepositoryFactoryFor('stadiums', stadiumRepositoryGetter, matchRepositoryGetter,);
    this.registerInclusionResolver('stadiums', this.stadiums.inclusionResolver);
    this.teams = this.createHasManyThroughRepositoryFactoryFor('teams', teamRepositoryGetter, groupRepositoryGetter,);
    this.registerInclusionResolver('teams', this.teams.inclusionResolver);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
    this.registerInclusionResolver('matches', this.matches.inclusionResolver);
    this.groups = this.createHasManyRepositoryFactoryFor('groups', groupRepositoryGetter,);
    this.registerInclusionResolver('groups', this.groups.inclusionResolver);
  }
}
