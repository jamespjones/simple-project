# Simple Project

A serverless Node.js/TypeScript project using AWS Lambda and API Gateway.

## Project Structure

```
.
├── api/          # API definitions and OpenAPI specs
├── src/          # Source code
└── serverless.yml  # Serverless framework configuration
```

## Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI (`npm install -g serverless`)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run locally:
   ```bash
   # Start MongoDB
   npm run offline:mongodb:start

   # Initialize the database
   npm run offline:db:init

   # Start the server
   npm run offline:server:start
   ```

3. Deploy to AWS:
   ```bash
   npm run deploy
   ```

## Development

- The project uses TypeScript for type safety
- Source code is in the `src/` directory
- API definitions are in the `api/` directory
- Configuration is managed through `serverless.yml`

## Available Scripts

- `npm run build`: Compile TypeScript to JavaScript
- `npm run offline:mongodb:start`: Start the MongoDB server locally
- `npm run offline:db:init`: Initialize the database with required data
- `npm run offline:server:start`: Start the local development server
- `npm run deploy`: Deploy to AWS
- `npm run test`: Run tests (if configured)

