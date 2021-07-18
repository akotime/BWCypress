# BWCypress
Cypress Automation Tests

There are tests for testing API "reqres.in" website (POST, PUT, PATCH, DELETE) methods
and tests for validating 'Sign In' and 'Sign Up' UI of the website "http://a.testaddressbook.com" according with Page Object Pattern.
<br>

1) Download the repo BWCypress:<br>
    git clone https://github.com/akotime/BWCypress.git<br>

2) Move to BWCypress folder:<br> 
    cd BWCypress<br>

3) Install Cypress:<br> 
    npm install cypress<br>

4) Open Cypress Test Runner:<br> 
    npx cypress open<br>

5) Choose test in Cypress Test Runner and Run it<br>
    reqres.spec.js - API tests for the website reqres.in<br>
    login.spec.js - POM - UI tests for login form in the website http://a.testaddressbook.com<br>
    register.spec.js - POM - UI tests for sign up form in the website http://a.testaddressbook.com<br>
