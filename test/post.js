const expect = require("chai").expect;
const request = require("supertest");

const app = require("../index");

let date = new Date();
let today = date.toISOString();
let yDate = new Date();
yDate.setDate(yDate.getDate() - 1);
let yesterday = yDate.toISOString();
let tDate = new Date();
tDate.setDate(tDate.getDate() + 1);
let tomorrow = tDate.toISOString();
let nDate = new Date();
let notIso = nDate.toDateString();

describe("POST /transactions", () => {
  it("normal transaction status check : timestamp = now", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "103.029",
        timestamp: today,
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it("normal transaction status check : timestamp = yesterday", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "103.029",
        timestamp: yesterday,
      })
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
  });

  it("normal transaction status check : timestamp = tomorrow", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "103.029",
        timestamp: tomorrow,
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });

  it("normal transaction status check : timestamp = not Iso", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "103.029",
        timestamp: notIso,
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });

  it("normal transaction status check : timestamp = null", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "103.029",
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("no amount transaction status check : timestamp = now", (done) => {
    request(app)
      .post("/transactions")
      .send({
        timestamp: today,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("no amount transaction status check : timestamp = yesterday", (done) => {
    request(app)
      .post("/transactions")
      .send({
        timestamp: yesterday,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("no amount transaction status check : timestamp = tomorrow", (done) => {
    request(app)
      .post("/transactions")
      .send({
        timestamp: tomorrow,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("no amount transaction status check : timestamp = not Iso", (done) => {
    request(app)
      .post("/transactions")
      .send({
        timestamp: notIso,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("no amount transaction status check : timestamp = null", (done) => {
    request(app)
      .post("/transactions")
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("big amount transaction status check : timestamp = now", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "1034564247875421485456488545415446454464544212312344854545454545546666666666664545644121316446541.029",
        timestamp: today,
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  //transaction date : yesterday

  it("big amount transaction status check : timestamp = yesterday", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "1034564247875421485456488545415446454464544212312344854545454545546666666666664545644121316446541.029",
        timestamp: yesterday,
      })
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
  });

  // transaction day : tomorrow

  it("big amount transaction status check : timestamp = tomorrow", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "1034564247875421485456488545415446454464544212312344854545454545546666666666664545644121316446541.029",
        timestamp: tomorrow,
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });

  // transaction day : is not Iso

  it("big amount transaction status check : timestamp = not Iso", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "1034564247875421485456488545415446454464544212312344854545454545546666666666664545644121316446541.029",
        timestamp: notIso,
      })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });

  // transaction day : null

  it("big amount transaction status check : timestamp = null", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "1034564247875421485456488545415446454464544212312344854545454545546666666666664545644121316446541.029",
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});
