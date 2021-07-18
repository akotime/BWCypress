/// <reference types="cypress" />

import AddressPage from '../../support/PageObjects/AddressesPage'
import HomeAddressBookPage from '../../support/PageObjects/HomeAddressBookPage'
import LoginPage from '../../support/PageObjects/LoginPage'

describe('Login Positive Tests with Cypress Page Object and Custom Commands', () => {

    beforeEach('Load Login Page, Sign in and login data file', function() {

        cy.fixture('loginData.json').then(function(loginData) {
            this.loginData = loginData
            cy.visit(this.loginData.signInURL)
            cy.login(this.loginData.username, this.loginData.password)
        })
    })

    it('Validate Sign In to the website', function() {

        const homeAddressBook = new HomeAddressBookPage()
   
        homeAddressBook.getLogInUsername().should('have.text', this.loginData.username)
        homeAddressBook.getWelcomeText().should('have.text', this.loginData.welcomeText)
        homeAddressBook.getDescriptionText().should('include.text', this.loginData.describeText)
    })

    it('Validate go to the addresses site', function() {

        const homeAddressBook = new HomeAddressBookPage()

        homeAddressBook.getAddressesLink().click()
        cy.url().should('include', this.loginData.partUrlAddresses)
    })

    it('Validate go to the adding new address site', function() {

        const homeAddressBook = new HomeAddressBookPage()
        const address = new AddressPage()

        homeAddressBook.getAddressesLink().click()
        
        address.getAddressText().should('have.text', this.loginData.addressText)
        address.getNewAddressesLink().click().url().should('include', this.loginData.partUrlNewAddress)
    })
})

describe('Login Negative Tests with Cypress Page Object and Custom Commands', () => {

    const loginPage = new LoginPage()
    
    beforeEach('Load Login Page and login data file', function() {

        cy.fixture('loginData.json').then(function(loginData) {
            this.loginData = loginData
            cy.visit(this.loginData.signInURL)
        })
    })

    it('Type wrong email and validate a message', function() {

        cy.login(this.loginData.wrongUsername, this.loginData.password)
        loginPage.getErrorMessage().should('have.text', this.loginData.loginErrorMessage)
    })

    it('Type wrong password and validate a message', function() {

        cy.login(this.loginData.username, this.loginData.wrongPassword)
        loginPage.getErrorMessage().should('have.text', this.loginData.loginErrorMessage)
    })
})