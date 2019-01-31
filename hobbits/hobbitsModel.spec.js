const request = require('supertest');

const db = require('../data/dbConfig');
const hobbitModel = require('../hobbits/hobbitsModel');

// jest global(s) - before and after each, or before and after all
afterEach(async () => {
  await db('hobbits').truncate();
});

describe('hobbits model', () => {
  it('should insert provided hobbit', async () => {
    let rows = await hobbitModel.insert({ name: 'Bilbo' });

    const hobbits = await db('hobbits');
    expect(hobbits).toHaveLength(1);
  });

  it('should insert provided hobbit and return the hobbit', async () => {
    let hobbit = await hobbitModel.insert({ name: 'Bilbo' });

    let hobbits = await db('hobbits');
    expect(hobbits).toHaveLength(1);
    expect(hobbit.name).toEqual('Bilbo');

    await hobbitModel.insert({ name: 'Sam' });
    hobbits = await db('hobbits');
    expect(hobbits).toHaveLength(2);
  });
});
