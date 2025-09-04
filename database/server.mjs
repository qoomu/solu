import modules from '../modules/index.js';
import { models } from '../orm/index.js';
import service from './service';

await service(models);