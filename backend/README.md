# MultiMart Backend API

Backend API for the MultiMart multi-vendor e-commerce platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
   - Set your MongoDB connection string
   - Generate a secure JWT secret
   - Configure other environment variables

4. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests with coverage
- `npm run test:watch` - Run tests in watch mode

## API Endpoints

### Health Check
- `GET /health` - Check API status

### API Info
- `GET /api` - Get API information

More endpoints will be added as features are implemented.
