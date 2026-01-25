# Ссылки
https://habr.com/ru/articles/818473/ - Подготовка к техническому собеседованию Senior/Team Lead backend
https://habr.com/ru/articles/114154/ - B-tree

# Postgres

## Общее описание индексов можно прочитать по ссылке
11.2.1. B-дерево
11.2.2. Хеш
11.2.3. GiST
11.2.4. SP-GiST
11.2.5. GIN
11.2.6. BRIN

## CI/CD Pipeline

This repository includes automated GitHub Actions workflows:

- **Deployment**: Automatically deploys to GitHub Pages on pushes to `main` branch
- **CI Checks**: Runs tests and linting on pull requests
- **Dependency Updates**: Weekly Dependabot checks for security updates

See `.github/README.md` for detailed workflow documentation.

## Quick Start

### Development Mode

1. Install dependencies (this will also install landing dependencies):
   ```bash
   npm install
   ```

2. Navigate to the landing directory:
   ```bash
   cd landing
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

Alternatively, you can run the development server from the root:

```bash
npm start
```

### Production Mode (PM2)

1. Install PM2 globally (if not already installed):
   ```bash
   npm install -g pm2
   ```

2. Build and start with PM2:
   ```bash
   npm run pm2:start
   ```

The application will be available at `http://localhost:3043`

### PM2 Management Commands

```bash
# Check application status
npm run pm2:status

# View application logs
npm run pm2:logs

# Restart application (includes rebuild)
npm run pm2:restart

# Stop application
npm run pm2:stop
```

See `PM2-README.md` for detailed PM2 deployment instructions.
