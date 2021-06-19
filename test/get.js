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

describe("GET /statistics", () => {
  it("no data", (done) => {
    request(app)
      .get("/statistics")
      .then((res) => {
        const body = res.body;
        expect(body.count).to.equal(0);
        expect(body.sum).to.equal("0.00");
        expect(body.max).to.equal("0.00");
        expect(body.min).to.equal("0.00");
        expect(body.avg).to.equal("0.00");
        //done();
      })
      .then(done, done);
  });

  it("check round : no decimal", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "44",
        timestamp: today,
      })
      .then((res) => {
        request(app)
          .get("/statistics")
          .then((res) => {
            const body = res.body;
            expect(body.count).to.equal(1);
            expect(body.sum).to.equal("44.00");
            expect(body.max).to.equal("44.00");
            expect(body.min).to.equal("44.00");
            expect(body.avg).to.equal("44.00");
            //  done();
          });
      })
      .then(done, done);
  });

  it("check round : 1 decimal", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "44.1",
        timestamp: today,
      })
      .then((res) => {
        request(app)
          .get("/statistics")
          .then((res) => {
            const body = res.body;
            expect(body.count).to.equal(1);
            expect(body.sum).to.equal("44.10");
            expect(body.max).to.equal("44.10");
            expect(body.min).to.equal("44.10");
            expect(body.avg).to.equal("44.10");
            done();
          });
      })
      .then(done, done);
  });

  it("check round : 2 decimals", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "44.14",
        timestamp: today,
      })
      .then((res) => {
        request(app)
          .get("/statistics")
          .then((res) => {
            const body = res.body;
            expect(body.count).to.equal(1);
            expect(body.sum).to.equal("44.14");
            expect(body.max).to.equal("44.14");
            expect(body.min).to.equal("44.14");
            expect(body.avg).to.equal("44.14");
            done();
          });
      })
      .then(done, done);
  });

  it("check round : 3 decimals - last decimal < 5", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "44.142",
        timestamp: today,
      })
      .then((res) => {
        request(app)
          .get("/statistics")
          .then((res) => {
            const body = res.body;
            expect(body.count).to.equal(1);
            expect(body.sum).to.equal("44.14");
            expect(body.max).to.equal("44.14");
            expect(body.min).to.equal("44.14");
            expect(body.avg).to.equal("44.14");
            done();
          });
      })
      .then(done, done);
  });

  it("check round : 3 decimals - last decimal >= 5", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "44.145",
        timestamp: today,
      })
      .then((res) => {
        request(app)
          .get("/statistics")
          .then((res) => {
            const body = res.body;
            expect(body.count).to.equal(1);
            expect(body.sum).to.equal("44.15");
            expect(body.max).to.equal("44.15");
            expect(body.min).to.equal("44.15");
            expect(body.avg).to.equal("44.15");
            done();
          });
      })
      .then(done, done);
  });

  it("check values : no transactions", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "44.14",
        timestamp: today,
      })
      .then((res) => {
        request(app)
          .get("/statistics")
          .then((res) => {
            const body = res.body;
            expect(body.count).to.equal(1);
            expect(body.sum).to.equal("44.14");
            expect(body.max).to.equal("44.14");
            expect(body.min).to.equal("44.14");
            expect(body.avg).to.equal("44.14");
            done();
          });
      })
      .then(done, done);
  });

  it("check values : 1 transaction", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "44.14",
        timestamp: today,
      })
      .then((res) => {
        request(app)
          .get("/statistics")
          .then((res) => {
            const body = res.body;
            expect(body.count).to.equal(1);
            expect(body.sum).to.equal("44.14");
            expect(body.max).to.equal("44.14");
            expect(body.min).to.equal("44.14");
            expect(body.avg).to.equal("44.14");
            done();
          });
      })
      .then(done, done);
  });

  it("check values : 2 transactions", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "44.14",
        timestamp: today,
      })
      .then((res) => {
        request(app)
          .get("/statistics")
          .then((res) => {
            const body = res.body;
            expect(body.count).to.equal(1);
            expect(body.sum).to.equal("44.14");
            expect(body.max).to.equal("44.14");
            expect(body.min).to.equal("44.14");
            expect(body.avg).to.equal("44.14");
            done();
          });
      })
      .then(done, done);
  });

  it("check values : 3 transactions", (done) => {
    request(app)
      .post("/transactions/3")
      .send({
        amount: "44.14",
        timestamp: today,
      })
      .then((res) => {
        request(app)
          .get("/statistics")
          .then((res) => {
            const body = res.body;
            expect(body.count).to.equal(3);
            expect(body.sum).to.equal("132.42");
            expect(body.max).to.equal("44.14");
            expect(body.min).to.equal("44.14");
            expect(body.avg).to.equal("44.14");
            done();
          });
      })
      .then(done, done);
  });
  it("check values : 30 transactions", (done) => {
    request(app)
      .post("/transactions/30")
      .send({
        amount: "44.14",
        timestamp: today,
      })
      .then((res) => {})
      .then((res) => {
        request(app)
          .get("/statistics")
          .then((res) => {
            const body = res.body;
            expect(body.count).to.equal(30);
            expect(body.sum).to.equal("1324.20");
            expect(body.max).to.equal("44.14");
            expect(body.min).to.equal("44.14");
            expect(body.avg).to.equal("44.14");
            done();
          });
      })
      .then(done, done);
  });

  it("check values : big amount", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "44143367435237512345678987456123.14",
        timestamp: today,
      })
      .then((res) => {
        request(app)
          .get("/statistics")
          .then((res) => {
            const body = res.body;
            expect(body.count).to.equal(1);
            expect(body.sum).to.equal("44143367435237512345678987456123.14");
            expect(body.max).to.equal("44143367435237512345678987456123.14");
            expect(body.min).to.equal("44143367435237512345678987456123.14");
            expect(body.avg).to.equal("44143367435237512345678987456123.14");
            done();
          });
      })
      .then(done, done);
  });

  it("check values : negative amount", (done) => {
    request(app)
      .post("/transactions")
      .send({
        amount: "-44.14",
        timestamp: today,
      })
      .then((res) => {
        request(app)
          .get("/statistics")
          .then((res) => {
            const body = res.body;
            expect(body.count).to.equal(1);
            expect(body.sum).to.equal("-44.14");
            expect(body.max).to.equal("-44.14");
            expect(body.min).to.equal("-44.14");
            expect(body.avg).to.equal("-44.14");
            done();
          });
      })
      .then(done, done);
  });
});
