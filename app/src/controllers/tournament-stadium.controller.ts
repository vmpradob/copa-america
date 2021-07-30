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
Match,
Stadium,
} from '../models';
import {TournamentRepository} from '../repositories';

export class TournamentStadiumController {
  constructor(
    @repository(TournamentRepository) protected tournamentRepository: TournamentRepository,
  ) { }

  @get('/tournaments/{id}/stadiums', {
    responses: {
      '200': {
        description: 'Array of Tournament has many Stadium through Match',
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
    return this.tournamentRepository.stadiums(id).find(filter);
  }

  @post('/tournaments/{id}/stadiums', {
    responses: {
      '200': {
        description: 'create a Stadium model instance',
        content: {'application/json': {schema: getModelSchemaRef(Stadium)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tournament.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stadium, {
            title: 'NewStadiumInTournament',
            exclude: ['id'],
          }),
        },
      },
    }) stadium: Omit<Stadium, 'id'>,
  ): Promise<Stadium> {
    return this.tournamentRepository.stadiums(id).create(stadium);
  }

  @patch('/tournaments/{id}/stadiums', {
    responses: {
      '200': {
        description: 'Tournament.Stadium PATCH success count',
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
    return this.tournamentRepository.stadiums(id).patch(stadium, where);
  }

  @del('/tournaments/{id}/stadiums', {
    responses: {
      '200': {
        description: 'Tournament.Stadium DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Stadium)) where?: Where<Stadium>,
  ): Promise<Count> {
    return this.tournamentRepository.stadiums(id).delete(where);
  }
}
