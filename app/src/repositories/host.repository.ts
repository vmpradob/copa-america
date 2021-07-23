import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ProdDatabaseDataSource} from '../datasources';
import {Host, HostRelations, Group, Stadium} from '../models';
import {GroupRepository} from './group.repository';
import {StadiumRepository} from './stadium.repository';

export class HostRepository extends DefaultCrudRepository<
  Host,
  typeof Host.prototype.id,
  HostRelations
> {

  public readonly groups: HasManyRepositoryFactory<Group, typeof Host.prototype.id>;

  public readonly stadiums: HasManyRepositoryFactory<Stadium, typeof Host.prototype.id>;

  constructor(
    @inject('datasources.prod_database') dataSource: ProdDatabaseDataSource, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>, @repository.getter('StadiumRepository') protected stadiumRepositoryGetter: Getter<StadiumRepository>,
  ) {
    super(Host, dataSource);
    this.stadiums = this.createHasManyRepositoryFactoryFor('stadiums', stadiumRepositoryGetter,);
    this.registerInclusionResolver('stadiums', this.stadiums.inclusionResolver);
    this.groups = this.createHasManyRepositoryFactoryFor('groups', groupRepositoryGetter,);
    this.registerInclusionResolver('groups', this.groups.inclusionResolver);
  }
}
