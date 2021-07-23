import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Group,
  Host,
} from '../models';
import {GroupRepository} from '../repositories';

export class GroupHostController {
  constructor(
    @repository(GroupRepository)
    public groupRepository: GroupRepository,
  ) { }

  @get('/groups/{id}/host', {
    responses: {
      '200': {
        description: 'Host belonging to Group',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Host)},
          },
        },
      },
    },
  })
  async getHost(
    @param.path.number('id') id: typeof Group.prototype.id,
  ): Promise<Host> {
    return this.groupRepository.host(id);
  }
}
