import {Entity, model, property} from '@loopback/repository';

@model()
export class Stage extends Entity {
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


  constructor(data?: Partial<Stage>) {
    super(data);
  }
}

export interface StageRelations {
  // describe navigational properties here
}

export type StageWithRelations = Stage & StageRelations;
