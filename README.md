# BWCypress
Cypress Automation Tests

There are tests for testing API "reqres.in" website (POST, PUT, PATCH, DELETE) methods
and tests for validating 'Sign In' and 'Sign Up' UI of the website "http://a.testaddressbook.com" according with Page Object Pattern.


1) Download the repo BWCypress:
    git clone https://github.com/akotime/BWCypress.git

2) Move to BWCypress folder: 
    cd BWCypress

3) Install Cypress: 
    npm install cypress

4) Open Cypress Test Runner: 
    npx cypress open

5) Choose test in Cypress Test Runner and Run it
    reqres.spec.js - API tests for the website reqres.in
    login.spec.js - POM - UI tests for login form in the website http://a.testaddressbook.com
    register.spec.js - POM - UI tests for sign up form in the website http://a.testaddressbook.com
