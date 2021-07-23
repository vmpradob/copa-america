import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Stadium,
  Host,
} from '../models';
import {StadiumRepository} from '../repositories';

export class StadiumHostController {
  constructor(
    @repository(StadiumRepository)
    public stadiumRepository: StadiumRepository,
  ) { }

  @get('/stadiums/{id}/host', {
    responses: {
      '200': {
        description: 'Host belonging to Stadium',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Host)},
          },
        },
      },
    },
  })
  async getHost(
    @param.path.number('id') id: typeof Stadium.prototype.id,
  ): Promise<Host> {
    return this.stadiumRepository.host(id);
  }
}
