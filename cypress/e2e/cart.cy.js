/// <reference types="cypress"/>

describe('Teste funcional carrinho de compras', () => {
    beforeEach(() => {
        // ARRANGE
        cy.login("/", "standard_user", "secret_sauce")
    });
    it('Quando autenticado, deve ser possível adicionar um item ao carrinho de compras', () => {
        // ACT
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        
        // ASSERT
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
        .should("not.exist")

        cy.get('[data-test="remove-sauce-labs-bike-light"]')
        .should("exist")

        cy.get('[data-test="shopping-cart-badge"]')
        .should("be.visible")
        .and("contain", "1")
    });

    it('Quando autenticado, deve ser possível adicionar múltiplos itens ao carrinho de compras', () => {
        // ACT
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
        
        // ASSERT
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
        .should("not.exist")

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
        .should("not.exist")

        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
        .should("not.exist")

        cy.get('[data-test="remove-sauce-labs-bike-light"]')
        .should("exist")

        cy.get('[data-test="remove-sauce-labs-backpack"]')
        .should("exist")

        cy.get('[data-test="remove-sauce-labs-fleece-jacket"]')
        .should("exist")

        cy.get('[data-test="shopping-cart-badge"]')
        .should("be.visible")
        .and("contain", "3")
    });

    it('Quando autenticado, deve ser possível acessar o carrinho de compras', () => {
        // ACT
        cy.get('[data-test="shopping-cart-link"]').click()

        // ASSERT
        cy.get('[data-test="title"]')
        .should("be.visible")
        .and("contain", "Your Cart")
    });
});