/// <reference types="cypress"/>

describe('Fluxo completo para checkout do pedido', () => {
    beforeEach(() => {
        // ARRANGE
        cy.login("/", "standard_user", "secret_sauce")
    });
    it('Quando autenticado, devo concluir o checkout do pedido com sucesso', () => {
        // ACT
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="remove-sauce-labs-onesie"]').click()

        // ASSERT
        cy.get('[data-test="cart-list"] > :nth-child(4)')
        .should("be.visible")
        .and("contain", "Sauce Labs Bolt T-Shirt")
        cy.get('[data-test="cart-list"] > :nth-child(5)')
        .should("be.visible")
        .and("contain", "Sauce Labs Fleece Jacket")
        cy.get('[data-test="cart-list"] > :nth-child(6)')
        .should("be.visible")
        .and("contain", "Sauce Labs Backpack")

        // ACT
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type("Primeiro Nome")
        cy.get('[data-test="lastName"]').type("Ultimo Nome")
        cy.get('[data-test="postalCode"]').type("12345678")
        cy.get('[data-test="continue"]').click()

        // ASSERT
        cy.get('[data-test="cart-list"] > :nth-child(3)')
        .should("be.visible")
        .and("contain", "Sauce Labs Bolt T-Shirt")
        cy.get('[data-test="cart-list"] > :nth-child(4)')
        .should("be.visible")
        .and("contain", "Sauce Labs Fleece Jacket")
        cy.get('[data-test="cart-list"] > :nth-child(5)')
        .should("be.visible")
        .and("contain", "Sauce Labs Backpack")
        cy.get('[data-test="total-label"]')
        .should("have.text", "Total: $103.65")

        // ACT
        cy.get('[data-test="finish"]').click()

        // ASSERT
        cy.get('[data-test="checkout-complete-container"]')
        .should("be.visible")
        .and("contain", "Thank you for your order!")
    });
});