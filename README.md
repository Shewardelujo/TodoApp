# TodoApp

A Todo App that enables you to organize your schedules ahead of time.

## Overview

This application allows you to:

- Create a new Todo (The todo title, detail and due date)
- View your list of todos
- Notifies you when a todo date is due
- Move a todo from Uncompleted to Completed
- Search for a todo
- View an individual todo
- Edit a todo
- Delete a todo

There are two implementations that you can use on this application:

## Local Storage

- For holding and persisting the data

* To use this implementation, check out to the main branch by running `git checkout main`

## Behavioral Subject

- This implementation allows you to use behavioral subject to hold the current data state across the application and upon updating the list using behavioral subject .next() method, at the same time set the updated data state to local storage and only get data from local storage upon initialization the application, this is to ensure persistence upon reloads.

- To use this implementation, check out to the main branch by running `git checkout feat-behavior-subject-implementation`

## How It Works?

- Clone the repository by running `git clone https://github.com/Shewardelujo/TodoApp.git`

* Change directory into the application, `cd TodoApp`
* Run `npm install` to install dependencies
* Checkout to the branch that has your preferred implementation
* Run `ng serve` to start the application
* Open `http://localhost:4200/` on your browser to interact with the application
