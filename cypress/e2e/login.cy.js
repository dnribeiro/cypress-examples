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
    
    it('Deve realizar o login em branco e ser alertado', () => {
        // ACT
        cy.get('[data-test="login-button"]').click()
        
        // ASSERT
        cy.get('.error-message-container')
        .should("have.class", "error")
        
        cy.get('[data-test="error"]')
        .should("be.visible")
        .and("have.text", "Epic sadface: Username is required")
    });

    it('Deve inserir apenas a senha e ser alertado', () => {
        // ACT
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
        
        // ASSERT
        cy.get('.error-message-container')
        .should("have.class", "error")
        
        cy.get('[data-test="error"]')
        .should("be.visible")
        .and("have.text", "Epic sadface: Username is required")
    });

    it('Deve inserir apenas o usuario e ser alertado', () => {
        // ACT
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="login-button"]').click()
        
        // ASSERT
        cy.get('.error-message-container')
        .should("have.class", "error")
        
        cy.get('[data-test="error"]')
        .should("be.visible")
        .and("have.text", "Epic sadface: Password is required")
    });

    it('Deve inserir um usuário bloqueado e o mesmo deve ser impedido de entrar no sistema e alertado', () => {
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

    it('Deve inserir um usuário errado com senha correta e o mesmo deve ser alertado', () => {
        // ACT
        cy.get('[data-test="username"]').type("standard_use")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()

        // ASSERT
        cy.get('.error-message-container')
        .should("have.class", "error")
        
        cy.get('[data-test="error"]')
        .should("be.visible")
        .and("have.text", "Epic sadface: Username and password do not match any user in this service")
    });

    it('Deve inserir um usuário correto com senha errada e o mesmo deve ser alertado', () => {
        // ACT
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauc")
        cy.get('[data-test="login-button"]').click()

        // ASSERT
        cy.get('.error-message-container')
        .should("have.class", "error")
        
        cy.get('[data-test="error"]')
        .should("be.visible")
        .and("have.text", "Epic sadface: Username and password do not match any user in this service")
    });
});