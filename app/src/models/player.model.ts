import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Team} from './team.model';
import {Match} from './match.model';
import {Substitution} from './substitution.model';

@model({
  settings: {
    foreignKeys: {
      fk_player_teamId: {
        name: 'fk_player_teamId',
        entity: 'Team',
        entityKey: 'id',
        foreignKey: 'teamId',
        onUpdate: 'cascade', // restrict|cascade|set null|no action|set default
        onDelete: 'restrict'   // restrict|cascade|set null|no action|set default
      },
    },
  },
})
export class Player extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  passport: string;

  @property({
    type: 'date',
    required: true,
  })
  passport_expire_dt: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
  })
  nickname?: string;

  @property({
    type: 'string',
    required: true,
  })
  shirt_name: string;

  @property({
    type: 'date',
    required: true,
  })
  birthdate: string;

  @property({
    type: 'string',
    required: true,
  })
  club_name: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @property({
    type: 'number',
    required: true,
  })
  shirt_number: number;

  @property({
    type: 'string',
    required: true,
  })
  position: string;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;

  @property({
    type: 'number',
    required: true,
  })
  height: number;

  @belongsTo(() => Team)
  teamId: number;

  @hasMany(() => Substitution)
  substitutions: Substitution[];

  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;
