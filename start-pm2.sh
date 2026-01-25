#!/bin/bash

# PM2 Startup Script for Study Landing Page

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Study Landing Page with PM2${NC}"

# Create logs directory if it doesn't exist
mkdir -p logs

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}PM2 not found. Installing PM2 globally...${NC}"
    npm install -g pm2
fi

# Build the application first
echo -e "${YELLOW}Building the application...${NC}"
cd landing
npm run build
cd ..

# Start the application with PM2
echo -e "${YELLOW}Starting application with PM2...${NC}"
pm2 start ecosystem.config.js

# Save PM2 configuration
# pm2 save

# Setup PM2 to start on system boot
# echo -e "${YELLOW}Setting up PM2 to start on system boot...${NC}"
# pm2 startup

echo -e "${GREEN}✅ Application started successfully!${NC}"
echo -e "${GREEN}Application is running on http://localhost:3043${NC}"
echo -e "${GREEN}Use 'pm2 status' to check application status${NC}"
echo -e "${GREEN}Use 'pm2 logs study-landing' to view logs${NC}"