import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Tournament} from './tournament.model';
import {Team} from './team.model';
import {Host} from './host.model';

@model({
  settings: {
    foreignKeys: {
      fk_group_tournamentId: {
        name: 'fk_group_tournamentId',
        entity: 'Tournament',
        entityKey: 'id',
        foreignKey: 'tournamentId',
        onUpdate: 'cascade', // restrict|cascade|set null|no action|set default
        onDelete: 'restrict'   // restrict|cascade|set null|no action|set default
      },
      fk_group_hostId: {
        name: 'fk_group_hostId',
        entity: 'Host',
        entityKey: 'id',
        foreignKey: 'hostId',
        onUpdate: 'cascade', // restrict|cascade|set null|no action|set default
        onDelete: 'restrict'   // restrict|cascade|set null|no action|set default
      },
    },
  },
})
export class Group extends Entity {
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

  @belongsTo(() => Tournament)
  tournamentId: number;

  @hasMany(() => Team)
  teams: Team[];

  @belongsTo(() => Host)
  hostId: number;

  constructor(data?: Partial<Group>) {
    super(data);
  }
}

export interface GroupRelations {
  // describe navigational properties here
}

export type GroupWithRelations = Group & GroupRelations;
