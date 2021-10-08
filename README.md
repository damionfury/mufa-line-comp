# Line Comp for MUFA README

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Frisbee icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/). (Attribution for these things to be added to a future Credits page)

## Purpose

A simple app to track score and co-ed line composition for Madison Ultimate Frisbee Association (mufa.org) games. The author is not affiliated with MUFA in any way. The use of its name and acronym does not constitute an endorsement of the app by MUFA, and no part of this app should be considered to represent MUFA in any way.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Deployment

This app is built to be run from an AWS S3 bucket configured for a static websites. Deployment is a 3 step process.

### Step 1 – Build the app

1. Add the Cloudflare Web Analytics token into `public/index.html` where it says `ADD_TOKEN_BEFORE_DEPLOY`
2. Build the app: `yarn build`

### Step 2 - Deploy the app

1. Login to the AWS console
2. Get into the S3 bucket you want to upload to
3. Upload everything from the `build/` folder
4. Make sure the content was set to be publicly accessible

### Step 3 - Cleanup (semi-optional)

1. Remove credentials/tokens that you added in step 1 – never commit credentials/tokens to a repository; if you don't cleanup you are sure to forget and commit them later
2. Delete the `build/` folder – not strictly necessary but it can help you be confident a build was successful

## TODO list

1. Build a history section so you can see the score and line comp history during a game
2. Build a basic deploy script that can do all of the steps
3. Build an interface and logic to handle conflicts between local and remote game states.
