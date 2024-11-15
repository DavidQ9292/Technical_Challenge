import loginPage from "../../page_objects/loginPage";
import utils from "../../support/utils";

describe('LoginPage tests', () => {
    it('test 3 - Login test', () => {
        //visit the baseUrl
        utils.goToPage('/')

        //click on the account section on the menu
        cy.get('a[href="/fashionhub/account.html"]').click();

        loginPage.login('demouser', 'fashion123');

        //Assert
        cy.url().should('include', 'account.html');
    });
});