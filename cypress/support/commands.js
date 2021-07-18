// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import LoginPage from './PageObjects/LoginPage'
import SignUpPage from './PageObjects/SignUpPage'

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Cypress.Commands.add('login', (username, password) => {
    // Creating Object for LoginPage
    const loginPage = new LoginPage()

    // Type username and password to input box
    loginPage.getEmail().type(username)
    loginPage.getPassword().type(password)

    // Click Sign In Button
    loginPage.getSignInButton().click()
})

Cypress.Commands.add('signUpUser', (username, password) => {
    // Creating Object for SignUpPage
    const signUp = new SignUpPage()

    // Type username and password to input box
    signUp.getEmail().invoke('val', username)
    signUp.getPassword().invoke('val', password)
    
    // Click Sign Up Button
    signUp.getSignUpButton().click()
})

Cypress.Commands.add('genSimpleRandomEmail', (domainString) => {
    let text = ''
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    for(let i=0; i < 10; i++)
        text += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    
    return text +'@' + domainString
})