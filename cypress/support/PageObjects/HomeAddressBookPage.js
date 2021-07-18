/// <reference types="cypress" />

class HomeAddressBookPage {
    getWelcomeText() {
        return cy.get('h1')
    }

    getDescriptionText() {
        return cy.get('h4')
    }

    getLogInUsername() {
        return cy.get('span[data-test="current-user"]')
    }

    getAddressesLink() {
        return cy.get('[data-test="addresses"]')
    }

    getSignOutLink() {
        return cy.contains('Sign out')
    }
}

export default  HomeAddressBookPage