module.exports = {
  apps: [{
    name: 'study-landing',
    script: 'npx',
    args: 'serve -s dist -l 3043',
    cwd: './landing',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3043
    },
    error_file: '../logs/err.log',
    out_file: '../logs/out.log',
    log_file: '../logs/combined.log',
    time: true
  }]
};