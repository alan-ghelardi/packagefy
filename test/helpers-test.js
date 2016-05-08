const expect = require('chai').expect;
const helpers = require('../src/helpers');

describe('helpers', () => {
  
  describe('.conjunction(predicates...)', () => {
    
    it('creates a function that applies a conjunction between a sequence of predicates', () => {
   const isGreatherThan0 = (x) => x > 0;
   const isDivisibleBy3 = (x) => x % 3 === 0;
   const isOdd = (x) => x % 2 !== 0; 
      const predicate = helpers.conjunction(isGreatherThan0, isDivisibleBy3, isOdd);
      
      expect(predicate(-1)) .to .be .equal(false);
      expect(predicate(4)) .to .be .equal(false);
      expect(predicate(12)) .to .be .equal(false);
      expect(predicate(9)) .to .be .equal(true);
    });
    
    it('also accepts an array of predicates as argument', () => {
      const isGreatherThan0 = (x) => x > 0;
      const isDivisibleBy3 = (x) => x % 3 === 0;
      const isOdd = (x) => x % 2 !== 0; 
         const predicate = helpers.conjunction([isGreatherThan0, isDivisibleBy3, isOdd]);
         
         expect(predicate(-1)) .to .be .equal(false);
         expect(predicate(4)) .to .be .equal(false);
         expect(predicate(12)) .to .be .equal(false);
         expect(predicate(9)) .to .be .equal(true);
    });
    
  });

  describe('.disjunction(predicates...)', () => {

    it('creates a function that applies a disjunction between a sequence of predicates', () => {
      const isNegative = (x) => x < 0;
      const isEven = (x) => x %2 === 0;
      const isNegativeOrEven = helpers.disjunction(isNegative, isEven);
      
      expect(isNegativeOrEven(1)) .to .be .equal(false);
      expect(isNegativeOrEven(2)) .to .be .equal(true);
      expect(isNegativeOrEven(-3)) .to .be .equal(true);
      expect(isNegativeOrEven(-6)) .to .be .equal(true);
    });
  
  it('also accepts an array of predicates as parameter', () => {
    const isNegative = (x) => x < 0;
    const isEven = (x) => x %2 === 0;
    const isNegativeOrEven = helpers.disjunction([isNegative, isEven]);
    
    expect(isNegativeOrEven(1)) .to .be .equal(false);
    expect(isNegativeOrEven(2)) .to .be .equal(true);
    expect(isNegativeOrEven(-3)) .to .be .equal(true);
    expect(isNegativeOrEven(-6)) .to .be .equal(true);
  });
  
});

  describe('.withoutExtension(fileName', () => {
    
    it('returns the file name without its extension', () => {
    const someFile = helpers.withoutExtension('some-file.js');
    expect(someFile) .to .be .equal('some-file');
    });
    
  });
  
  describe('.haveSameName(someFile, another)', () => {
  
    it('returns true', () => {
      expect( helpers.haveSameName('some-file.js', 'some-file') ) .to .be .equal(true);
    });
    
    it('returns false', () => {
      expect( helpers.haveSameName('some-file.js', 'another-file') ) .to .be .equal(false);
    });
    
  });
  
});
