# full-stack-app-react-and-rest-api
## Treehouse Full Stack JavaScript Techdegree Project 10
### Author: Jordan Kittle

This is the final Treehouse Full Stack JavasScript Techdegree project. It create a React front end app to utilize the REST API we built in project 9.

### Install
1. Navigate to the API folder in your terminal / command prompt
    - $ npm install
    - npm run seed
    - npm start
2. Navigate to the CLIENT folder in a different terminal / command prompt
    - $ npm install
    - $ npm start
3. If browser does not open the client automatically, navigate to http://localhost:3000

### Notes
1. I have added a confirm delete button when deleting a course. This is to make sure a course isn't deleted by accidental mouse slip or touch-screen inputs.

2. When creating a new course or updating an existing course, the author field is autoamtically filled with the current authenticated user's name and is not able to be changed. I felt this was the best approach as only the same person who created a course can update or delete it. It wouldn't seem right if user A could post a new course using user B's name, and user B wouldn't be able to update or delete it. This approach prevents any confusion and keeps who created which course consistent. 

### Styling changes
I have made several styling changes that are all located at the bottom of /client/src/components/global.css - These changes are primarily a blue color theme instead of purple, and some box-shadows on course cards and buttons on hover.
