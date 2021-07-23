import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Substitution,
  Player,
} from '../models';
import {SubstitutionRepository} from '../repositories';

export class SubstitutionPlayerController {
  constructor(
    @repository(SubstitutionRepository)
    public substitutionRepository: SubstitutionRepository,
  ) { }

  @get('/substitutions/{id}/player', {
    responses: {
      '200': {
        description: 'Player belonging to Substitution',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Player)},
          },
        },
      },
    },
  })
  async getPlayer(
    @param.path.number('id') id: typeof Substitution.prototype.id,
  ): Promise<Player> {
    return this.substitutionRepository.player(id);
  }
}
