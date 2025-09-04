'use server';

import App from '../src/components/App';
import { unstable_headers } from 'expo-router/rsc/headers';
import utils from '../src/utils';
import modules from '../modules';
import * as orm from '../orm';
import path from 'path';

if (process.env.PG_GATEWAY_PORT) import(path.join(process.cwd(), './database/service.mjs')).then((service) => service.default(orm.models, modules));

export async function DefaultServerComponent() {
  const headers = await unstable_headers();
  process.env.solu_middleware_path = headers.get('referer') ? new URL(headers.get('referer')).pathname : '/';
  process.env.solu_middleware_cookie = headers.get('cookie');
  return <App/>
}
