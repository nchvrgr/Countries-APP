/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  name: 'Argentina',
};

describe('Rutas', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Country.sync({ force: false })
    .then(() => Country.findOne({
      where: {
        name: country.name
      }
    })));
 
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );

  //desde aquí empecé rutas countries
    it('should get 200 by searching ARG by id', () =>
      agent.get('/countries/ARG').expect(200)
    );

    it('should get 200 by searching CHN by id', () =>
      agent.get('/countries/CHN').expect(200)
    );
    it('should get 200 by searching arg by name', () =>
      agent.get('/countries?name=arg').expect(200)
    );
    it('should get 200 by searching chi by name', () =>
      agent.get('/countries?name=chi').expect(200)
    );
  });

});