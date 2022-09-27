/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    let token
    before(() => {
        cy.getToken('a@a', 'a')
            .then(tkn => {
                token = tkn
            })
    });

    beforeEach(() => {
        cy.resetRest();
    });

    it('Should create an account', () => {
        cy.request({
            method: 'post',
            headers: { Authorization: `JWT ${token}` },
            url: '/contas',
            body: {
                nome: 'Conta via rest'
            }
        }).as('response');

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('nome', "Conta via rest");
        })
    });

    it.only('Should updade an account', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
                method: 'put',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'Conta alterada'
                }
            }).as('response')
        })

        cy.get('@response').its('status').should('be.equal', 200)
    });

    it('Should not create an account with same name', () => {

    });

    it('Should create a transaction', () => {

    });

    it('Should get balance', () => {

    });
})