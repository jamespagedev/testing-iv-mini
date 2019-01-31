const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  // what status code did the endpoint return, we'll check for 200 on /
  // what is the format of the data, we expect json
  // what data is in the body of the request
  describe('GET / endpoint', () => {
    it('should respond with status code 200 OK', async () => {
      let response = await request(server).get('/');

      expect(response.status).toBe(200);
    });

    it('should respond with JSON', async () => {
      let response = await request(server).get('/');

      expect(response.type).toMatch(/json/i);
    });

    it('should send back an object with an api key', async () => {
      const expected = { api: 'up' };
      let response = await request(server).get('/');

      // expect(response.body).toBe(expected); // fails because it's not the reference
      expect(response.body).toEqual(expected);
    });
  });

  // Post stuff...
  describe('POST / endpoint', () => {
    it('should greet the person', async () => {
      const body = { firstName: 'Stephen', lastName: 'Bondor' };
      let response = await request(server)
        .post('/greet')
        .send(body);

      // expect(response.body).toBe(expected); // fails because it's not the reference
      expect(response.body).toEqual({ hello: 'Stephen Bondor' });

      // can send as many requests to server as needed
      response = await request(server)
        .post('/greet')
        .send({ firstName: 'Kai', lastName: 'Lovingfoss' });
      expect(response.body).toEqual({ hello: 'Kai Lovingfoss' });
    });

    it('should Should return 400 if firstName or lastName is missing', async () => {
      const body = { firstName: 'Stephen' };
      let response = await request(server)
        .post('/greet')
        .send(body);

      expect(response.status).toBe(400);
    });
  });
});
