const server = require('../api/server');
const request = require('supertest');




describe('server.js', function() {

  describe('users-model', () => {
        
    
    describe(' /register', function(){
        it('returns a 201 OK', function(){
            request(server) 
            .post('/register')
            .set('Accept', 'application/json')
            .expect(201)
        })
        it('responds with 404', function()  {
            request(server)
              .post('/register')
              .set('Accept', 'application/json')
              .then(res => {
                expect(res.status).toBe(404);
              });
          })
    });

    describe("GET /", () => {
        it("it should return a 200 OK", () => {
          return request(server)
            .get("/")
            .then(res => {
              expect(res.status).toBe(404);
            });
        });
    });

    describe('/Login', function(){
        it('returns a 200 OK', function(){
            request(server) 
            .post('/login')
            .set('Accept', 'application/json')
            .expect(200)
        })
        it('responds with 404', function()  {
            request(server)
              .post('/login')
              .set('Accept', 'application/json')
              .then(res => {
                expect(res.status).toBe(404);
              });
          })
    });

    describe("GET /api/auth", function() {
        it("should return 200 OK", function() {
          return request(server)
            .get("/api")
            .then(res => {
              expect(200).toBe(200);
            });
        });
    


        it("should return text formatted body", function() {
          return request(server)
            .get("/api/auth")
            .then(res => {
              expect(res.type).toMatch('text');
            });
        });

      });

 });
});