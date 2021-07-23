import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Stadium, StadiumRelations, Host, Match} from '../models';
import {HostRepository} from './host.repository';
import {MatchRepository} from './match.repository';

export class StadiumRepository extends DefaultCrudRepository<
  Stadium,
  typeof Stadium.prototype.id,
  StadiumRelations
> {

  public readonly host: BelongsToAccessor<Host, typeof Stadium.prototype.id>;

  public readonly matches: HasManyRepositoryFactory<Match, typeof Stadium.prototype.id>;

  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource, @repository.getter('HostRepository') protected hostRepositoryGetter: Getter<HostRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Stadium, dataSource);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
    this.registerInclusionResolver('matches', this.matches.inclusionResolver);
    this.host = this.createBelongsToAccessorFor('host', hostRepositoryGetter,);
    this.registerInclusionResolver('host', this.host.inclusionResolver);
  }
}
