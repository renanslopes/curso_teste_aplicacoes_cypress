/// <reference types="cypress" />

describe('Helpers', () => {
    it('Wrap', () => {
        const obj = { nome: 'user', idade: 20 }
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome') // WRAP encapsula elementos para poderem ser consumidos pela API do Cypress

        cy.visit('http://wcaquino.me/cypress/componentes.html')

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => { console.log('Primeiro botão') })
        cy.wrap(promise).then(ret => console.log(ret)) // Nessa etapa, sem o uso do WRAP, essa Promise é consumidade fora da sua ordem correta
        cy.get('#buttonList').then(() => console.log('Segundo botão'))

        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)
    })

    it('Its', () => {
        const obj = { nome: 'User', idade: 20 }
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User') // Realizando assertiva apenas em uma das propriedades do objeto

        const obj2 = { nome: 'User', idade: 20, endereco: { rua: 'dos bobos' } }
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos') // Assertiva em cima de propriedade encadeada
        // Encadeamento pode ser feito também da maneira abaixo
        cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')

        cy.visit('http://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)
    })

    it.only('Invoke', () => {
        const getValue = () => 1
        const soma = (a, b) => a + b

        cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1) // Invocando uma função para ser usada no escopo do Cypress
        cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7) // Invocando uma função para ser usada no escopo do Cypress, com parametros

        cy.visit('http://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'Texto via invoke')

        cy.get('#resultado')
            .invoke('html', '<input type="button" value="Inserido!">')
    })
})