const Query = require('./resolver').Query;
const mocks = require('../mocks');
/* eslint-disable */

describe('Query.TiposContactos', () => {
  it('returns all TiposContactos', () => {
    const arr = [mocks.TipoContacto(),mocks.TipoContacto(),mocks.TipoContacto()];
    const queryStub = q => {
      return Promise.resolve(arr);
    };

    const context = { models: { TiposContacto: { findAll: queryStub } }};
    return Query.tiposContactos(null, {}, context).then(results => {
      expect(results).toEqual(arr);
    });
  });
});
