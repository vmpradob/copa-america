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
Host,
} from '../models';
import {TournamentRepository} from '../repositories';

export class TournamentHostController {
  constructor(
    @repository(TournamentRepository) protected tournamentRepository: TournamentRepository,
  ) { }

  @get('/tournaments/{id}/hosts', {
    responses: {
      '200': {
        description: 'Array of Tournament has many Host through Group',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Host)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Host>,
  ): Promise<Host[]> {
    return this.tournamentRepository.hosts(id).find(filter);
  }

  @post('/tournaments/{id}/hosts', {
    responses: {
      '200': {
        description: 'create a Host model instance',
        content: {'application/json': {schema: getModelSchemaRef(Host)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tournament.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Host, {
            title: 'NewHostInTournament',
            exclude: ['id'],
          }),
        },
      },
    }) host: Omit<Host, 'id'>,
  ): Promise<Host> {
    return this.tournamentRepository.hosts(id).create(host);
  }

  @patch('/tournaments/{id}/hosts', {
    responses: {
      '200': {
        description: 'Tournament.Host PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Host, {partial: true}),
        },
      },
    })
    host: Partial<Host>,
    @param.query.object('where', getWhereSchemaFor(Host)) where?: Where<Host>,
  ): Promise<Count> {
    return this.tournamentRepository.hosts(id).patch(host, where);
  }

  @del('/tournaments/{id}/hosts', {
    responses: {
      '200': {
        description: 'Tournament.Host DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Host)) where?: Where<Host>,
  ): Promise<Count> {
    return this.tournamentRepository.hosts(id).delete(where);
  }
}
