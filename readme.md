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

1. Navigate to the landing directory:
   ```bash
   cd landing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`
