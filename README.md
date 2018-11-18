myBook is a single page app which simulates social network. This app shows usage of GET,POST,PUT,DELETE API's methods. For this app React.js with Redux was used. App shows simple way for implementing validation with React, also main focus on this app was work on implementing reusable components for form and input fields.

## Installation

```sh
npm install
```

## Scripts

To run project in dev env with webpack-dev-server and source maps, run:
```sh
npm run dev
```

To run project in prod env with express server and minification of resources, run:
```sh
npm start
```

## Redux ajax adapter
Simple function that wraps axios API calls and takes action creators to dispatch on call request, success or error.
This can be extended with custom auth stuff, like headers, so you don't have to specify them with every API call you make.


