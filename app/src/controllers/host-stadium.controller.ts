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
  Stadium,
} from '../models';
import {HostRepository} from '../repositories';

export class HostStadiumController {
  constructor(
    @repository(HostRepository) protected hostRepository: HostRepository,
  ) { }

  @get('/hosts/{id}/stadiums', {
    responses: {
      '200': {
        description: 'Array of Host has many Stadium',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Stadium)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Stadium>,
  ): Promise<Stadium[]> {
    return this.hostRepository.stadiums(id).find(filter);
  }

  @post('/hosts/{id}/stadiums', {
    responses: {
      '200': {
        description: 'Host model instance',
        content: {'application/json': {schema: getModelSchemaRef(Stadium)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Host.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stadium, {
            title: 'NewStadiumInHost',
            exclude: ['id'],
            optional: ['hostId']
          }),
        },
      },
    }) stadium: Omit<Stadium, 'id'>,
  ): Promise<Stadium> {
    return this.hostRepository.stadiums(id).create(stadium);
  }

  @patch('/hosts/{id}/stadiums', {
    responses: {
      '200': {
        description: 'Host.Stadium PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stadium, {partial: true}),
        },
      },
    })
    stadium: Partial<Stadium>,
    @param.query.object('where', getWhereSchemaFor(Stadium)) where?: Where<Stadium>,
  ): Promise<Count> {
    return this.hostRepository.stadiums(id).patch(stadium, where);
  }

  @del('/hosts/{id}/stadiums', {
    responses: {
      '200': {
        description: 'Host.Stadium DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Stadium)) where?: Where<Stadium>,
  ): Promise<Count> {
    return this.hostRepository.stadiums(id).delete(where);
  }
}
