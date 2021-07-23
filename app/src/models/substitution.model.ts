import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Player} from './player.model';
import {Match} from './match.model';

@model({
  settings: {
    foreignKeys: {
      fk_substitution_playerId: {
        name: 'fk_substitution_playerId',
        entity: 'Player',
        entityKey: 'passport',
        foreignKey: 'playerId',
        onUpdate: 'cascade', // restrict|cascade|set null|no action|set default
        onDelete: 'restrict'   // restrict|cascade|set null|no action|set default
      },
      fk_substitution_matchId: {
        name: 'fk_substitution_matchId',
        entity: 'Match',
        entityKey: 'id',
        foreignKey: 'matchId',
        onUpdate: 'cascade', // restrict|cascade|set null|no action|set default
        onDelete: 'restrict'   // restrict|cascade|set null|no action|set default
      },
    },
  },
})
export class Substitution extends Entity {
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
  minute: string;

  @property({
    type: 'string',
    required: true,
  })
  position: string;

  @belongsTo(() => Player)
  playerId: string;

  @belongsTo(() => Match)
  matchId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Substitution>) {
    super(data);
  }
}

export interface SubstitutionRelations {
  // describe navigational properties here
}

export type SubstitutionWithRelations = Substitution & SubstitutionRelations;
