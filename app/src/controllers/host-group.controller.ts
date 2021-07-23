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
  Host,
  Group,
} from '../models';
import {HostRepository} from '../repositories';

export class HostGroupController {
  constructor(
    @repository(HostRepository) protected hostRepository: HostRepository,
  ) { }

  @get('/hosts/{id}/groups', {
    responses: {
      '200': {
        description: 'Array of Host has many Group',
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
    return this.hostRepository.groups(id).find(filter);
  }

  @post('/hosts/{id}/groups', {
    responses: {
      '200': {
        description: 'Host model instance',
        content: {'application/json': {schema: getModelSchemaRef(Group)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Host.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Group, {
            title: 'NewGroupInHost',
            exclude: ['id'],
            optional: ['hostId']
          }),
        },
      },
    }) group: Omit<Group, 'id'>,
  ): Promise<Group> {
    return this.hostRepository.groups(id).create(group);
  }

  @patch('/hosts/{id}/groups', {
    responses: {
      '200': {
        description: 'Host.Group PATCH success count',
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
    return this.hostRepository.groups(id).patch(group, where);
  }

  @del('/hosts/{id}/groups', {
    responses: {
      '200': {
        description: 'Host.Group DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Group)) where?: Where<Group>,
  ): Promise<Count> {
    return this.hostRepository.groups(id).delete(where);
  }
}
