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
  Player,
  Substitution,
} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerSubstitutionController {
  constructor(
    @repository(PlayerRepository) protected playerRepository: PlayerRepository,
  ) { }

  @get('/players/{id}/substitutions', {
    responses: {
      '200': {
        description: 'Array of Player has many Substitution',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Substitution)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Substitution>,
  ): Promise<Substitution[]> {
    return this.playerRepository.substitutions(id).find(filter);
  }

  @post('/players/{id}/substitutions', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {'application/json': {schema: getModelSchemaRef(Substitution)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Player.prototype.passport,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Substitution, {
            title: 'NewSubstitutionInPlayer',
            exclude: ['id'],
            optional: ['playerId']
          }),
        },
      },
    }) substitution: Omit<Substitution, 'id'>,
  ): Promise<Substitution> {
    return this.playerRepository.substitutions(id).create(substitution);
  }

  @patch('/players/{id}/substitutions', {
    responses: {
      '200': {
        description: 'Player.Substitution PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
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
    return this.playerRepository.substitutions(id).patch(substitution, where);
  }

  @del('/players/{id}/substitutions', {
    responses: {
      '200': {
        description: 'Player.Substitution DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Substitution)) where?: Where<Substitution>,
  ): Promise<Count> {
    return this.playerRepository.substitutions(id).delete(where);
  }
}
