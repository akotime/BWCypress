/// <reference types="cypress" />

import AddressPage from '../../support/PageObjects/AddressesPage'
import HomeAddressBookPage from '../../support/PageObjects/HomeAddressBookPage'
import SignUpPage from '../../support/PageObjects/SignUpPage'

describe('Positive Sign Up Tests', () => {

    beforeEach('Load Sign Up Page', () => {

        cy.fixture('signUpData.json').then((signUpData) => {
            cy.visit(signUpData.signUpURL)
        })
    })

    it('Sign Up a new user and logout them', () => {

        const homeAddressBook = new HomeAddressBookPage()

        cy.fixture('signUpData.json').then((signUpData) => {
            // Generate random email address and sign up 
            cy.genSimpleRandomEmail(signUpData.domainName).then((randomEmail) => {
                cy.signUpUser(randomEmail, signUpData.password)
                
                // Validate URL addres was changed
                cy.url().should('include', signUpData.baseURL)

                // Validate if there is a username email in navbar
                homeAddressBook.getLogInUsername().should('have.text', randomEmail.toLowerCase())

                // Sign Out 
                homeAddressBook.getSignOutLink().click()

                // Validate if you are moved to the Login Page
                cy.url().should('include', signUpData.signInURL)
            })
        })
    })
        
    it('Sign Up a new user, go to the new address page and logout them', () => {

        const homeAddressBook = new HomeAddressBookPage()

        cy.fixture('signUpData.json').then((signUpData) => {
            // Generate random email address and sign up 
            cy.genSimpleRandomEmail(signUpData.domainName).then((randomEmail) => {
                cy.signUpUser(randomEmail, signUpData.password)
                
                // Validate URL addres was changed
                cy.url().should('include', signUpData.baseURL)

                // Validate if there is a username email in navbar
                homeAddressBook.getLogInUsername().should('have.text', randomEmail.toLowerCase())
                
                // Move to the Address Page
                homeAddressBook.getAddressesLink().click()

                const address = new AddressPage()
                // Validate you are in the Address page
                address.getAddressText().should('have.text', signUpData.addressText)

                // Click Add New Address link and validate you are in the adding address form page
                address.getNewAddressesLink().click()
                cy.url().should('include', signUpData.newAddresse)

                // Sign Out 
                homeAddressBook.getSignOutLink().click()

                // Validate it you are moved to the Login Page
                cy.url().should('include', signUpData.signInURL)
            })  
        })             
    })

})

describe('Negative Signe Up Tests', () => {
    beforeEach('', () => {
        cy.fixture('signUpData.json').then((signUpData) => {
            cy.visit(signUpData.signUpURL)
        })    
    })

    it('Validate if you stay at the Sign Up Page after sign up existing user', () => {

        cy.fixture('signUpData.json').then((signUpData) => {
            // Sign Up existing user
            cy.signUpUser(signUpData.username, signUpData.password)

            // Validate the endpoint is users
            cy.url().should('include', signUpData.endpointUsers)

            // Validate the header of the site is still Sign Up 
            const signUpPage = new SignUpPage()
            signUpPage.getSignUpTitle().should('include.text', signUpData.signUpPageTitle)
        })
    })

    it('Click Sign Up button without email and password', () => {

        cy.fixture('signUpData.json').then((signUpData) => {
            // Sign Up existing user
            cy.signUpUser(signUpData.emptyUsername, signUpData.emptyPassword)

            // Validate the endpoint is users
            cy.url().should('include', signUpData.endpointUsers)

            // Validate the header of the site is still Sign Up 
            const signUpPage = new SignUpPage()
            signUpPage.getSignUpTitle().should('include.text', signUpData.signUpPageTitle)
        })
    })
})