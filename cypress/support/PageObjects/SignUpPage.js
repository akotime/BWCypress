/// <reference types="cypress" />

class SignUpPage {
    getEmail() {
        return cy.get('id="user_email"')
    }

    getPassword() {
        return cy.get('id="user_password"')
    }

    getSignUpButton() {
        return cy.get('input[data-test="submit"]')
    }

    getSignInLink() {
        return cy.get('#new_user a[data-test="sign-in"]')
    }
}

export default SignUpPage