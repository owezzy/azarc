// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  domain: 'owezzy.auth0.com',
  clientId: '4LuVbbsZ60hlQNYmyFmiIsrRTYqJ22be',
  audience: 'YOUR_API_IDENTIFIER',
  apiUri: 'http://localhost:3001',
  appUri: 'http://localhost:4200',
  errorPath: '/error',
  ngrx_logs: true,
  AUTH0_USERNAME: 'test@test.com',
  AUTH0_PASSWORD: 'test1234',
  AUTH0_CLIENT_SECRET:
    'Q2wlfdz2IlShhhe5ksO62dAdwjqPG4utyQYt5hrWmjvK4WVW9wALYG8l2NPYpJv4',
  AZARC_AUTH0_DOMAIN: 'owezzy.auth0.com',
  AZARC_APP_AUTH0_CLIENTID: '4LuVbbsZ60hlQNYmyFmiIsrRTYqJ22be',
  AZARC_APP_AUTH0_AUDIENCE: 'https://owezzy.auth0.com/api/v2/',
  AZARC_APP_AUTH0_SCOPE: 'openid email profile',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
