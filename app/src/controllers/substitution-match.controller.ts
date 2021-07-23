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
  Match,
} from '../models';
import {SubstitutionRepository} from '../repositories';

export class SubstitutionMatchController {
  constructor(
    @repository(SubstitutionRepository)
    public substitutionRepository: SubstitutionRepository,
  ) { }

  @get('/substitutions/{id}/match', {
    responses: {
      '200': {
        description: 'Match belonging to Substitution',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Match)},
          },
        },
      },
    },
  })
  async getMatch(
    @param.path.number('id') id: typeof Substitution.prototype.id,
  ): Promise<Match> {
    return this.substitutionRepository.match(id);
  }
}
