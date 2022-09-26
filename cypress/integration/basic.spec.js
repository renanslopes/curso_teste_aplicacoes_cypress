/// <reference types="cypress" />

describe('Crypress basic', () => {
    it.only('Should visit a page and assert title', () => {
        // Capturando o título
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')

        cy.title().then(title => {
            console.log(title)
        })
    })

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        // Verificando se o 'value' do botão é 'Obrigado!'
        cy.get('#buttonSimple')
            .click() // Clicando no botão
            .should('have.value', 'Obrigado!') // Verificando se o 'value' do botão é 'Obrigado!'
    })
})