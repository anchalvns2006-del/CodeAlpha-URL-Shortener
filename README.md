# CodeAlpha URL Shortener

A simple URL Shortener REST API built using Node.js, Express.js, and MongoDB.

## Features

- Create short URLs from long URLs.
- Store URLs in MongoDB using Mongoose.
- Redirect short URLs to their original destinations.
- Track the number of clicks on each short URL.
- Retrieve URL statistics.
- Validate URL input and handle errors.
- Generate unique short codes.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JavaScript
- Git and GitHub

## Project Structure

```text
CodeAlpha_URL_Shortener/
├── models/
│   └── Url.js
├── routes/
│   └── urlRoutes.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd CodeAlpha_URL_Shortener
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

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

### 4. Start the development server

```bash
npm run dev
```

The API will run at:

`http://localhost:5000`

## API Endpoints

### 1. Check API status

**GET** `/`

Returns the API status.

### 2. Check database connection

**GET** `/health`

Returns the current MongoDB connection status.

### 3. Create a short URL

**POST** `/shorten`

Request body:

```json
{
  "originalUrl": "https://www.google.com"
}
```

Returns the original URL, generated short code, short URL, click count, and creation timestamp.

### 4. Redirect to the original URL

**GET** `/:shortCode`

Example:

`http://localhost:5000/1391ec1e`

Redirects the browser to the original URL and increments the click count.

### 5. Get URL statistics

**GET** `/stats/:shortCode`

Example:

`http://localhost:5000/stats/1391ec1e`

Returns the original URL, short code, short URL, click count, and timestamps.

## Testing with cURL

Create a short URL:

```bash
curl.exe -X POST http://localhost:5000/shorten -H "Content-Type: application/json" -d "{\"originalUrl\":\"https://www.google.com\"}"
```

Get URL statistics:

```bash
curl.exe http://localhost:5000/stats/1391ec1e
```

Test an invalid URL:

```bash
curl.exe -X POST http://localhost:5000/shorten -H "Content-Type: application/json" -d "{\"originalUrl\":\"not-a-valid-url\"}"
```

Test a missing short code:

```bash
curl.exe -i http://localhost:5000/unknown123
```

Note: `1391ec1e` is an example short code from local testing. Your generated codes may differ.

## Security

- Keep `.env` private.
- Never commit database credentials or passwords to GitHub.
- Configure MongoDB Atlas network access securely.
- Use HTTPS and an appropriate production base URL when deploying.

## Future Improvements

- Custom short codes.
- URL expiration.
- User authentication.
- Rate limiting.
- Production deployment.
- Improved analytics.

## Author

Developed as a backend development internship project for CodeAlpha."# CodeAlpha-URL-Shortener" 
