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
  Tournament,
} from '../models';
import {GroupRepository} from '../repositories';

export class GroupTournamentController {
  constructor(
    @repository(GroupRepository)
    public groupRepository: GroupRepository,
  ) { }

  @get('/groups/{id}/tournament', {
    responses: {
      '200': {
        description: 'Tournament belonging to Group',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tournament)},
          },
        },
      },
    },
  })
  async getTournament(
    @param.path.number('id') id: typeof Group.prototype.id,
  ): Promise<Tournament> {
    return this.groupRepository.tournament(id);
  }
}
