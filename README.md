# CodeAlpha URL Shortener

A REST API for shortening long URLs, redirecting users to original destinations, and tracking link clicks. Built using Node.js, Express.js, MongoDB, and Mongoose.

## Live Demo

- **Live API:** https://codealpha-url-shortener-3.onrender.com
- **GitHub Repository:** https://github.com/anchalvns2006-del/CodeAlpha-URL-Shortener

## Features

- Create short URLs from long URLs.
- Store URL data in MongoDB Atlas.
- Redirect short links to their original destinations.
- Track the number of clicks.
- Retrieve URL statistics.
- Validate URL input.
- Generate unique short codes.
- Handle invalid URLs and missing short codes.
- Deploy the API using Render.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JavaScript
- Git and GitHub
- Render

## Project Structure

```text
CodeAlpha-URL-Shortener/
├── models/
│   └── Url.js
├── routes/
│   └── urlRoutes.js
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

The `.env` file is created locally and is not committed to GitHub.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/anchalvns2006-del/CodeAlpha-URL-Shortener.git
cd CodeAlpha-URL-Shortener
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
```

Replace the placeholder with your MongoDB Atlas connection string. Never publish your database credentials.

### 4. Run the development server

```bash
npm run dev
```

The local API runs at:

`http://localhost:5000`

## API Endpoints

Use the live base URL below for deployed API requests:

`https://codealpha-url-shortener-3.onrender.com`

### 1. Check API status

**GET** `/`

Returns the API status message.

### 2. Check database health

**GET** `/health`

Returns the API and database connection status.

### 3. Create a short URL

**POST** `/shorten`

Request body:

```json
{
  "originalUrl": "https://www.google.com"
}
```

Example cURL command:

```bash
curl.exe -X POST https://codealpha-url-shortener-3.onrender.com/shorten -H "Content-Type: application/json" -d "{\"originalUrl\":\"https://www.google.com\"}"
```

The response includes the original URL, generated short code, short URL, click count, and creation timestamp.

### 4. Redirect to the original URL

**GET** `/:shortCode`

Example:

`https://codealpha-url-shortener-3.onrender.com/YOUR_SHORT_CODE`

Redirects to the original URL and increments the click count.

### 5. Get URL statistics

**GET** `/stats/:shortCode`

Example:

`https://codealpha-url-shortener-3.onrender.com/stats/YOUR_SHORT_CODE`

Returns the original URL, short code, click count, and timestamps.

## Error Handling

The API handles:

- Missing original URL.
- Invalid URL formats.
- Unsupported URL protocols.
- Short codes that do not exist.
- Database or server errors.

## Deployment

The API is deployed on Render and uses MongoDB Atlas for persistent storage.

- **Build command:** `npm install`
- **Start command:** `npm start`
- **Environment variable:** `MONGODB_URI`

The `.env` file and database credentials must remain private.

## Security

- Keep environment variables and database credentials secret.
- Do not commit `.env` to GitHub.
- Use a strong MongoDB database password.
- Restrict MongoDB Atlas network access where possible.
- Use HTTPS for deployed URLs.

## Future Improvements

- Custom short codes.
- URL expiration.
- User authentication.
- Rate limiting.
- Enhanced analytics.
- Automated API tests.

## Author

Developed as a backend development internship project for CodeAlpha.
