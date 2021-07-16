import AddressPage from '../../support/PageObjects/AddressesPage'
import HomeAddressBookPage from '../../support/PageObjects/HomeAddressBookPage'
import LoginPage from '../../support/PageObjects/LoginPage'

describe('Login Positive Tests with Cypress Page Object and Custom Commands', () => {
    beforeEach('Load Login Page', () => {
        cy.visit('http://a.testaddressbook.com/sign_in')
        cy.login('testak@test.com', 'Password_12345')
    })

    it('Validate Sign In to the website', () => {
        const homeAddressBook = new HomeAddressBookPage()
   
        homeAddressBook.getLogInUsername().should('have.text', 'testak@test.com')
        homeAddressBook.getWelcomeText().should('have.text', 'Welcome to Address Book')
        homeAddressBook.getDescriptionText().should('include.text', 'A simple web app for showing off your testing')
    })

    it('Validate go to the addresses site', () => {
        const homeAddressBook = new HomeAddressBookPage()

        homeAddressBook.getAddressesLink().click()
        cy.url().should('include', 'addresses')
    })

    it('Validate go to the adding new address site', () => {
        const homeAddressBook = new HomeAddressBookPage()
        const address = new AddressPage()

        homeAddressBook.getAddressesLink().click()
        
        address.getAddressText().should('have.text', 'Addresses')
        address.getNewAddressesLink().click().url().should('include', 'new')
    })
})

describe('Login Negative Tests with Cypress Page Object and Custom Commands', () => {
    const loginPage = new LoginPage()
    
    beforeEach('Load Login Page', () => {
        cy.visit('http://a.testaddressbook.com/sign_in')
    })

    it('Type wrong email and validate a message', () => {
        cy.login('testak@textttt.com', 'Password_12345')
        loginPage.getErrorMessage().should('have.text', 'Bad email or password.')
    })

    it('Type wrong password and validate a message', () => {
        cy.login('testak@test.com', 'Password')
        loginPage.getErrorMessage().should('have.text', 'Bad email or password.')
    })
})