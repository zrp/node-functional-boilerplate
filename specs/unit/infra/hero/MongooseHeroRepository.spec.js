const MongooseHeroRepository = require('src/infra/repositories/hero/MongooseHeroRepository');
 const factory = require('specs/support/factory.js');
describe('Infra :: Hero :: MongooseHeroRepository', () => {
  describe('#getAll', () => {
    beforeEach(async() => {
      const result = await factory.create('hero');
      console.log("%c 📳: result ", "font-size:16px;background-color:#dd070c;color:white;", result);
    }); 
    test('should return a Async with add operation', async () => {
      // const result = await MongooseHeroRepository.getAll().toPromise();
      // expect(result).toEqual({});
    });
  });
});