describe("Exercise", () => {

  const service = "redis"

  it(`${service} connection works`, () => {
    cy.get(`[data-exercise="${service}"]`).click();
    cy.get(`[data-ex-success="${service}"]`);
  });
});
