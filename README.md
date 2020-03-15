# express-gateway-plugin-jwt-permissions
A plugin for Express Gateway that checks JWT tokens for permissions using the [express-jwt-permissions](https://github.com/MichielDeMey/express-jwt-permissions) middleware.
## Installation
Simply type from your shell environment:

`eg plugin install express-gateway-jwt-permissions`

## Quick start

1. Make sure the plugin is listed in [system.config.yml](https://www.express-gateway.io/docs/configuration/system.config.yml/) file. This is done automatically for you if you used the command above.
2. Add the configuration keys to [gateway.config.yml](https://www.express-gateway.io/docs/configuration/gateway.config.yml/) file.

```
apiEndpoints:
  articles:
    paths: '/v1/articles/*'
    permissions: 
      - 'read:article'
      - 'write:article'
...
pipelines:
  apiEndpoints:
      - articles
    policies:
      - jwt: # secure API with key auth
        - action:
      - jwt-permissions:
```

## Action Parameters

`action.requestProperty`: Set where the module can find the user property (default `req.user`)
`action.permissionsProperty`: Set where the module can find the permissions property inside the `requestProperty` object (default `permissions`)

### Example

Consider you've set your permissions as `scope` on `req.identity`, your JWT structure looks like:

`"scope": "user:read user:write"`

You can add the configuration keys:

```
policies:
  - jwt: # secure API with key auth
    - action:
  - jwt-permissions:
    - action:
        requestProperty: 'identity'
        permissionsProperty: 'scope'
```
