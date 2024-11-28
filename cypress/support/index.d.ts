declare namespace Cypress {
    interface Chainable {
        /**
         * Substitui as linhas de comando que acessam a pagina principal e realizam o login
         * por um método onde apenas é necessário passar a rota da pagina de login, usuario e a senha
         * @example cy.login("/login", "user", "password")
         */
        login(): void
    }
}