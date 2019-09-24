# lib-forms-api

## GrapqhQL and REST API for Forms

### Installation (Graphql API type definitions only)
    npm i -D @kartikrao/lib-forms-api

### Test
#### Integration
    `npm run test`

### Deploy
#### Development (default)
    `npm run deploy`
#### Production
    `npm run deploy:prod`

### Post Deployment Tasks
#### Logs
    * Enable cloudwatch access logs on API Gateway (not lambda logs set in serverless.yml)
    * Update limits on SSM Parameter Store

### Release
#### Patch
    `npm run release`
#### Minor
    `npm run release:minor`
#### Major
    `npm run release:major`
