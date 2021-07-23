import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Group} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Group,
  pattern: 'CrudRest',
  dataSource: 'prod_database',
  basePath: '/groups',
};
module.exports = config;
