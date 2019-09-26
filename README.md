# lib-forms-api #

## Organization
The repository is organized as a monorepo that contains both client and server code.
- stacks
    - base
    - api-userauth
    - api-appsync
    - api-forms
- client
    - fragments.graphql
    - queries.graphql
    - mutations.graphql
    - index.ts (codegen)
- tests
- lib

## Installing dependencies
Navigate to the subfolder within the stacks directory and run `npm i`

## Region
Due to AWS limitations, currently the following regions are supported:
- US East
    - `us-east-1` Ohio (DEFAULT)
    - `us-east-2` Northern Virginia
- Asia Pacific
    - `ap-northeast-1` Tokyo
- EU
    - `eu-west-1` Ireland

## Environment
The following deployment environments are supported
- dev (DEFAULT)
- staging
- production

To execute commands deployment/removal for a specific environment suffix the npm command with the environment, for e.g. `npm run deploy:staging`

## Deploying
Deployment should be performed in the following order
- stacks/base
- stacks/api-userauth
- stacks/api-appsync
- stacks/api-forms

Navigate to the subfolder within the stacks directory and run `npm run deploy`

## First deploy tasks
- Create database tables `schema/sql/schema.sql`
- Create database stored procs `schema/sql/procs.sql`
- Add Cognito admin user to "Admin" group
- Add Cognito admin user to database
- Check alarms on lambdas

## Removing
Removal should be performed in the following order
- stacks/api-forms
- stacks/api-appsync
- stacks/api-userauth
- stacks/base

Navigate to the subfolder within the stacks directory and run `npm run remove`
