import utils from "../../support/utils";
describe('HomePage tests', () => {
  it('test 1 - No console errors are displayed in the HomePage', () => {
    // Get the console traces
    cy.window().then((win) => {
      // Intercept the errors
      cy.stub(win.console, 'error').as('consoleError');
    });

    // Visit the baseUrl
    cy.visit('/');

    //Assert
    cy.get('@consoleError').should('not.be.called');
  });

  it.only('test 2 - Check all the href of the HomePage', () => {
    //visit the baseUrl
    cy.visit('/');

    //dinamic function to check all the href of a page
    utils.verifyHrefViaClick('/');

    //check the response code of a webside
    utils.verifyWebViaGet('/');
  });
});