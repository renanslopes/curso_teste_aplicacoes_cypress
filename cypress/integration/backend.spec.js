/// <reference types="cypress" />

// const { post } = require("cypress/types/jquery");

describe('Should test at a functional level', () => {
    before(() => {

    });

    beforeEach(() => {

    });

    it('Should create an account', () => {
        cy.request({
            method: 'post',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: "a@a",
                redirecionar: false,
                senha: "a"
            }
        }).its('body.token').should('not.be.empty')//then(res => console.log(res))
            .then(token => {
                cy.request({
                    method: 'post',
                    headers: { Authorization: `JWT ${token}` },
                    url: 'https://barrigarest.wcaquino.me/contas',
                    body: {
                        nome: 'conta 2'
                    }
                }).as('response')//then(res => console.log(res))
            })
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201);
        })
    });

    it('Should updade an account', () => {

    });

    it('Should not create an account with same name', () => {

    });

    it('Should create a transaction', () => {

    });

    it('Should get balance', () => {

    });
})