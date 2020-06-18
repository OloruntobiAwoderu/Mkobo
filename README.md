# Mkobo

## Answers
1. Javascript is my Favourite programming Language because of Familiarity. and it's also the most flexible language I've ever used. 
It's dynamic, feels fast and adapts to how my mind thinks.It gives me all the tools I need, thanks to its huge ecosystem.

2. The software development lifecycle was good, we made PVD(Product Vision Documents) to help us sketch out the number of sprints we would need to finish each feature. We also had User stories to break down tasks into small units and assign and manage them using Trello. I enjoyed the collaboration ad how we helped each other out whenever anyone got stuck. I particularly didn't like the long meetings we always had but I could see why they were useful. I would have loved to find a way to shorten the length of Team Meetings,

3. I worked on a web application called ArtFunder which is an e-commerce platform where underfunded Art schools can display art from their students and then those art can be purchased by the public and then the money goes back to help fund those Art departments. I was responsible for coding most of the Backend(Authentoication, Authorization, Password Reset, Database Modelling, Oauth, GeoJSON queries, Testing, Backend structure, routes etc)

4. Yes, when there is multiple inheritance. Probably all types are prone to abuse and misuse. Inheritance with ambiguity, abstraction where we are over generalizing, encapsulation hiding too much info, and polymorphism overriding too much. This may be prevented by following established best pratices and designing and coding in such a way that is simple for anyone to understand and follow. Simplicity is key.

5. A rate limiter is a tool that monitors the number of requests per a window time a service agrees to allow. If the request count exceeds the number agreed by the service owner and the user (in a decided window time), the rate limiter blocks all the excess calls(say by throwing exceptions). The user can be a human or any other service(ex: in a micro service based architecture).
Throttling is a common way to practically implement rate-limiting. It lets API developers control how their API is used by setting up a temporary state, allowing the API to assess each request. When the throttle is triggered, a user may either be disconnected or simply have their bandwidth reduced.
Possible at the application, API, or user level
We can implement this by passing all our API requests through our API rate Limiter.

So for every request we can verify how many requests this user has sent in last one second, minute or hour based on user plan.
We should use some kind of storage mechanism to count the number of requests/duration
In our storage system, the timestamps are the boundaries of our request It means let's say a user is in free plan that means from the problem statement we should allow only 50 reqs/sec. So start and end time will be differ by 1000 milli secs.
We'll have our logic like when API rate limiter receives a request if checks in the database for a record which is least recent in start time having empty end time for the current user. If it found then validates the number of requests and proceeds further if limit is not reached else throws exception.

## Mkobo Backend
A simple REST API, that enables registered users to send and recieve transfers and also query and get their transaction history

## Features
- User can Sign up
- User can Login
- User can Reset Password
- User can make transfers
- User can get Successful and Failed Transactions

## Getting Started

### Prerequisites

You must have

1. [Node.js](https://nodejs.org/) (_v8.12.0 or higher_) and npm (_6.4.1 or higher_) installed on your local machine. Run `node -v` and `npm -v` in your terminal to confirm that you have them installed

2. GIT bash

### Installing

To get started, clone this repository on your local machine using the following steps:

Open your terminal and navigate to the folder you want the project to be and enter the the following commands:

```
$ git clone -b develop https://github.com/OloruntobiAwoderu/Mkobo.git
$ cd mkobo
$ npm install
```

Create a `.env` file and add the environment variables described in the .env.sample file. Below are the relevant environment variables worth adding:

- `JWT_Secret` - JWT secret for signing access token.
- `TEST_DB` - Connection string for monogodb database (test environment).
- `MONGOLAB_URI` - Connection string for monogodb database (development environment).
- `SENDGRID_API_KEY` - Sendgrid API key for sending reset password email notification.
- `SENDERS_EMAIL` - Email that has gone through the single sender verification and will show as the sender's email

You'll need to register on the [sendgrid](https://sendgrid.com/) platform to get an API key.  You'll also need to go to settings and fufil the single sender verification requirement with the senders email.

## Starting the dev server

```bash
npm run start:dev
```

## Running the tests locally

```bash
npm test
```

## Test the endpoints

The application can be tested locally through localhost on port 4000 ousing postman or insomnia


### API Endpoints


Method        | Endpoint      | Enable a user to: |
------------- | ------------- | ---------------
POST  | users/register | Create a user account  |
POST  | users/login  | Login a user |
POST | users/resetpassword | Get resetpassword email(You may have to check your spam)|
PATCH | users/newpassword  | Set new password for user |
POST | auth/transfers| Make a transfer to another user |
GET | auth/transactions | Get transactions history|



## Technologies

- Node JS
- Express
- MongoDB
- Jest
- Mongoose




## API Documentation

You can find the documentation here [API DOCS](https://documenter.getpostman.com/view/9555585/SzzkdxkG?version=latest)


## Author

- **Oloruntobi Awoderu*

