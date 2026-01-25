# PM2 Deployment Guide

This guide explains how to run the Study Landing Page using PM2 for production deployment.

## Prerequisites

Make sure you have PM2 installed globally:
```bash
npm install -g pm2
```

Or install it locally in the project:
```bash
npm install pm2 --save-dev
```

## Available Commands

### Using npm scripts (recommended):

```bash
# Start the application with PM2
npm run pm2:start

# Stop the application
npm run pm2:stop

# Restart the application (includes rebuild)
npm run pm2:restart

# Check application status
npm run pm2:status

# View application logs
npm run pm2:logs
```

### Using direct PM2 commands:

```bash
# Start the application
pm2 start ecosystem.config.js

# Stop the application
pm2 stop study-landing

# Restart the application
pm2 restart study-landing

# Check status
pm2 status

# View logs
pm2 logs study-landing

# Monitor in real-time
pm2 monit
```

## Configuration

The `ecosystem.config.js` file configures PM2 with the following settings:

- **Application Name**: `study-landing`
- **Port**: 3043
- **Working Directory**: `./landing`
- **Static Server**: Uses `serve` package to serve built files
- **Auto-restart**: Enabled with 1GB memory limit
- **Logging**: Logs are stored in `../logs/` directory

## First Time Setup

1. **Install dependencies**:
   ```bash
   cd landing
   npm install
   cd ..
   ```

2. **Build the application**:
   ```bash
   # For PM2/local deployment (empty base path)
   npm run build
   
   # For GitHub Pages deployment (base path: /study/)
   npm run build:github
   ```

3. **Start with PM2**:
   ```bash
   npm run pm2:start
   ```

## Auto-start on System Boot

To make PM2 start automatically when the system boots:

```bash
# Generate startup script
pm2 startup

# Save current PM2 configuration
pm2 save
```

Follow the instructions provided by `pm2 startup` to complete the setup.

## Monitoring

PM2 provides excellent monitoring capabilities:

```bash
# Real-time monitoring dashboard
pm2 monit

# Check detailed status
pm2 list

# Show application information
pm2 show study-landing
```

## Log Management

Logs are automatically managed by PM2:

- **Error logs**: `logs/err.log`
- **Output logs**: `logs/out.log`
- **Combined logs**: `logs/combined.log`

Rotate logs automatically:
```bash
pm2 install pm2-logrotate
```

## Environment Variables

The application uses these environment variables:
- `NODE_ENV=production`
- `PORT=3043`

You can modify these in the `ecosystem.config.js` file.

## Troubleshooting

### Common Issues:

1. **Port already in use**:
   ```bash
   # Kill process using port 3043
   lsof -ti:3043 | xargs kill -9
   ```

2. **Permission issues**:
   ```bash
   # Make scripts executable
   chmod +x *.sh
   ```

3. **Build errors**:
   ```bash
   # Clean and rebuild
   cd landing
   rm -rf dist node_modules
   npm install
   npm run build
   ```

## Production Checklist

- [ ] Install PM2 globally
- [ ] Build the application (`npm run build`)
- [ ] Start with PM2 (`npm run pm2:start`)
- [ ] Verify application is running (`npm run pm2:status`)
- [ ] Test the application (`curl http://localhost:3043`)
- [ ] Set up auto-start on boot (`pm2 startup`)
- [ ] Configure firewall if needed
- [ ] Set up reverse proxy (nginx/apache) if required

The application will be available at `http://localhost:3043` after successful deployment.