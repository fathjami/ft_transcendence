<h1 align="center" style="font-size: 150px">PongTime</h1>

<p align="center">
<img src="./assets/pong-time.png" alt="How a server works" width="1000"/>
</p>

<p align="center">
	<b><i>Project developed at <a href="https://www.1337.ma/">1337 Khouribga </a> coding school.</i></b><br>
    <b><i>Authors: <a href="https://github.com/fathjami">@fathjami</a> & <a href="https://twitter.com/ashrafelkhnissi">@achrafelkhnissi</a> & <a href="https://github.com/zsarir23">@zsarir</a></i></b>
<!--
 <b><i>Grade: 125/100</i></b>
-->
</p>

<p align="center">
	<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/achrafelkhnissi/ft_transcendence?color=blueviolet" />
	<img alt="Number of lines of code" src="https://img.shields.io/tokei/lines/github/achrafelkhnissi/ft_transcendence?color=blueviolet" />
	<img alt="Code language count" src="https://img.shields.io/github/languages/count/achrafelkhnissi/ft_transcendence?color=blue" />
	<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/achrafelkhnissi/ft_transcendence?color=blue" />
	<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/achrafelkhnissi/ft_transcendence?color=brightgreen" />
</p>

---
<h2> Demo </h2>

[Click here to see our project Demo](https://drive.google.com/file/d/1AbcpofX8ZU-jlrj5cwGc1SHHt6Tpochw/view?usp=sharing)

---
## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Authors](#authors)
- [Technologies](#technologies)
- [Features](#features)
- [Usage](#usage)
- [Screenshots](#screenshots)

## Introduction

PongTime is a simple web application platform that allow users to play classic ping-pong with other users in real-time.

## Authors

- [Fathiya Olatokunbo Jamia](https://github.com/fathjami) - Frontend & UX/UI Design
- [Achraf El Khnissi](https://twitter.com/ashrafelkhnissi) - Backend & DevOps
- [Zaineb Sarir](https://github.com/zsarir23) - Game (Frontend & Backend)

## Technologies

- Frontend: Next.js, Typescript, Tailwind CSS, Socket.io
- Backend:
  - API: Nest.js
  - Real-time communication: Socket.io
  - Database: PostgreSQL
  - ORM: Prisma
  - Authentication: Passport.js
  - 2FA: Twilio
  - Infrastructure: Docker, Docker Compose
- Game: Phaser.js, Matter.js, Next.js, Nestjs

## Features

- [x] Real-time multiplayer game
- [x] User authentication
- [x] Friendship system
- [x] Notification system
- [x] Achievements
- [x] Search system
- [x] Two Factor Authentication (2FA)
- [x] Leaderboard
- [x] Private chat
- [x] Chat rooms (public, private, protected with a password)
- [x] User profile (avatar, stats, achievements, friends, etc.)

## Usage

1. Clone the repository

```sh
git clone git@github.com:achrafelkhnissi/ft_transcendence.git
```

2. In the `.env.example` file at the root of the project, fill in the environment variables and rename the file to `.env` \

   Notes:

- Put your hostname or IP address in the `DOMAIN_NAME` variable
- In case of production build, set `NODE_ENV` to `production` and comment `backend` and `frontend` bind mounts volumes in `docker-compose.yml` file because those volumes are only needed for development because of hot-reloading.

3. Run the following command to start the project

```sh
make
```

4. Open your browser and go to `http://${DOMAIN_NAME}:${NEXT_PORT}` to access the application and `http://${DOMAIN_NAME}:${NEXT_PORT}/api` to access the API

- Change `${DOMAIN_NAME}` and `${NEST_PORT}` with your environment variables set in the `.env` file

---

## Screenshots

- Login Page
<p align="center">
<img src="./assets/login.png" alt="How a server works" width="1000"/>
</p>

- Dashboard
<p align="center">
<img src="./assets/dashboard.png" alt="How a server works" width="1000"/>
</p>

<p align="center">
<img src="./assets/channels.png" alt="How a server works" width="1000"/>
</p>

- Profile
<p align="center">
<img src="./assets/profile.png" alt="How a server works" width="1000"/>
</p>

- Messages
<p align="center">
<img src="./assets/messages.png" alt="How a server works" width="1000"/>
</p>

- Channels
<p align="center">
<img src="./assets/channelInfo.png" alt="How a server works" width="1000"/>
</p>

<p align="center">
<img src="./assets/lockChannel.png" alt="How a server works" width="1000"/>
</p>

- Game Invite
<p align="center">
<img src="./assets/game-invite.png" alt="How a server works" width="1000"/>
</p>

- Game
<p align="center">
<img src="./assets/costumize.png" alt="How a server works" width="1000"/>
</p>

<p align="center">
<img src="./assets/match.png" alt="How a server works" width="1000"/>
</p>

- Game win
<p align="center">
<img src="./assets/match-win.png" alt="How a server works" width="1000"/>
</p>

- Settings
<p align="center">
<img src="./assets/settings.png" alt="How a server works" width="1000"/>
</p>
