# BWCypress
## Cypress Automation Tests

There are tests for testing API "reqres.in" website (POST, PUT, PATCH, DELETE) methods
and tests for validating 'Sign In' and 'Sign Up' UI of the website "http://a.testaddressbook.com" according with Page Object Pattern.
<br>

<strong>1) Download the repo BWCypress:</strong><br>
    git clone https://github.com/akotime/BWCypress.git<br>

<strong>2) Move to BWCypress folder:</strong><br> 
    cd BWCypress<br>

<strong>3) Install Cypress:</strong><br> 
    npm install cypress<br>

<strong>4) Open Cypress Test Runner:</strong><br> 
    npx cypress open<br>

<strong>5) Choose test in Cypress Test Runner and Run it:</strong><br>
    reqres.spec.js - API tests for the website reqres.in<br>
    login.spec.js - POM - UI tests for login form in the website http://a.testaddressbook.com<br>
    register.spec.js - POM - UI tests for sign up form in the website http://a.testaddressbook.com<br>
