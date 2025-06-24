# OutFlo

This is a full stack application that uses the OpenRouter API to generate personalized LinkedIn messages for recruiters.

Additionally, it includes a campaign management system that allows you to create, update, and delete campaigns.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

## Get Started

### Frontend

1. Install dependencies

```bash
cd frontend
npm install
```

2. Add env file

````bash
VITE_API_BASE_URL=http://localhost:3000
```

3. Start the client

```bash
npm run dev
````

````

### Backend

1. Install dependencies

```bash
npm install
````

2. Add env file

```bash
DATABASE_URL=postgres://...
NODE_ENV=development
PORT=3000
OPENROUTER_API_KEY=...
```

3. Push schema to the database

```bash
npm run db:push
```

4. Start the server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
