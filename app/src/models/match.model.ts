import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Stadium} from './stadium.model';
import {Stage} from './stage.model';
import {Team} from './team.model';
import {Substitution} from './substitution.model';
import {Tournament} from './tournament.model';

@model({
  settings: {
    foreignKeys: {
      fk_match_stadiumId: {
        name: 'fk_match_stadiumId',
        entity: 'Stadium',
        entityKey: 'id',
        foreignKey: 'stadiumId',
        onUpdate: 'cascade', // restrict|cascade|set null|no action|set default
        onDelete: 'restrict'   // restrict|cascade|set null|no action|set default
      },
      fk_match_stageId: {
        name: 'fk_match_stageId',
        entity: 'Stage',
        entityKey: 'id',
        foreignKey: 'stageId',
        onUpdate: 'cascade', // restrict|cascade|set null|no action|set default
        onDelete: 'restrict'   // restrict|cascade|set null|no action|set default
      },
      fk_match_teamId: {
        name: 'fk_match_teamId',
        entity: 'Team',
        entityKey: 'id',
        foreignKey: 'teamId',
        onUpdate: 'cascade', // restrict|cascade|set null|no action|set default
        onDelete: 'restrict'   // restrict|cascade|set null|no action|set default
      },
      fk_match_tournamentId: {
        name: 'fk_match_torunamentId',
        entity: 'Tournament',
        entityKey: 'id',
        foreignKey: 'tournamentId',
        onUpdate: 'cascade', // restrict|cascade|set null|no action|set default
        onDelete: 'restrict'   // restrict|cascade|set null|no action|set default
      },
    },
  },
})
export class Match extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
  })
  result?: string;

  @belongsTo(() => Stadium)
  stadiumId: number;

  @belongsTo(() => Stage)
  stageId: number;

  @belongsTo(() => Team)
  teamId: number;

  @hasMany(() => Substitution)
  substitutions: Substitution[];

  @belongsTo(() => Tournament)
  tournamentId: number;

  constructor(data?: Partial<Match>) {
    super(data);
  }
}

export interface MatchRelations {
  // describe navigational properties here
}

export type MatchWithRelations = Match & MatchRelations;
