class PullRequestPage {
    elements = {
        pagesIndex: () => cy.get('[aria-label^="Page"]'),
        pullRequests: () => cy.get('[id^="issue_"]').not('[id$="_link"]'),
        pullRequestName: '[id^="issue_"][id$="_link"]',
        pullRequestCreationDate: 'relative-time',
        pullRequestAuthor: '[data-hovercard-type="user"]'
    };

    extractAllPRData() {
        let pullRequestsData = []
        this.elements.pagesIndex().invoke('attr', 'data-total-pages')
            .then((totalPages) => {
                const totalPagesNumber = Number(totalPages);
                for (let i = 0; i < totalPagesNumber; i++) {
                    this.elements.pagesIndex().eq(i).click()
                    this.elements.pagesIndex().eq(i).should('have.class', 'current', { timeout: 10000 });
                    pullRequestsData = this.extractPRData(pullRequestsData);
                }
            }).then(() => {
                this.saveToCSV(pullRequestsData);
                cy.readFile('cypress/downloads/pull-requests.csv').should('exist');
            });
    }

    extractPRData(pullRequestsData) {
        this.elements.pullRequests().each(($pr) => {
            const name = $pr.find(this.elements.pullRequestName).text().trim();
            const creationDate = $pr.find(this.elements.pullRequestCreationDate).attr('datetime');
            const author = $pr.find(this.elements.pullRequestAuthor).text().trim();
            cy.log(name)
            pullRequestsData.push({
                name,
                creationDate,
                author
            });
        })
        return pullRequestsData;
    }

    saveToCSV(pullRequestsData) {
        const csvContent = [
            ['Name', 'Creation Date', 'Author'],
            ...pullRequestsData.map(pr => [pr.name, pr.creationDate, pr.author])
        ]
            .map(row => row.join(','))
            .join('\n');

        //save the csv
        cy.writeFile('cypress/downloads/pull-requests.csv', csvContent);
    }
}

export default new PullRequestPage()