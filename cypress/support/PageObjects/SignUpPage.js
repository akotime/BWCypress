/// <reference types="cypress" />

class SignUpPage {
    getEmail() {
        return cy.get('#user_email')
    }

    getPassword() {
        return cy.get('#user_password')
    }

    getSignUpButton() {
        return cy.get('input[data-test="submit"]')
    }

    getSignInLink() {
        return cy.get('#new_user a[data-test="sign-in"]')
    }

    getSignUpTitle() {
        return cy.get('h2')
    }
}

export default SignUpPage