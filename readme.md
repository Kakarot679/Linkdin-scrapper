# LinkedIn Profile Scraper

A Chrome extension to scrape public LinkedIn profile data and save it to a local Node.js backend.

**Tech Stack:** Node.js, Express, Sequelize, SQLite, and JavaScript.

## Setup & Usage

### Backend
1. `cd backend`
2. `npm install`
3. `npm start` (runs on `http://localhost:3001`)

### Chrome Extension
1. Open `chrome://extensions`.
2. Enable "Developer mode".
3. Click "Load unpacked" and select the `chrome-extension` folder.

Once set up, navigate to a LinkedIn profile to automatically scrape and save the data.

### API
- `POST /api/profiles`: Saves profile data.
- `GET /api/profiles`: Retrieves all saved profiles.
