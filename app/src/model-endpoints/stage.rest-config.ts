import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Stage} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Stage,
  pattern: 'CrudRest',
  dataSource: 'prod_database',
  basePath: '/stages',
};
module.exports = config;
