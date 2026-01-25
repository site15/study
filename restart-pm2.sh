#!/bin/bash

# PM2 Restart Script for Study Landing Page

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔄 Restarting Study Landing Page...${NC}"

# Rebuild the application
echo -e "${YELLOW}Rebuilding the application...${NC}"
cd landing
npm run build
cd ..

# Restart the application
pm2 restart study-landing

echo -e "${GREEN}✅ Application restarted successfully!${NC}"
echo -e "${GREEN}Application is running on http://localhost:3043${NC}"
echo -e "${GREEN}Use 'pm2 logs study-landing' to view logs${NC}"