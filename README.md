## Solution to part3 of Fullstack open course from Helsinki University

### For submission:

The deployed app in Heroku
Url for the app: https://lit-wildwood-81629.herokuapp.com/

### About the project

This project is created for the exercise part3 of Fullstack open course from Helsinki University.
The projects answers all the tasks in the Exercises(3.1-3.22).

Front end was created with React which was in exercise part2 available at https://github.com/lalitghimire/hy_fullstackopen_2021/tree/master/part2/phonebook. Some modification is done to support the backend. A build is created using `npm run build` command in the root of front end project and copied to the root of backend project.

The application is deployed to the internet with Heroku using Heroku CLI.

### The app uses:

-   Reactjs (Frontend)
-   Node/Expressjs (Backend)
-   MongoDB Atlas/Mongoose (Database)
-   Axios (HTTP client)
-   CORS
-   Heroku (deployment)
-   Visual Studio Code(IDE)

### About the App

This is a simple phonebook app:

-   A user can add/delete a person name and phone number. A notification displayed when added or deleted. Confirmation asked before deletion.
-   If a name already exist user is asked if want to edit the number.
-   A filterbox to show person already in phonebook by name.
-   While adding the name must be 3 character long and the number 8, if not a warning is displayed. Validation provided by mongoose.
-   The persons list is stored in MongoDB Atlas which is cloud based database.
