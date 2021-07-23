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
  Match,
  Substitution,
} from '../models';
import {MatchRepository} from '../repositories';

export class MatchSubstitutionController {
  constructor(
    @repository(MatchRepository) protected matchRepository: MatchRepository,
  ) { }

  @get('/matches/{id}/substitutions', {
    responses: {
      '200': {
        description: 'Array of Match has many Substitution',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Substitution)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Substitution>,
  ): Promise<Substitution[]> {
    return this.matchRepository.substitutions(id).find(filter);
  }

  @post('/matches/{id}/substitutions', {
    responses: {
      '200': {
        description: 'Match model instance',
        content: {'application/json': {schema: getModelSchemaRef(Substitution)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Match.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Substitution, {
            title: 'NewSubstitutionInMatch',
            exclude: ['id'],
            optional: ['matchId']
          }),
        },
      },
    }) substitution: Omit<Substitution, 'id'>,
  ): Promise<Substitution> {
    return this.matchRepository.substitutions(id).create(substitution);
  }

  @patch('/matches/{id}/substitutions', {
    responses: {
      '200': {
        description: 'Match.Substitution PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Substitution, {partial: true}),
        },
      },
    })
    substitution: Partial<Substitution>,
    @param.query.object('where', getWhereSchemaFor(Substitution)) where?: Where<Substitution>,
  ): Promise<Count> {
    return this.matchRepository.substitutions(id).patch(substitution, where);
  }

  @del('/matches/{id}/substitutions', {
    responses: {
      '200': {
        description: 'Match.Substitution DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Substitution)) where?: Where<Substitution>,
  ): Promise<Count> {
    return this.matchRepository.substitutions(id).delete(where);
  }
}
