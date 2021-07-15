/// <reference types="cypress" />

describe('REST API Test create user in reqres.in with Cypress', () => {
    before('Go to the reqres.in website', () => {
        cy.fixture('reqres.json').then(reqres => {
            const baseURL = reqres.baseUrl
            cy.visit(baseURL)
        })
    })

    it('Validate creating new user - POST', () => {
        cy.request({
            method: 'POST',
            url: '/api/users',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "name": "tester",
                "job": "qa"
            }
        }).as('createUser').then((response) => {
            cy.log(response.body)
            cy.writeFile('cypress/fixtures/user.json', response.body)
        })
        
        cy.get('@createUser')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')

        cy.get('@createUser') 
            .its('status')
            .should('equal', 201)

        cy.get('@createUser')
            .its('body')
            .should('include', {
                name: 'tester',
                 job: 'qa'
            })
    })

    it('Validate creating existing user - POST', () => {
        cy.fixture('user.json').then(user => {
            cy.request({
                method: 'POST',
                url: '/api/users',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: user
            }).as('createUser').then((response) => {
                cy.log(response.body)
            })
        })
        
        cy.get('@createUser')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')

        cy.get('@createUser') 
            .its('status')
            .should('equal', 201)

        cy.fixture('user.json').then(user => {
            cy.get('@createUser')
                .its('body')
                .should('include', {
                    name: user.name,
                    job: user.job,
                    id: user.id
                })
        })
    })

    it('Validate creating empty user - POST', () => {
        cy.request({
            method: 'POST',
            url: '/api/users',
            headers: {
                'Content-Type': 'application/json'
            }
        }).as('createUser').then((response) => {
            cy.log(response.body)
        })

        cy.get('@createUser') 
            .its('status')
            .should('equal', 201)

        cy.get('@createUser')
            .its('body')
            .should('not.have.property', 'name')
    })

    it('Validate negative example of creating user for non existing endpoint - POST', () => {
        cy.request({
            method: 'POST',
            url: '/api/',
            failOnStatusCode: false
        }).as('createUser').then((response) => {
            cy.log(response.body)
        })

        cy.get('@createUser')
            .its('status')
            .should('equal', 404)
    })

    it('Validate Update User - PUT', () => {
        cy.request({
            method: 'PUT',
            url: '/api/users/2',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "name": "Adam",
                "job": "Dev"
            }
        }).as('createUser').then((response) => {
            cy.log(response.body)
        })

        cy.get('@createUser')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')

        cy.get('@createUser') 
            .its('status')
            .should('equal', 200)

        cy.get('@createUser')
            .its('body')
            .should('include', {
                name: 'Adam',
                 job: 'Dev'
            })

        cy.get('@createUser')
            .its('body')
            .should('have.keys', 'name', 'job', 'updatedAt')
    })

    it('Validate Update User to the same user created in first test - PUT', () => {
        cy.fixture('user').then(user => {
            cy.request({
                method: 'PUT',
                url: '/api/users/2',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: user
            }).as('createUser').then((response) => {
                cy.log(response.body)
            })
        })

        cy.get('@createUser')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')

        cy.get('@createUser') 
            .its('status')
            .should('equal', 200)

        cy.fixture('user').then(user => {    
            cy.get('@createUser')
                .its('body')
                .should('include', {
                    name: user.name,
                    job: user.job,
                    id: user.id
            })
        })        

        cy.get('@createUser')
            .its('body')
            .should('have.keys', 'id','name', 'job', 'updatedAt', 'createdAt')
    })

   it('Validate Update User - PATCH', () => {
        cy.request({
            method: 'PATCH',
            url: '/api/users/2',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "name": "John",
                "job": "Engineer"
            }
        }).as('createUser').then((response) => {
            cy.log(response.body)
        })

        cy.get('@createUser')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')

        cy.get('@createUser') 
            .its('status')
            .should('equal', 200)

        cy.get('@createUser')
            .its('body')
            .should('include', {
                name: 'John',
                 job: 'Engineer'
            })

        cy.get('@createUser')
            .its('body')
            .should('have.keys', 'name', 'job', 'updatedAt')
    })

    it('Validate Deleting User - DELETE', () => {
        cy.request({
            method: 'DELETE',
            url: '/api/users/2',
            headers: {
                'Content-Type': 'application/json'
            }
        }).as('createUser').then((response) => {
            cy.log(response.body)
        })

        cy.get('@createUser')
            .its('headers')
            .its('content-length')
            .should('equal', '0')

        cy.get('@createUser') 
            .its('status')
            .should('equal', 204)
    })

    it('Validate Registration of known user (Register Successful) - POST ', () => {
        cy.request({
            method: 'POST',
            url: '/api/register',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            }
        }).as('register').then((response) => {
            cy.log(response.body)
        })

        cy.get('@register')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')

        cy.get('@register') 
            .its('status')
            .should('equal', 200)

        cy.get('@register')
            .its('body')
            .should('include', {id: 4, token: "QpwL5tke4Pnpja7X4"})
    })

    it('Validate Registration of unknown user (Register Unsuccessful)- POST ', () => {
        cy.request({
            method: 'POST',
            url: '/api/register',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "email": "unknow.user@reqres.in",
                "password": "pistol"
            },
            failOnStatusCode: false
        }).as('register').then((response) => {
            cy.log(response.body)
        })

        cy.get('@register')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')

        cy.get('@register') 
            .its('status')
            .should('equal', 400)

        cy.get('@register')
            .its('body')
            .should('include', {
                "error": "Note: Only defined users succeed registration"
            })
    })

    it('Validate Login - Successful - POST ', () => {
        cy.request({
            method: 'POST',
            url: '/api/login',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        }).as('register').then((response) => {
            cy.log(response.body)
        })

        cy.get('@register')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')

        cy.get('@register') 
            .its('status')
            .should('equal', 200)

        cy.get('@register')
            .its('body')
            .should('include', {
                "token": "QpwL5tke4Pnpja7X4"
            })
    })

    it('Validate Login Unsuccessful (Missing Password) - POST ', () => {
        cy.request({
            method: 'POST',
            url: '/api/login',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "email": "peter@klaven"
            },
            failOnStatusCode: false
        }).as('register').then((response) => {
            cy.log(response.body)
        })

        cy.get('@register')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')

        cy.get('@register') 
            .its('status')
            .should('equal', 400)

        cy.get('@register')
            .its('body')
            .should('include', {
                "error": "Missing password"
            })
    })

    it('Validate Login Unsuccessful (User Not Found) - POST ', () => {
        cy.request({
            method: 'POST',
            url: '/api/login',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "email": "test@test.com",
                "password": "password"
            },
            failOnStatusCode: false
        }).as('register').then((response) => {
            cy.log(response.body)
        })

        cy.get('@register')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')

        cy.get('@register') 
            .its('status')
            .should('equal', 400)

        cy.get('@register')
            .its('body')
            .should('include', { 
                error: 'user not found'
            })
    })
})