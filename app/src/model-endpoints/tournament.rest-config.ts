import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Tournament} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Tournament,
  pattern: 'CrudRest',
  dataSource: 'prod_database',
  basePath: '/tournaments',
};
module.exports = config;
