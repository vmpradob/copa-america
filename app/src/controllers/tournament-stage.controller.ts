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
Stage,
} from '../models';
import {TournamentRepository} from '../repositories';

export class TournamentStageController {
  constructor(
    @repository(TournamentRepository) protected tournamentRepository: TournamentRepository,
  ) { }

  @get('/tournaments/{id}/stages', {
    responses: {
      '200': {
        description: 'Array of Tournament has many Stage through Match',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Stage)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Stage>,
  ): Promise<Stage[]> {
    return this.tournamentRepository.stages(id).find(filter);
  }

  @post('/tournaments/{id}/stages', {
    responses: {
      '200': {
        description: 'create a Stage model instance',
        content: {'application/json': {schema: getModelSchemaRef(Stage)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tournament.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stage, {
            title: 'NewStageInTournament',
            exclude: ['id'],
          }),
        },
      },
    }) stage: Omit<Stage, 'id'>,
  ): Promise<Stage> {
    return this.tournamentRepository.stages(id).create(stage);
  }

  @patch('/tournaments/{id}/stages', {
    responses: {
      '200': {
        description: 'Tournament.Stage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stage, {partial: true}),
        },
      },
    })
    stage: Partial<Stage>,
    @param.query.object('where', getWhereSchemaFor(Stage)) where?: Where<Stage>,
  ): Promise<Count> {
    return this.tournamentRepository.stages(id).patch(stage, where);
  }

  @del('/tournaments/{id}/stages', {
    responses: {
      '200': {
        description: 'Tournament.Stage DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Stage)) where?: Where<Stage>,
  ): Promise<Count> {
    return this.tournamentRepository.stages(id).delete(where);
  }
}
