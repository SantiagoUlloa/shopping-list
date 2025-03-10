# Cartit
A groceries shopping list app

<img width="1263" alt="Screenshot 2025-03-09 at 8 45 38 PM" src="https://github.com/user-attachments/assets/c3acb94d-0ba6-429f-a5e4-1dc860c236fe" />

## How to run this project locally:
Clone the project, open it in your favorite IDE. cd into the backend folder and then Shopping-api, then run "docker compose up" in the terminal. Make sure you have docker installed on your computer and running. Also postgreSQL needs to be installed and running. And then cd into the frontend folder and cd into the src folder and run "npm i && npm run start" in the terminal. 

## Team Members
Santiago Ulloa (@SantiagoUlloa)

## Tech Stack
* Amazon Web Services
* Bootstrap
* Docker
* Java(Spring Boot)
* Material-UI
* PostgreSQL
* React

![login page](/IMG_7982.JPG)
![shopping list](/IMG_1177.JPG)
![shopping list 2](/IMG_0057.JPG)

## Completions

| Day       | Monday 11/04 | Tuesday 11/05 | Wednesday 11/06 | Thursday 11/07 | Friday 11/08 |
|-----------|--------------|---------------|-----------------|----------------|--------------|
| Worked on | Back-end     | Back-end      | Back-end        | Back-end       | Front-end    |

| Day       | Monday 11/11 | Tuesday 11/12 | Wednesday 11/13 | Thursday 11/14 | Friday 11/15 |
|-----------|--------------|---------------|-----------------|----------------|--------------|
| Worked on | Back-end     | Front-end     | Front-end       | Deployment     | Presentation |

## General Approach
Started off by plotting out the structure for the backend. I knew from the start that I would need a user model. After that started my front-end, focusing on the visual aspect and then focused making the JWToken stuff work. After all of the backend stuff was done I focused on the frontend.

## Challenges
Encountered a factoryManager bean error that would not allow my microservices to build. I was also was having issues with the JWToken files and my userRepository. Turns out it was one of my property settings. Once I adjusted and added the correct properties in my properties file, it was able to run the build in microservices. That error set me back a day while working on my backend.


## User Stories
our users are regular everyday people who go grocery shopping.

* As a User, I want an a grocery list app so that I can add all my  items and remove them once I have those items in my shopping cart.
* As a guest, I want the ability to use the app without having to log in.
* As a User, I want an app that I can use before I go grocery shopping where I can save items.

