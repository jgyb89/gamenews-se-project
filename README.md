# GameNews

GameNews is a responsive, React-based single-page application that provides the latest gaming news and active giveaways. 

## Live Demo
Check out the live deployed version here: [GameNews on GitHub Pages](https://jgyb89.github.io/gamenews-se-project/)

## Technologies Used
* **React**: Frontend library for building the user interface.
* **Vite**: Next-generation frontend tooling and bundler.
* **React Router**: For client-side routing.
* **Vanilla CSS**: For custom BEM-compliant styling and responsive design.
* **GitHub Pages**: For hosting the deployed application.

## How to Download
To get started with the project locally, clone the repository and install the dependencies:
1. Clone the repo:
   ```bash
   git clone https://github.com/jgyb89/gamenews-se-project.git
   ```
2. Navigate into the project directory:
   ```bash
   cd gamenews-se-project
   ```
3. Install dependencies using npm:
   ```bash
   npm install
   ```

## How to Start (Development)
To run the application in development mode with Hot Module Replacement (HMR):
```bash
npm run dev
```
Then, open the provided local server link (typically `http://localhost:5173`) in your browser to view the app.

## How to Deploy
This project uses the `gh-pages` package to automate deployments to GitHub Pages. To deploy the latest changes:
1. Ensure your working directory is clean by committing your latest changes.
2. Run the deployment script:
   ```bash
   npm run deploy
   ```
This script will automatically build the production bundle into the `dist` folder and push it to the `gh-pages` branch, updating the live site.
