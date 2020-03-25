const guardFactory = require('express-jwt-permissions');

const plugin = {
  version: '1.0.2',
  policies: ['jwt-permissions'],
  init: function (pluginContext) {
    pluginContext.registerPolicy({
      name: 'jwt-permissions',
      schema: {
        $id: 'http://express-gateway.io/schemas/policies/jwt-permissions.json',
        type: 'object',
        properties: {
          requestProperty: {
            type: 'string',
            description: 'Set where the module can find the user property (default req.user)'
          },
          permissionsProperty: {
            type: 'string',
            description: 'Set where the module can find the permissions property inside the requestProperty object (default permissions)'
          }
        }
      },
      policy: (params) => (req, res, next) => {
        const { requestProperty, permissionsProperty } = params;
        return guardFactory({
          requestProperty: requestProperty || 'user',
          permissionsProperty: permissionsProperty || 'permissions'
        }).check(req.egContext.apiEndpoint.permissions)(req, res, next);
      }
    })
  }
}

module.exports = plugin;