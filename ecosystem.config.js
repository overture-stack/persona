const os = require('os');

module.exports = {
  apps: [
    {
      name: 'persona',
      script: 'npm',
      args: 'start',
      watch: true,
      ignore_watch: ['[\\/\\\\]\\./', 'node_modules', 'logs'],
      instances: process.env.INSTANCES || os.cpus().length,
      exec_mode: 'cluster',
      restart_delay: 1000,
      cron_restart: '5 3 * * 6',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      pid_file: './logs/child.pid',
      merge_logs: true,
    },
  ],
};
