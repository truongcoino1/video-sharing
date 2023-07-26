# 1. Introduction
### Features
FE applicants should accomplish the first 3 features
- User registration and login
- Sharing YouTube videos
- Viewing a list of shared videos (no need to display up/down votes)
- Real-time notifications for new video shares: When a user shares a new video, other logged-in users should receive a real-time notification about the newly shared video. This notification can be displayed as a pop-up or a banner in the application, and it should contain the video title and the name of the user who shared it.

### Demo
> [Front-end](https://video-sharing-orpin.vercel.app/)
> [Back-end](https://video-sharing-backend-production.up.railway.app)

### Source code
> [Front-end](https://github.com/truongcoino1/video-sharing)
> [Back-end](https://github.com/truongcoino1/video-sharing-backend)

# 2. Prerequisites
- Modular architecture width NodeJS, ORM
- Implement the real-time notifications feature using socket.io
- Front-end using NextJS (framework using ReactJS) with tailwindCSS for UI styles component
- Cross platform: run it on Windows, Linux, MacOS
- Support Docker out of the box for easy deployment

### Backend
                    
Branch  | Express | Typeorm | Postgres
-------|------ | -------|------
master  | v4 | v0.2 | 

### Frontend
                    
Branch  | NextJS |ReactJS| TailwindCss 
-------|------ | -------|------
main  | v13.4.10 | v18.2.0 | v3.3.3

### Overview

[1. Introduction](https://github.com/truongcoino1/video-sharing#1-introduction)
- [Features](https://github.com/truongcoino1/video-sharing#features)
- [Demo](https://github.com/truongcoino1/video-sharing#demo)
- [Source code](https://github.com/truongcoino1/video-sharing#source-code)

[2. Prerequisites](https://github.com/truongcoino1/video-sharing#2-prerequisites)
- [Backend](https://github.com/truongcoino1/video-sharing#backend)
- [Frontend](https://github.com/truongcoino1/video-sharing#frontend)

[3. Installation & Configuration](https://github.com/truongcoino1/video-sharing#3-installation--configuration)
- [Backend Setup](https://github.com/truongcoino1/video-sharing#backend-setup)
- [Frontend Setup](https://github.com/truongcoino1/video-sharing#frontend-setup)

[4. Usage](https://github.com/truongcoino1/video-sharing#4-usage)
- [1. User Login or registration](https://github.com/truongcoino1/video-sharing#1-user-login-or-registration)
- [2. Share Youtube videos](https://github.com/truongcoino1/video-sharing#2-share-youtube-videos)
- [3. Viewing a list of shared videos](https://github.com/truongcoino1/video-sharing#3-viewing-a-list-of-shared-videos)
- [4. Real-time Notification for new video shared](https://github.com/truongcoino1/video-sharing#real-time-notification-for-new-video-shared)

[5. Troubleshooting](https://github.com/truongcoino1/video-sharing#5-troubleshooting)
- [1. Database Connection issue](https://github.com/truongcoino1/video-sharing#1-database-connection-issue)
- [2. Check & sets the required environments, variables](https://github.com/truongcoino1/video-sharing#2-check--sets-the-required-environments-variables)



# 3. Installation & Configuration
### Backend Setup
#### 1. Clone repository and install dependencies
- Clone repository from gitthub
```bash
git clone https://github.com/truongcoino1/video-sharing-backend
```
```bash
cd video-sharing-backend
```
#### 2. Setup and start application
Setup a development with Docker.
- copy .env, docker-compose.yml, dockerfile:
```bash
cp .env.example .env && cp docker-compose.dev docker-compose.yml && cp Dockerfile.dev Dockerfile
```
- build container:
```bash
docker-compose build
```

- install dependencies:
```bash
docker-compose run backend yarn install
```
#### 3. Running the Application
```bash
docker-compose up
```

Server is running at http://localhost:5001
#### 4. Start test
- Install dependencies
    ```bash
    npm run install
    ```
    or 
    ```bash
    yarn install
    ```
- Run tests
    ```bash
    yarn test
    ```
### Frontend Setup
#### 1. Clone repository and install dependencies
```bash
git clone https://github.com/truongcoino1/video-sharing
```
```bash
cd video-sharing
```
#### 2. Install dependencies
```bash
npm run install 
```
or 
```bash
yarn install
```
### 3. Start application
```bash
npm run dev
```
or

```bash
yarn dev
```
Run the app in the development mode
Open http://localhost:3000 to view in the browser.

### 4. Run test suite
```bash
npm run test
```
or
```bash
yarn test
```
### 5. Deploy Frontend to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# 4. Usage
### 1. User Login or registration
1. Go to the page (development: http://localhost:3000 and production: https://video-sharing-orpin.vercel.app/)
2. Enter email and password
3. Click on "Login/Register" button
### 2. Share Youtube videos
1. Once logged in. Click button "Share a movie"
2. Enter youtube link in Youtube URL input
3. Click on "Share" button
### 3. Viewing a list of shared videos
1. Go to the page (development: http://localhost:3000 and production: https://video-sharing-orpin.vercel.app/)
2. Video List and load more button appear

### 4. Real-time Notification for new video shared
1. When a user shares a new video, users will receive real-time notification
2. Video will update real-time in video list on home page
3. Notification will appear

# 5. Troubleshooting
### 1. Database Connection issue
1. Ensure that the database running 
2. Check the credential username and password to connect the database

### 2. Check & sets the required environments, variables
1. Frontend: NEXT_PUBLIC_GATEWAY_URL, NEXT_PUBLIC_WEBSOCKET
2. Backend: MYSQL_HOST, MYSQL_PORT,MYSQL_USERNAME,
MYSQL_PASSWORD
MYSQL_DATABASE,
DOMAIN_ORIGIN,
3. When port is already in use, you need to kill this port and restart app.
- Frontend: port 3000
- Backend: port 5001
- Database: port 5432 

