const os = require('os');

module.exports = {
  apps: [
    {
      name: 'persona',
      script: 'npm',
      args: 'start',
      watch: true,
      ignore_watch: ['[\\/\\\\]\\./', 'node_modules'],
      instances: process.env.INSTANCES || os.cpus().length,
      exec_mode: 'cluster',
      restart_delay: 1000,
      cron_restart: '5 3 * * 6',
      merge_logs: true,
    },
  ],
};
