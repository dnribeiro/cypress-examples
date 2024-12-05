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
        .and("have.text", "1")  // deve ser "have.text" em vez de "contain" para evitar falsos positivos
                                // no caso de numeros como 11, 21, 31 que contêm 1, mas não são 1
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
        .and("have.text", "2")
    });

    it('Quando autenticado, deve ser possível acessar o carrinho de compras', () => {
        // ACT
        cy.get('[data-test="shopping-cart-link"]').click()

        // ASSERT
        cy.get('[data-test="title"]')
        .should("be.visible")
        .and("contain", "Your Cart")
    });

    it('Quando adicionar um item ao carrinho de compras, o mesmo deve estar na página do carrinho', () => {
        // ACT
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        
        // ASSERT
        cy.get('[data-test="inventory-item"]')
        .should("be.visible")
        .and("contain", "Sauce Labs Bike Light")
    });

    it('Quando adicionar um item ao carrinho de compras, o mesmo pode ser removido na página do carrinho', () => {
        // ACT
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click()

        // ASSERT
        cy.get('[data-test="inventory-item"]')
        .should("not.exist")
    });
});