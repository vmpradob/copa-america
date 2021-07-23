import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Tournament,
  Group,
} from '../models';
import {TournamentRepository} from '../repositories';

export class TournamentGroupController {
  constructor(
    @repository(TournamentRepository) protected tournamentRepository: TournamentRepository,
  ) { }

  @get('/tournaments/{id}/groups', {
    responses: {
      '200': {
        description: 'Array of Tournament has many Group',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Group)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Group>,
  ): Promise<Group[]> {
    return this.tournamentRepository.groups(id).find(filter);
  }

  @post('/tournaments/{id}/groups', {
    responses: {
      '200': {
        description: 'Tournament model instance',
        content: {'application/json': {schema: getModelSchemaRef(Group)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tournament.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Group, {
            title: 'NewGroupInTournament',
            exclude: ['id'],
            optional: ['tournamentId']
          }),
        },
      },
    }) group: Omit<Group, 'id'>,
  ): Promise<Group> {
    return this.tournamentRepository.groups(id).create(group);
  }

  @patch('/tournaments/{id}/groups', {
    responses: {
      '200': {
        description: 'Tournament.Group PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Group, {partial: true}),
        },
      },
    })
    group: Partial<Group>,
    @param.query.object('where', getWhereSchemaFor(Group)) where?: Where<Group>,
  ): Promise<Count> {
    return this.tournamentRepository.groups(id).patch(group, where);
  }

  @del('/tournaments/{id}/groups', {
    responses: {
      '200': {
        description: 'Tournament.Group DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Group)) where?: Where<Group>,
  ): Promise<Count> {
    return this.tournamentRepository.groups(id).delete(where);
  }
}
