import {inject} from '@loopback/core';
import { repository } from '@loopback/repository';
import { get, getModelSchemaRef, param, post } from '@loopback/rest';
import { Match, Tournament } from '../models';
import { MatchRepository, TournamentRepository } from '../repositories';


export class CustomRequestController {
  constructor(
    @repository(TournamentRepository)
    protected tournamentRepository: TournamentRepository,
    @repository(MatchRepository)
    protected matchRepository : MatchRepository
  ) {}

  @get('/tournament_details/{id}', {
    responses: {
      '200': {
        description: 'Tournament specifications',
        content: {
          'application/json': {
            schema: {type: 'object', item: getModelSchemaRef(Tournament)},
          },
        },
      },
    },
  })
  async getTournamentGroup(
    @param.path.number('id') id: typeof Tournament.prototype.id,
  ) {
    return this.tournamentRepository.findById(id,{ include: ['groups','matches','teams','stadiums','stages','hosts'] });
  }
  @get('/match_details/{id}', { 
    responses: {
      '200': {
        description: 'Match details',
        content: {
          'application/json': {
            schema: {type: 'object', item: getModelSchemaRef(Match)},
          },
        },
      },
    },
  })
  async getMatchDetails(
    @param.path.number('id') id: typeof Match.prototype.id,
  ){
    var response ={
      date: '',
      time: null,
      stadium: null,
      city: null,
      host: null,
      stage: null, 
      referee: null,
    }
    // this.matchRepository.findById(id,{ include: ['teams','stadiums','stages','hosts', 'tournament' ] })
    // .then( (m) => {
    //   response.date = m.date;
    //   response.stadium = m.stadium
    // });

    return response;
  }
}
