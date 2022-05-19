
# FIGHT FOR THE CLIM

This project is a full-stack application allowing students to fight for tokens over a game of **Four-in-a-row** (Puissance 4). Combined to the two other following projects, it aims to allow students to "vote" for the air conditionner of the classroom :
- [HEDDIBU API]()
- [STRAWPOLL API]()

### TECH stack

- **FRONTEND:** Vue 3 | Vite | Typescript | Socket.IO
- **BACKEND:** NestJs | Typescript | Socket.IO 


### HOW TO INSTALL THE APPS:

1/ Client:
- Go to the `client` directory
- Run `pnpm i` *(Or npm install if you don't have PNPM)*
- Duplicate .env.dist to .env and fill the variable according to what's explained
- Run `npm run dev` to start the dev server

2/ Server*:
- Go to the `server` directory
- Run `pnpm i` *(Or npm install if you don't have PNPM)*
- Duplicate .env.dist to .env and fill the variable according to what's explained
- Run `npm run start:dev` to start the dev. server
> *: Be aware that you need to have a working mongodb cluster available to run the API. You can either run one locally, or open a free cluster on [Atlas](https://cloud.mongodb.com/)
