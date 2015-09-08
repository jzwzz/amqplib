Package.describe({
  name: 'jzwzz:amqplib',
  version: '0.0.2',
  summary: 'amqplib driver for node',
  git: 'https://github.com/jzwzz/amqplib',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.addFiles('amqplib.js', 'server');
  if (api.export) {
    api.export("amqpClient", "server");
  }
});

Npm.depends({
  "amqplib": "0.3.2"
});
