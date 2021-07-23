import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Team} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Team,
  pattern: 'CrudRest',
  dataSource: 'prod_database',
  basePath: '/teams',
};
module.exports = config;
