Moviemaven is a social media platform that lets users sign up and review movies.

To start the application create an .env file at the root of the backend folder. And enter your connection string as "CONNECTION_STRING", and your jwt-secret as "JWT_SECRET".

To run the tests in cypress run npx cypress open. Please note that the tests for creating a user only will pass the first time since the user name will exist afterwards in the database.
