const path = require('path');

module.exports = {
  client: {
    service: {
      name: 'movieql',
      localSchemaFile: path.join(__dirname, '..', 'backend/schema.graphql'),
    },
    excludes: [path.join(__dirname, 'src/**/generated/**/*')],
  },
};
