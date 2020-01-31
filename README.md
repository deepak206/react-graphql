# OAE Frontend

This repository contains the Frontend code for OAE

# Development

* Clone the project
* Run `npm install`
* Run `npm run start` to start react app on your local machine

# Build

* Run `npm run build` to create a production build
* Run `npm run start-server` to start the server on your local machine
> Note: For production, the react app will be served by proxy server

# Deployment

## With Proxy Server

* After the *Build* step, a `build` folder is generated
* Copy the `build` and `server` folders to the server
* Copy `package.json` to the server
* Run `npm install` (THIS IS IMPORTANT)
* Run `npm run start-server:[dev|stage|prod]` which will trigger the Web Server at `http://localhost:PORT`
* Use any proxy server to forward all requests to `http://localhost:PORT`
* To see the list of running process run `npm run list-server`

## Without Proxy Server

* After the *Build* step, a `build` folder is generated
* Copy the `build` folder to the server
* Use any http server to serve the `index.html` from the `build` folder

# Dependencies

* "@material-ui/core": "^4.3.1",
* "@material-ui/icons": "^4.2.1",
* "axios": "^0.19.0",
* "babel-plugin-relay": "^2.0.0-rc.2",
* "date-fns": "^1.30.1",
* "express": "^4.17.1",
* "history": "^4.9.0",
* "node-sass": "^4.12.0",
* "pm2": "^3.5.1",
* "prop-types": "^15.7.2",
* "react": "^16.8.6",
* "react-day-picker": "^7.3.1",
* "react-dom": "^16.8.6",
* "react-interpolate-component": "^0.12.0",
* "react-redux": "^7.1.0",
* "react-relay": "^5.0.0",
* "react-responsive-carousel": "^3.1.49",
* "react-router-dom": "^5.0.1",
* "react-scripts": "3.0.1",
* "redux": "^4.0.4",
* "redux-thunk": "^2.3.0"

# Documentation

Please update the docs accordingly so that there are no discrepencies between the API and the documentation.

* Add comments to methods.
* If writing a hack, mention what the hack is for.

# Contributing Guidelines

* Always pull from `development` branch
* Create a new branch when adding a new feature
	* Ideal branch name for a feature `feature/<JIRA_TICKET-short-feature-title>`
	* Ideal branch name for a bug fix `bug/<JIRA_TICKET_NO>`
* Always give a pull request. ***NEVER PUSH DIRECTLY TO `development` OR `staging` OR `master` BRANCH*** (Why? Because we want sanity when using CI/CD).
* Please don't include build folders/lib folders in your pull request.
* Follow [semver](https://semver.org/) guideliness when upgrading versions
* Follow [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) guidelines when committing changes.
