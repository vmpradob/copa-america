import {Entity, model, property, hasMany} from '@loopback/repository';
import {Group} from './group.model';
import {Match} from './match.model';
import {Team} from './team.model';
import {Stadium} from './stadium.model';
import {Stage} from './stage.model';
import {Host} from './host.model';

@model()
export class Tournament extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @hasMany(() => Group)
  groups: Group[];

  @hasMany(() => Match)
  matches: Match[];

  @hasMany(() => Team, {through: {model: () => Match}})
  teams: Team[];

  @hasMany(() => Stadium, {through: {model: () => Match}})
  stadiums: Stadium[];

  @hasMany(() => Stage, {through: {model: () => Match}})
  stages: Stage[];

  @hasMany(() => Host, {through: {model: () => Group}})
  hosts: Host[];

  constructor(data?: Partial<Tournament>) {
    super(data);
  }
}

export interface TournamentRelations {
  // describe navigational properties here
}

export type TournamentWithRelations = Tournament & TournamentRelations;
