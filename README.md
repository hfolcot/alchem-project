# AlchemProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Pre-requisites
Minimum Node v18

Angular CLI v18

API installed and running locally ([Find it here](https://github.com/hfolcot/alchem-project-api))

## Running the project locally
`npm install`

`npm start`

## About the project
A management console that shows database activity with live updates.

To prevent repeated polling of an overloaded database, the project uses SignalR to subscribe to new database events.
The only request that is made is for the initial load of historical events.

## Potential UX improvements
With more time, I would add search and filter functionality to the table so users can easily find specific events.
I would also add pagination as the table would very quickly fill up otherwise.

I would also have liked to add a POST endpoint so that users can mark events as actioned, further enhancing usability as pending/completed actions could be separated cleanly.

