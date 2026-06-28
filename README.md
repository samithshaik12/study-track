# StudyTrack - Student Assignment Tracker

StudyTrack is a full-stack assignment tracker built with React, Vite, Node.js, Express, and MongoDB.

## Features

- Add, edit, delete, and view assignments
- Track status, priority, and due dates
- Search and filter assignments
- Responsive dashboard UI

## Folder Structure

```text
study-track/
│
├── client/
│   ├── package.json
│   └── src/
│
├── server/
│   ├── package.json
│   ├── server.js
│   ├── models/
│   ├── routes/
│   └── controllers/
│
└── README.md
```

The repo also includes a few support files for local development and deployment, such as `render.yaml`, `.env.example` files, and the Vite config in `client/`.

### Excluded from the simplified view

- ❌ `client/`
- ❌ `server/`
- ❌ `src/`
- ❌ `server.js`
- ❌ `models/`
- ❌ `routes/`

## Development

1. Copy `server/.env.example` to `server/.env` and set `MONGO_URI`.
2. Install dependencies from the root with `npm install`.
3. Run both apps with `npm run dev`.

## Deployment

### Render backend

1. Create a new Web Service from this repo.
2. Use `render.yaml` or point the service root to `server`.
3. Set `MONGO_URI` from your Atlas connection string.
4. Set `FRONTEND_URL` to your Vercel app URL.
5. Deploy with `npm start`.

### Vercel frontend

1. Create a new Vercel project from the `client` folder.
2. Copy `client/.env.example` to `client/.env.local`.
3. Set `VITE_API_URL` to your Render API URL.
4. Build and deploy with Vercel's default Vite settings.

## Backend API

- `GET /api/assignments`
- `POST /api/assignments`
- `PUT /api/assignments/:id`
- `DELETE /api/assignments/:id`
