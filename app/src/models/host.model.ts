import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Tournament} from './tournament.model';

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

  constructor(data?: Partial<Host>) {
    super(data);
  }
}

export interface HostRelations {
  // describe navigational properties here
}

export type HostWithRelations = Host & HostRelations;
