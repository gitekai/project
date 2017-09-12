const request = require('supertest');
const app = require('../app')

describe('CRUD operations for Grupos Empresariales', () => {
  const root = '/api/v1.0/ge';
  var idCreated;


  test('It should create a GruposEmpresarial named "nonexisting" ', () => {
    return request(app)
      .post(`${root}`)
      // .set('Content-Type','application/json') --> this is done by default
      .send({ nombre: 'nonexisting' })
      .then((ge) => {
        expect(ge).toBeDefined();
        expect(ge.statusCode).toBe(201);
        expect(ge.body.nombre).toBe('nonexisting');
        idCreated = ge.body.id;
      });
  });

  test('It should update a GruposEmpresarial named "nonexisting" changing its name to "nonexisting_modified"', () => {
    return request(app)
      .put(`${root}/${idCreated}`)
      .send({ nombre: 'nonexisting_modified' })
      .then((ge) => {
        expect(ge).toBeDefined();
        expect(ge.statusCode).toBe(201);
        expect(ge.body.nombre).toBe('nonexisting_modified');
      });
  });

  test('It should throw duplicated error on creating "nonexisting_modified" again ', () => {
    return request(app)
      .post(`${root}`)
      .send({ nombre: 'nonexisting_modified' })
      .then((ge) => {
        expect(ge).toBeDefined();
        expect(ge.statusCode).toBe(400);
      });
  });

  test('It should delete the recently created GE" ', () => {
    return request(app)
      .delete(`${root}/${idCreated}`)
      .then((ge) => {
        expect(ge.statusCode).toBe(204);
      });
  });

});
