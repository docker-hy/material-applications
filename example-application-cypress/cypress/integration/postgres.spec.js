describe("Exercise", () => {

  const service = "postgres"

  it(`${service} connection works`, () => {
    cy.get(`[data-exercise="${service}"]`).click();
    cy.get(`[data-ex-success="${service}"]`);
  });
});
