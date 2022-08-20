context("Busca pelo CEP", () => {
    beforeEach(() => {
        cy.visit("/encontrar-diarista");
    });

    // it("botão desabilitado e habilitado", () => {
    //     cy.get("#\\:R9jekm\\:").type("1234567");
    //     const botão = cy.get("button").contains(/buscar/i);
    //     botão.should("be.disabled");
    //     cy.wait(2000);
    //     cy.get("#\\:R9jekm\\:").clear().type("38402016");
    //     botão.should("not.be.disabled");
    // });

    it("Aguardar uns 10 segundos", () => {
        cy.wait(10000);
    });

    it("buscar CEP", () => {
        cy.get("#\\:R9jekm\\:").type("38402039");
        cy.get("button")
            .contains(/buscar/i)
            .click();
    });
});
