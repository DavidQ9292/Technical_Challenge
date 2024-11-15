import pullRequestPage from "../../page_objects/pullRequestPage";
import utils from "../../support/utils";

describe('Pull request specs', () => {
  it('test 4 - Extract all data to a CSV for production', () => {
    utils.goToPage('https://github.com/appwrite/appwrite/pulls')
    pullRequestPage.extractAllPRData();
    cy.readFile('cypress/downloads/pull-requests.csv').should('exist');
  });
});
