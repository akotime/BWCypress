/// <reference types="cypress" />

import AddressPage from '../../support/PageObjects/AddressesPage'
import HomeAddressBookPage from '../../support/PageObjects/HomeAddressBookPage'
import SignUpPage from '../../support/PageObjects/SignUpPage'

describe('Positive Sign Up Tests', () => {
    beforeEach('', () => {
        cy.visit('http://a.testaddressbook.com/sign_up')
    })

    it('Sign Up a new user and logout them', () => {

        const homeAddressBook = new HomeAddressBookPage()

        // Generate random email address and sign up 
        cy.genSimpleRandomEmail('test.com').then((randomEmail) => {
            cy.signUpUser(randomEmail, 'Password_12345')
            
            // Validate URL addres was changed
            cy.url().should('include', 'http://a.testaddressbook.com/')

            // Validate if there is a username email in navbar
            homeAddressBook.getLogInUsername().should('have.text', randomEmail.toLowerCase())

            // Sign Out 
            homeAddressBook.getSignOutLink().click()

            // Validate it you are moved to the Login Page
            cy.url().should('include', 'http://a.testaddressbook.com/sign_in')
        })
    })
        

    it('Sign Up a new user, go to the new address page and logout them', () => {

        const homeAddressBook = new HomeAddressBookPage()

        // Generate random email address and sign up 
        cy.genSimpleRandomEmail('test.com').then((randomEmail) => {
            cy.signUpUser(randomEmail, 'Password_12345')
            
            // Validate URL addres was changed
            cy.url().should('include', 'http://a.testaddressbook.com/')

            // Validate if there is a username email in navbar
            homeAddressBook.getLogInUsername().should('have.text', randomEmail.toLowerCase())
            
            // Move to the Address Page
            homeAddressBook.getAddressesLink().click()

            const address = new AddressPage()
            // Validate you are in the Address page
            address.getAddressText().should('have.text', 'Addresses')

            // Click Add New Address link and validate you are in the adding address form page
            address.getNewAddressesLink().click()
            cy.url().should('include', 'addresses/new')

            // Sign Out 
            homeAddressBook.getSignOutLink().click()

            // Validate it you are moved to the Login Page
            cy.url().should('include', 'http://a.testaddressbook.com/sign_in')
        })               
    })

})

describe('Negative Signe Up Tests', () => {
    beforeEach('', () => {
        cy.visit('http://a.testaddressbook.com/sign_up')
    })

    it('Validate if you stay at the Sign Up Page after sign up existing user', () => {

        // Sign Up existing user
        cy.signUpUser('testak@test.com', 'Password_12345')

        // Validate the endpoint is users
        cy.url().should('include', 'users')

        // Validate the header of the site is still Sign Up 
        const signUpPage = new SignUpPage()
        signUpPage.getSignUpTitle().should('include.text', 'Sign up')
    })

    it('Click Sign Up button without email and password', () => {

        // Sign Up existing user
        cy.signUpUser('', '')

        // Validate the endpoint is users
        cy.url().should('include', 'users')

        // Validate the header of the site is still Sign Up 
        const signUpPage = new SignUpPage()
        signUpPage.getSignUpTitle().should('include.text', 'Sign up')
    })
})