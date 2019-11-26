# lib-forms-api #

## Repository structure
The repository contains both client and server code and is organized as follows.

- /schema (Shared graphql schema and sql code)
- /stacks (Server side code)
    - base
    - api-userauth
    - api-streams
    - api-appsync
    - api-forms
- /client (Client library code used by consuming clients)
    - fragments.graphql
    - queries.graphql
    - mutations.graphql
    - index.ts (This is autogenerated)
- /test (Integration tests)

## Architecture
- See fl-infrastructure for VPC/RDS/S3 and Cognito setup.
- The API is split into the following stacks:
    - base (Creates APIG RestAPI, SQS Queues and exports base vars such as RDS, Cognito etc. to SSM)
    - api-userauth (Creates invite, authftp and cognito postconfirmation lambdas)
    - api-streams (Creates kinesis delivery stream creator lambda and associated IAM roles)
    - api-appsync (Creates appsync api and Route53 mapping)
    - api-forms (Created form json, view entry lambdas and sqs queue listeners)

## Dependencies
Run `npm i` in
- /test
- /client
- /stacks/**/

## Region
Due to AWS limitations, currently the following regions are supported:
- US East
    - `us-east-1` Ohio
    - `us-east-2` Northern Virginia
- Asia Pacific
    - `ap-northeast-1` Tokyo (DEFAULT)
- EU
    - `eu-west-1` Ireland

## Environment
The following deployment environments are supported
- dev (DEFAULT)
- staging
- production

To execute commands deployment/removal for a specific environment suffix the npm command with the environment, for e.g. `npm run deploy:staging`

## Testing
First run `npm run codegen` under /client
Navigate to the test folder and run `npm run test` on the commandline.

## Deploying
Before deploying stacks, first deploy the core environment/region using `fl-infrastructure`, this will setup **VPC**, **Cognito**, **S3** and an **RDS** instance.

Deployment should be performed in the following order
- stacks/base
- stacks/api-userauth
- stacks/api-streams
- stacks/api-appsync
- stacks/api-integration
- stacks/api-forms
- stacks/api-app

Navigate to the subfolder within the stacks directory and run `npm run deploy`

## First time deployment tasks
- Create database tables `schema/sql/schema.sql`
- Create database stored procs `schema/sql/procs.sql`
- Add Cognito admin user to "Admin" group
- Add Cognito admin user to database
- Check alarms on lambdas

## Packaging
Run `npm run release` in /client, this will re-run codegen and publish updated **index.js**, **index.d.ts** and **.graphql** files to npm.

*Note* - The package name is **lib-forms-api**

## Removing
Navigate to the following directories **in the specified order** and run `npm run remove`
- stacks/api-app
- stacks/api-forms
- stacks/api-appsync
- stacks/api-integration
- stacks/api-userauth
- stacks/api-streams
- stacks/base

If the entire AWS infrastructure needs to be wiped, you will also need to run `terraform destroy` under the `fl-infrastructure` project.