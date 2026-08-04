# GameNews

GameNews is a responsive, full-stack single-page application that provides the latest gaming news and active giveaways. Users can create accounts, log in securely, and save their favorite content.

## Live Demo
Check out the live deployed version here: [GameNews](https://gamenews.twilightparadox.com)

## Technologies Used
* **Frontend**: React, Vite, React Router, Vanilla CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Infrastructure**: Google Cloud Compute Engine (VM)
* **Web Server**: Nginx (Reverse Proxy)
* **Process Manager**: PM2
* **Security**: SSL via Let's Encrypt / Certbot

## How to Run Locally (Development)

To get started with the project locally, we will need to run both the backend API and the frontend client.

### 1. Backend Setup
1. Clone the backend repository (ensure we have the `gamenews-se-project-express` code).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local MongoDB service (ensure MongoDB is installed on your machine).
4. Run the backend development server:
   ```bash
   npm run dev
   ```
*(The API will typically run on http://localhost:3001)*

### 2. Frontend Setup
1. Clone this frontend repository:
   ```bash
   git clone https://github.com/jgyb89/gamenews-se-project.git
   ```
2. Navigate into the project directory:
   ```bash
   cd gamenews-se-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser. *(Note: The frontend is configured via Vite environments to automatically detect if it is running locally and will route API requests to your local backend on port 3001).*

## Production Deployment Architecture
* This application is hosted on a Google Cloud Virtual Machine.
* The Express Backend is kept alive 24/7 using PM2 and listens for internal traffic.
* The React Frontend is built statically using Vite (`npm run build`).
* Nginx acts as the web server, serving the static frontend files and acting as a reverse proxy to route secure API requests to the Express backend.
* Certbot provides secure HTTPS encryption for all traffic.
