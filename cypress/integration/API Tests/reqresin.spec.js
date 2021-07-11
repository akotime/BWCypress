/// <reference types="cypress" />

describe('REST API Test for reqres.in with Cypress', () => {
    it('Create User (Post) - Validate Header content-type', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "name": "tester",
                "job": "qa"
            }
        }).as('createUser').then((request) => {
            cy.log(request.body)
        })

        cy.get('@createUser')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })

    it('Create User (Post) - Validate Response Status Code', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "name": "tester",
                "job": "qa"
            }
        }).as('createUser').then((request) => {
            cy.log(request.body)
        })

        cy.get('@createUser') 
            .its('status')
            .should('equal', 201)
    })

    it('Create User (Post) - Validate Response Body Elements', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "name": "tester",
                "job": "qa"
            }
        }).as('createUser').then((request) => {
            cy.log(request.body)
        })

        cy.get('@createUser')
            .its('body')
            .should('include', {
                name: 'tester',
                 job: 'qa'})
    })
})