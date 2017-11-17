module.exports = {
  apps: [
    {
      name: 'persona',
      script: 'npm',
      args: 'start',
      watch: true,
      ignore_watch: ['[\\/\\\\]\\./', 'node_modules'],
      instances: 1,
      exec_mode: 'cluster',
      restart_delay: 1000,
      cron_restart: '5 3 * * 6',
      merge_logs: true,
    },
  ],
};
