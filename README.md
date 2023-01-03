# Bug-Tracking-System
Full Stack Software Bug Tracking System using MongoDB, Express, React and NodeJS

![Bug Tracker Cover](https://www.softwaresuggest.com/blog/wp-content/uploads/2019/08/s-blog-3-01.jpg)

### Brief Summary
This Bug Tracking System is a full-stack software issue management web application that allows developers to create tickets for their projects and admins to manage the progress of each project using NodeJS & Express in the back end, MongoDB as the database and React in the front end

### Links:
- [Live Preview](https://ken-yokohama.github.io/Bug-Tracking-System)

![Bug Tracker Sample](https://github.com/Ken-Yokohama/Bug-Tracking-System/blob/master/cover.JPG?raw=true)

### Features:
- User Authentication and Password Encryption using Bcrypt
- Role Based Authorization using JSON Web Tokens for Private Routes
- Admin Management Controls
- Global State Management using Redux
- REST API using NodeJS & Express
- Database Models using MongoDB & Mongoose
- Fully Responsive Grid and Flexbox Layout


### Technologies & Templates Used
| Technologies | Usage                                      |
| ----------------- | ------------------------------------------------ |
| React Router Dom | Navigation & Routing |
| Material UI | CSS Components, Styles & Icons|
| NodeJS & Express| REST API|
| MongoDb| Database|
| Mongoose| ODM|
| Bcrypt| Password Encryption and Verification|
| Json Web Tokens| Route Authorization|
| Axios| HTTP Requests|
| Material UI| CSS UI Library|
| Redux| State Management|
| Typescript | Compiler and Error Detection |
| Npm GH-Pages | Web Hosting |


### How to run client locally
  1. After cloning the repository... Navigate to the Client directory and Install the dependencies in the package.json using `npm i`
  2. Add the environment variables found in [here](https://github.com/Ken-Yokohama/environment-variables) to your .env.development.local file at the root of the Client directory
  3. Start the app using the script `npm start`
  4. Note: Root of page is http://localhost:3000/Bug-Tracking-System
  
### How to run server locally
  1. After cloning the repository... Navigate to the Client directory and Install the dependencies in the package.json using `npm i`
  2. Add the environment variables found in [here](https://github.com/Ken-Yokohama/environment-variables) to your .env file at the root of the Client directory
  3. Start the server using the script `npm run server`

### Deploying the Client & Server
  - Deploy the client by navigating to the client directory and use the script `npm run deploy`
  - Server is automatically re-deployed when pushing a change on the Server directory
