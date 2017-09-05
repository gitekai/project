const request = require('supertest');
const app = require('../app')

describe('CRUD operations for Grupos Empresariales', () => {
  const root = '/api/v1.0/ge';
  var idCreated;


  test('It should create a GruposEmpresarial named "nonexistingA" ', () => {
    return request(app)
      .post(`${root}`)
      // .set('Content-Type','application/json') --> this is done by default
      .send({ nombre: 'nonexistingA'})
      .then( (ge) => {
        expect(ge).toBeDefined();
        expect(ge.statusCode).toBe(201);
        expect(ge.body.nombre).toBe('nonexistingA');
	      idCreatedA = ge.body.id;
      });
  });	
  test('It should create a GruposEmpresarial named "nonexistingB" ', () => {
    return request(app)
      .post(`${root}`)
      // .set('Content-Type','application/json') --> this is done by default
      .send({ nombre: 'nonexistingB'})
      .then( (ge) => {
        expect(ge).toBeDefined();
        expect(ge.statusCode).toBe(201);
        expect(ge.body.nombre).toBe('nonexistingB');
        idCreatedB = ge.body.id;
       
      });
  });
  test('It should create a GruposEmpresarial named "nonexistingC" ', () => {
    return request(app)
      .post(`${root}`)
      // .set('Content-Type','application/json') --> this is done by default
      .send({ nombre: 'nonexistingC'})
      .then( (ge) => {
        expect(ge).toBeDefined();
        expect(ge.statusCode).toBe(201);
        expect(ge.body.nombre).toBe('nonexistingC');
        idCreatedC = ge.body.id;
        
      });
  });
  test('It should throw duplicated error on creating "nonexistingA" again ', () => {
    return request(app)
      .post(`${root}`)
      .send({ nombre: 'nonexisting' })
      .then((ge) => {
        expect(ge).toBeDefined();
        expect(ge.statusCode).toBe(400);
      });
   });
   

  test('It should update a GruposEmpresarial named "nonexistingA" changing its name to "nonexisting_modified"', () => {
    return request(app)
      .put(`${root}/${idCreated}`)
      .send({ nombre: 'nonexisting_modified' })
      .then( (ge) => {
        expect(ge).toBeDefined();
        expect(ge.statusCode).toBe(201);
        expect(ge.body.nombre).toBe('nonexisting_modified');
      });
  });	
  test('It should error when updating an non existing object', () => {
    return request(app)
      .put(`${root}/${idCreated}+1`)
      .send({ nombre: 'nonexisting_modified' })
      .then((ge) => {
        expect(ge.statusCode).toBe(400);
      });
  });	
  test('It should return array when getting', () => {
    return request(app)
      .get(`${root}`)
      .then((ge) => {
        debugger;
        expect(ge.statusCode).toBe(200);
        expect(Array.isArray(ge.body)).toBe(true);
      });
  });	

  test('It should delete the recently created GE" ', () => {
    return request(app)
      .delete(`${root}/${idCreatedA}`)
      .then((ge) => {
        expect(ge.statusCode).toBe(200);
      });
  });	
  test('It should delete the recently created GE" ', () => {
    return request(app)
      .delete(`${root}/${idCreatedB}`)
      .then((ge) => {
        expect(ge.statusCode).toBe(200);
      });
  });	
  test('It should delete the recently created GE" ', () => {
    return request(app)
      .delete(`${root}/${idCreatedC}`)
      .then((ge) => {
        expect(ge.statusCode).toBe(200);
      });
  });	

});
