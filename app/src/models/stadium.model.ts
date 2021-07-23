import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Host} from './host.model';
import {Match} from './match.model';

@model({
  settings: {
    foreignKeys: {
      fk_stadium_hostId: {
        name: 'fk_stadium_hostId',
        entity: 'Host',
        entityKey: 'id',
        foreignKey: 'hostId',
        onUpdate: 'cascade', // restrict|cascade|set null|no action|set default
        onDelete: 'restrict'   // restrict|cascade|set null|no action|set default
      },
    },
  },
})
export class Stadium extends Entity {
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

  @belongsTo(() => Host)
  hostId: number;

  @hasMany(() => Match)
  matches: Match[];

  constructor(data?: Partial<Stadium>) {
    super(data);
  }
}

export interface StadiumRelations {
  // describe navigational properties here
}

export type StadiumWithRelations = Stadium & StadiumRelations;
