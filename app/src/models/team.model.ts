import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Group} from './group.model';
import {Player} from './player.model';
import {Match} from './match.model';

@model({
  settings: {
    foreignKeys: {
      fk_team_groupId: {
        name: 'fk_team_groupId',
        entity: 'Group',
        entityKey: 'id',
        foreignKey: 'groupId',
        onUpdate: 'cascade', // restrict|cascade|set null|no action|set default
        onDelete: 'restrict'   // restrict|cascade|set null|no action|set default
      },
    },
  },
})
export class Team extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @belongsTo(() => Group)
  groupId: number;

  @hasMany(() => Player)
  players: Player[];

  @hasMany(() => Match)
  matches: Match[];

  constructor(data?: Partial<Team>) {
    super(data);
  }
}

export interface TeamRelations {
  // describe navigational properties here
}

export type TeamWithRelations = Team & TeamRelations;
