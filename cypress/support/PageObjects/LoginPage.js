/// <reference types="cypress" />

class LoginPage {
    getEmail() {
        return cy.get('#session_email')
    }

    getPassword() {
        return cy.get('#session_password')
    }

    getSignInButton() {
        return cy.get('input[data-test="submit"]')
    }

    getSignUpLink() {
        return cy.get('[data-test="sign-up"]')
    }

    getErrorMessage() {
        return cy.get('[data-test="notice"]')
    }
}

export default LoginPage