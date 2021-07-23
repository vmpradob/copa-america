import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Player} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Player,
  pattern: 'CrudRest',
  dataSource: 'prod_database',
  basePath: '/players',
};
module.exports = config;
