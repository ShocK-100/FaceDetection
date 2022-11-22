# Face Detection Web App
A responsive web application for detecting human faces in images using image URL.

This app implements a sign in page, a registration page, API calls to Clarifai's face recognition service and more.<br></br>

<img width="768" alt="image" src="https://user-images.githubusercontent.com/109988719/203302193-71d8c30d-86e4-4cfb-ac34-21e40be08ef8.JPG">


## Front End 
Developed with React, deployed to Netlify, and made responsive as seen in the examples below:<br /><br />

**Login page - Desktop preview:**

<img width="768" alt="image" src="https://user-images.githubusercontent.com/109988719/203302896-93cd0de2-38d9-42fa-bf0a-acdccd3ffcd4.png">

**Login page - Mobile preview:**

<img width="250" alt="image" src="https://user-images.githubusercontent.com/109988719/203302821-fff93a6c-ee9b-4ee8-b3fb-2b1780312786.png">

## Back End 
Developed with Node.js, using the Express library for routing and the Bcrypt library for encrypting passwords.<br /><br />
The backend API is hosted by Heroku at: https://face-detection-talzvi.herokuapp.com

## Database
A PostgreSQL database is used for storing the user information and login credentials, managed by ElephantSQL's hosting service. 
