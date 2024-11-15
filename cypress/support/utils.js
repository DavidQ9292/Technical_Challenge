class Utils {
    //created to avoid code duplicity
    verifyCorrectResponseCode(statusCode, url) {
        expect(statusCode).to.satisfy((code) => {
            return (code === 200 || (code >= 300 && code < 310));
        }, `Incorrect status code: ${statusCode} for URL: ${url}`);
    }

    verifyHrefViaClick(url) {
        cy.get('a[href]').each(($link) => {
            const href = $link.attr('href');

            //This test will be checked with an intercept
            cy.intercept(href).as('linkRequest');

            //Access to the href
            cy.get(`a[href="${href}"]`).first().click();
            cy.wait('@linkRequest').then((interception) => {
                const statusCode = interception.response?.statusCode;

                //Assert
                this.verifyCorrectResponseCode(statusCode, url);
            });
            cy.visit(url);
        });
    }

    verifyWebViaGet(url) {
        cy.request({
            method: 'GET',
            url: url,
            failOnStatusCode: false
        }).then((response) => {
            const statusCode = response.status;
            this.verifyCorrectResponseCode(statusCode, url);
        });
    }
}

export default new Utils()