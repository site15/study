#!/bin/bash

# PM2 Stop Script for Study Landing Page

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🛑 Stopping Study Landing Page...${NC}"

# Stop the application
pm2 stop study-landing

# Optional: Delete the application from PM2
# pm2 delete study-landing

echo -e "${GREEN}✅ Application stopped successfully!${NC}"
echo -e "${GREEN}Use 'pm2 status' to verify application is stopped${NC}"