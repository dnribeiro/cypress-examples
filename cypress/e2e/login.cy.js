/// <reference types="cypress"/>

describe('Teste funcional de login', () => {
    beforeEach(() => {
        // ACT
        cy.visit("/")
    });
    it('Deve realizar o login com sucesso', () => {
        // ACT
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()

        // ASSERT
        cy.get('[data-test="title"]')
        .should("be.visible")
        .and("have.text", "Products")
    });

    it('Deve inserir um usuário bloqueado e o mesmo deve ser impedido de entrar no sistema, verificando se o alerta está funcionando corretamente', () => {
        // ACT
        cy.get('[data-test="username"]').type("locked_out_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()

        // ASSERT
        cy.get('.error-message-container')
        .should("have.class", "error")
        
        cy.get('[data-test="error"]')
        .should("be.visible")
        .and("have.text", "Epic sadface: Sorry, this user has been locked out.")
    });
});