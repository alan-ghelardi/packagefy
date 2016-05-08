const expect = require('chai').expect;
const path = require('path');
const packagefy = require('../src/packagefy');

const baseDir = path.join(__dirname, 'fixtures'); 

describe('packagefy', () => {

  describe('when the baseDir argument is not passed', () => {
  
    it('throws an error', () => {
    expect( () => packagefy() )
    .to .throw(TypeError, 'Argument `baseDir` is required');
    });
    
  });
  
  describe('when called without options', () => {
    
    it('packages all modules present at directory', () => {
      const fixtures = packagefy(baseDir); 
      
    expect(fixtures) .to .have .all .keys('anotherPrivateModule', 'helloWorld', 'helpers', 'privateModule', 'someClass');
    });
    
  });
  
});
