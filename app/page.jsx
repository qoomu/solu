import React from 'react';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import App from '../src/components/App';

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

export default async function NoSSR() {
  const header = await headers();
  process.env.solu_middleware_path = header.get('referer') ? new URL(header.get('referer')).pathname : '/';
  process.env.solu_middleware_cookie = header.get('cookie');
  return <App/>;
  // return (
  //   React.createElement(NoSsrComponent)
  // );
}