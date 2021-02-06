describe("Exercise", () => {

  const service = "nginx"

  it(`connection through ${service} works`, () => {
    cy.get(`[data-exercise="${service}"]`).click();
    cy.get(`[data-ex-success="${service}"]`);
  });
});
