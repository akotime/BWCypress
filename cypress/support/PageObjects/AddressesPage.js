/// <reference types="cypress" />

class AddressPage {
    getAddressText() {
        return cy.get('h2')
    }
    
    getNewAddressesLink() {
        return cy.contains('New Address')
    }
}

export default AddressPage