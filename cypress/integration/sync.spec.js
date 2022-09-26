/// <reference types="cypress" />

describe('Esperas...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html'); // Hook que é executado antes dos testes contidos no grupo
    })

    beforeEach(() => {
        cy.reload(); // Hook que é executado antes de cada teste contido no grupo
    })

    it('Aguardar elemento estar disponível', () => {
        cy.get('#novoCampo').should('not.exist') // Elemento que aparece um tempo após o botão '#buttonDelay' ser clicado
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('Teste')
    })

    it('Fazer retries', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            .should('exist')
            .type('Teste')
    })

    it('Uso do Find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        cy.get('#lista li span')
            //.find('span')
            .should('contain', 'Item 2')
    })

    it('Uso do timeout', () => {
        // cy.get('#buttonDelay').click();
        // cy.get('#novoCampo', {timeout: 1000}).should('exist') // Forçando um timeout menor para observar erro na tela Cypress

        cy.get('#buttonListDOM').click()
        // cy.wait(5000) // Faz o Cypress aguardar o tempo indicando dentro dos parênteses. Recomenda-se evitar o uso de 'wait', e no seu lugar, usar o 'timeout'
        cy.get('#lista li span', { timeout: 30000 }).should('contain', 'Item 2') // 'timeout' aguarda a condicão ser alcançada para dar seguimento aos próximos comandos, não interrompendo o fluxo pelo tempo exato passado como parametro

        // cy.get('#buttonListDOM').click()
        // cy.get('#lista li span', { timeout: 30000 })
        //     .should('have.length', '2')

    })

    it('Click retry', () => {
        cy.get('#buttonCount')
            .click()
            .should('have.value', '1')
    })

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').should($el => { // Then executa os comandos seguintes apenas quando o GET anterior é concluído
            //cy.get('#lista li span').should($el => { // Should executa os comando seguintes independente do resultado do GET anterior
            expect($el).to.have.length(1)
        }).and('have.id', 'buttonListDOM')
        // Should ignora qualquer expressão RETURN dentro da função, já o Then faz o oposto
    })

})