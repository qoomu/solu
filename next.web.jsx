import React from 'react';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import App from './src/components/App';
import modules from './modules';
import * as orm from './orm';
import path from 'path';

if (process.env.PG_GATEWAY_PORT) eval(`import(${JSON.stringify(path.join(process.cwd(), './database/service.mjs'))})`).then((service) => service.default(orm.models, modules));


// const plugins = [
//   'python',
//   ["module-resolver", {
//     "alias": {
//       "^react-native$": "react-native-web"
//     }
//   }],
// ]

// require('@babel/register')({plugins, ignore: []});

// const App = dynamic(
//   () => import('../src/components/App'),
//   { ssr: false }
// );

async function NoSSR() {
  const header = await headers();
  process.env.solu_middleware_path = header.get('referer') ? new URL(header.get('referer')).pathname : '/';
  process.env.solu_middleware_cookie = header.get('cookie');
  return <App/>;
  // return (
  //   React.createElement(NoSsrComponent)
  // );
}

export default () => NoSSR();
