class LoginPage {
    login(user, password) {
        cy.get('#username').type(user);
        cy.get('#password').type(password);

        cy.get('input[value="Login"]').click();
    }
}

export default new LoginPage()