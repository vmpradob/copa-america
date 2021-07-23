import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Stadium} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Stadium,
  pattern: 'CrudRest',
  dataSource: 'prod_database',
  basePath: '/stadiums',
};
module.exports = config;
