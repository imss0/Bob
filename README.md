# Bob

## Shift Planning Web App

### Overview

Bob is a tool designed to help managers scheduling employees' shifts over a period of 28 days. Bob allows users to customise the number of employees, shift types, and the number of required shifts for each day. Bob then generates a schedule that ensures coverage for all shifts, as well as eployees' wellbeing, by capping the maximum number of hours and ensuring each has a sufficient numbers of hours off work.

## Features

Bob has the following features:

- Employee Input: Users can input the names of employees who will be scheduled for shifts.

- Shift Input: Users can input the different types of shifts that need to be scheduled (e.g. morning shift, evening shift, overnight shift).

- Shift Requirements Input: Users can input the number of required shifts for each day, for each shift type.

- Schedule Generation: Once the user inputs all the necessary information, the app generates a schedule that ensures all required shifts are covered.

- Schedule Display: The generated schedule is displayed to the user in an easy-to-read calendare-like format.

### User Journey

The following is an example user flow for the Shift Planning Web App:

1. User opens the app and is presented with a form to input available employees, shift types, and required shifts for each day.

2. User inputs the necessary information and submits the form.

3. The app generates a rota based on the inputs provided and displays it to the user.

## Technologies Used

The Shift Planning Web App is built using the following technologies:

- Frontend: React, React Router
- Styling: CSS
- Backend: Express.js, Sequelize
- Database: Postgres
- Authentication: Clerk

## Getting Started 

1. Run `npm i` in root folder(Bob), /server and /client
2. postgreSQL, or cloud service (e.g. railway) which is compatible to postgreSQL is needed.
3. Create .env file in server folder, copy /server/env.sample and add your own database information.
4. For Client, you need to have a clerk(authentication) account and get api key for react app.
5. Create .env file in client folder, copy /client/env.sample and add your api key for authentication.
6. Run `npm start` in server folder
7. Run `npm start` in client folder
