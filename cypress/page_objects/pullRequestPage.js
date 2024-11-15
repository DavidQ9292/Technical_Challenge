class PullRequestPage {
    extractPRData(pullRequestsData) {
        cy.get('[id^="issue_"]').not('[id$="_link"]').each(($pr) => {
            const name = $pr.find('[id^="issue_"][id$="_link"]').text().trim();
            const creationDate = $pr.find('relative-time').attr('datetime');
            const author = $pr.find('[data-hovercard-type="user"]').text().trim();

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