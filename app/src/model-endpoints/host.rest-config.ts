import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Host} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Host,
  pattern: 'CrudRest',
  dataSource: 'prod_database',
  basePath: '/hosts',
};
module.exports = config;
