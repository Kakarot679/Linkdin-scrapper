# LinkedIn Profile Scraper

A Chrome extension to scrape LinkedIn profiles and save the data to a local backend.

## Setup

1.  **Start the Backend:**
    ```bash
    cd backend
    npm install
    npm start
    ```
    The server will run on `http://localhost:3001`.

2.  **Load the Extension:**
    - Open Chrome and go to `chrome://extensions/`.
    - Enable **Developer mode**.
    - Click **"Load unpacked"** and select the `chrome-extension` folder.

## Usage

1.  Click the extension icon in your Chrome toolbar.
2.  Paste LinkedIn profile URLs into the text area (one per line).
3.  Click **"Start Scraping"**. The extension will open each profile, scrape the data, and send it to the backend.
