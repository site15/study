# GitHub Repository Configuration

This directory contains all the GitHub-specific configuration files for automated workflows and repository management.

## Workflows

### deploy.yml
- **Purpose**: Automatic deployment to GitHub Pages
- **Trigger**: Push to `main` branch or manual trigger
- **Process**: 
  1. Checks out code
  2. Sets up Node.js environment
  3. Installs dependencies
  4. Builds the React application
  5. Deploys to GitHub Pages

### ci.yml
- **Purpose**: Continuous Integration checks for pull requests
- **Trigger**: Pull requests to `main` branch
- **Process**:
  1. Runs ESLint for code quality checks
  2. Tests the build process
  3. Ensures code meets quality standards before merging

## Configuration Files

### dependabot.yml
- **Purpose**: Automated dependency updates
- **Schedule**: Weekly checks for outdated npm packages
- **Features**: 
  - Creates PRs for security updates
  - Labels and assigns reviewers automatically

### ISSUE_TEMPLATE/
- **Bug Report**: Template for reporting bugs with detailed reproduction steps
- **Feature Request**: Template for suggesting new features or improvements

### PULL_REQUEST_TEMPLATE.md
- Standard template for all pull requests
- Includes checklist for code quality and testing
- Helps maintain consistent contribution standards

### CODEOWNERS
- Defines code ownership and review responsibilities
- Automatically assigns reviewers based on file changes
- Ensures proper code review coverage

## Setup Instructions

1. **Update Configuration Files**:
   - Replace `EndyKaufman` in all files with your actual GitHub username
   - Update reviewer lists in dependabot.yml

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as the source

3. **Configure Repository Settings**:
   - Enable "Automatically delete head branches" 
   - Set up branch protection rules for `main` branch

## Usage

### Manual Deployment
```bash
# Trigger deployment manually from GitHub Actions tab
# Or push to main branch
git push origin main
```

### Local Testing
```bash
# Test the build process locally
cd landing
npm run build
```

The workflows will automatically handle:
- Code quality checks
- Automated testing
- Production deployments
- Dependency updates