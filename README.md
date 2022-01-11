# IOT PRIME

This is my undergraduate final year project where I was tasked to create an online platform that could acquire and monitor heterogeneous data from IoT sensors or devices. It consists of an express.js server (source code in src/server) that is connected to a mongodb database which handles receiving API post requests from IoT devices, storing the data within the database, and through websockets, communicates with the frontend portal so that users can see changes within their IoT data. Users are able to register, login, create multiple "projects" which will be responsible for each IoT device a user has. Users can also download IoT data for a specific project as a csv.


## ENVIRONMENTAL VARIABLES
The project uses the dotenv library in order to get environmental variables, so a .env file should be created with the following variables:

### NODE_PORT
What port do you want the server to run on (It should be different from the port React.js uses to run it's development server).

### NODE_ENV
This could be "development" or "production" depending on what environment your running it on.

### DB_URL_DEVELOPMENT
This is the mongodb development server.

### DB_URL_PRODUCTION
This is the mongodb production server. It could be the same value as the `DB_URL_DEVELOPMENT` but it is required during production.

### LOGIN_TOKEN_SECRET
This is the secret key that will be used by the `jsonwebtoken` library in order to sign and verify tokens.


## HOW TO GET STARTED
1. Clone this repository.
2. Open a terminal.
3. Go to the directory that this project was cloned to with the terminal.
4. Type “npm install” in order to download dependencies that are required by this project.
5. Type "npm run fixadminbro" to fix some dependency issues that occur between this project's react module and the adminbro's react module.

### For development
7. Type "npm run devserver" to launch a development backend server in the background.
8. Type "npm start" to launch development frontend server.

### For production
9. Type "npm build" to build react.js code.
10. Type "npm run prodserver" to launch a production server that uses the build folder from react.js (to see the admin page just type "/admin" after the domain).

## What I learnt 
1. How to use material-ui to create the frontend portal
2. How to use socket.io to tell the frontend to update itself when data is sent to the server by an IoT device.
3. How to design a database with mongodb to handle storing all the complex data.
4. How to use jwt for authentication.
5. How to use adminbros to set up an easy to use admin panel.

