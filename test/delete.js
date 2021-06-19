const expect = require("chai").expect;
const request = require("supertest");
const app = require("../index");

let date = new Date();
let today = date.toISOString();

describe("DELETE /transactions", () => {
  it("check delete : 1 transactions", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "44.14",
        timestamp: today,
      })
      .then((res) => {})
      .then((res) => {
        request(app)
          .delete("/transactions")
          .then((res) => {})
          .then((res) => {
            request(app)
              .get("/statistics")
              .then((res) => {
                const body = res.body;
                expect(body.count).to.equal(0);
                expect(body.sum).to.equal("0.00");
                expect(body.max).to.equal("0.00");
                expect(body.min).to.equal("0.00");
                expect(body.avg).to.equal("0.00");
              });
          });
      })
      .then(done, done);
  });

  it("check delete : 0 transactions", (done) => {
    request(app)
      .delete("/transactions")
      .then((res) => {})
      .then((res) => {
        request(app)
          .get("/statistics")
          .then((res) => {
            const body = res.body;
            expect(body.count).to.equal(0);
            expect(body.sum).to.equal("0.00");
            expect(body.max).to.equal("0.00");
            expect(body.min).to.equal("0.00");
            expect(body.avg).to.equal("0.00");
          });
      })
      .then(done, done);
  });

  it("check delete : 30 transactions", (done) => {
    request(app)
      .post("/transactions/30")
      .send({
        amount: "44.14",
        timestamp: today,
      })
      .then((res) => {})
      .then((res) => {
        request(app)
          .delete("/transactions")
          .then((res) => {})
          .then((res) => {
            request(app)
              .get("/statistics")
              .then((res) => {
                const body = res.body;
                expect(body.count).to.equal(0);
                expect(body.sum).to.equal("0.00");
                expect(body.max).to.equal("0.00");
                expect(body.min).to.equal("0.00");
                expect(body.avg).to.equal("0.00");
              });
          });
      })
      .then(done, done);
  });
});
