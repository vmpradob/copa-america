import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Tournament} from './tournament.model';
import {Group} from './group.model';
import {Stadium} from './stadium.model';

@model()
export class Host extends Entity {
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

  @hasMany(() => Group)
  groups: Group[];

  @hasMany(() => Stadium)
  stadiums: Stadium[];

  constructor(data?: Partial<Host>) {
    super(data);
  }
}

export interface HostRelations {
  // describe navigational properties here
}

export type HostWithRelations = Host & HostRelations;
