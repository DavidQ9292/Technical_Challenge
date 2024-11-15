import pullRequestPage from "../../page_objects/pullRequestPage";

describe('Pull request specs', () => {
  it('test 4 - Extract all data to a CSV for production', () => {
    cy.visit('https://github.com/appwrite/appwrite/pulls');
    let pullRequestsData = [];

    cy.get('[aria-label^="Page"]').invoke('attr', 'data-total-pages')
      .then((totalPages) => {
        const totalPagesNumber = Number(totalPages);
        for (let i = 0; i < totalPagesNumber; i++) {
          cy.get('[aria-label^="Page"]').eq(i).click()
          cy.get('[aria-label^="Page"]').eq(i).should('have.class', 'current', { timeout: 10000 });
          pullRequestsData = pullRequestPage.extractPRData(pullRequestsData);
        }
      }).then(() => {
        pullRequestPage.saveToCSV(pullRequestsData)
        cy.readFile('cypress/downloads/pull-requests.csv').should('exist');
      });
  });
});
