import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Match} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Match,
  pattern: 'CrudRest',
  dataSource: 'prod_database',
  basePath: '/matches',
};
module.exports = config;
