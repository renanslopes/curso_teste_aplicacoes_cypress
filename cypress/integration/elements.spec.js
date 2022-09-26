/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html'); // Hook que é executado antes dos testes contidos no grupo
    })

    beforeEach(() => {
        cy.reload(); // Hook que é executado antes de cada teste contido no grupo
    })

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado'); // Buscando em 'body' elementos que contenham a palavra 'Cuidado'
        cy.get('span').should('contain', 'Cuidado'); // Buscando em elementos 'span' a palavra 'Cuidado'
        cy.get('.facilAchar').should('contain', 'Cuidado'); // Buscando no elemento com a classe '.facilAchar' a palavra 'Cuidado'
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...'); // Buscando no elemento com a classe '.facilAchar' a expressão completa 'Cuidado onde clica, muitas armadilhas...'
    })

    it('Links', () => {
        cy.get('[href="#"]').click();
        cy.get('#resultado').should('have.text', 'Voltou!'); // Buscando no elemento com id '#resultado' a expressão 'Voltou!'

        cy.reload(); // Força um 'refresh' na página
        cy.get('#resultado').should('have.not.text', 'Voltou!') // Verificando se o elemento '#resultado' não possui a expressão 'Voltou!', antes da ação de 'click()'
        cy.contains('Voltar').click();
        cy.get('#resultado').should('have.text', 'Voltou!') // Verificando se o elemento '#resultado' possui a expressão 'Voltou!', após da ação de 'click()'
    })

    it.skip('TextFields', () => {
        cy.get('#formNome').type('Cypress Test')  // Escrevendo o valor 'Cypress Test' no campo '#formNome'
        cy.get('#formNome').should('have.value', 'Cypress Test')  // Conferindo para saber se a escrita no campo foi bem sucedida

        cy.get('#elementosForm\\:sugestoes')
            .type('Cypress TestArea')
            .should('have.value', 'Cypress TestArea');

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???');

        cy.get('[data-cy=dataSobrenome]')
            .type('Teste12345{backspace}{backspace}') // Escrevendo 'Teste12345' no campo '[data-cy=dataSobrenome]' e em seguida inputando 2 'backspace' 
            .should('have.value', 'Teste123') // Conferindo se o valor final do campo é 'Teste123' (Devido aos 'backspace') 

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto', { delay: 500 }) // {selectall} Seleciona todo o valor do campo utilizado
            .should('have.value', 'acerto')
    })

    it('Radio Button', () => {
        cy.get('#formSexoMasc')
            .click()
            .should('be.checked') // Verifica se o radio button está selecinado

        cy.get('#formSexoFem')
            .should('not.be.checked'); // Verifica se o radio button não está selecinado

        cy.get("[name='formSexo']")
            .should('have.length', 2) // Verifica o tamanho do elemento é igual a 2.
    })

    it('Checkbox Button', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get("[name='formComidaFavorita']").click({ multiple: true })
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
    })

    it('ComboBox', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo') // Selecionando item na combobox através do conteúdo da tag 'option'
            .should('have.value', '2graucomp')
        // OU 
        //.should('contain', '2o grau completo')

        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp') // Selecionando item na combobox através do conteúdo da tag 'value'
            .should('have.value', '1graucomp')
    })

    it.only('ComboBox Multiplo', () => {
        cy.get('[data-testid=dataEsportes]')
        .select(['natacao', 'Corrida'])
    })
})