const _ = require('lodash');
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
    
    it('packages all modules from the directory except the index.js', () => {
      const fixtures = packagefy(baseDir); 
      
    expect(fixtures) .to .have .all .keys('anotherPrivateModule', 'helloWorld', 'helpers', 'privateModule', 'someClass');
    });
    
  });

  describe('when the option `exclude` is passed', () => {
      
      it('accepts a regular expression for excluding modules', () => {
      const fixtures = packagefy(baseDir, {
        exclude: /(private)|(helpers)/
      });
      
      expect(fixtures) .to .have .all .keys('helloWorld', 'someClass');
    });
    
      it('accepts a string for excluding modules', () => {
        const fixtures = packagefy(baseDir, {
          exclude: 'private-module' 
        });
        
        expect(fixtures) .to .have .all .keys('anotherPrivateModule', 'helloWorld', 'helpers', 'someClass');
      });
      
        it('accepts a function for excluding modules', () => {
          const fixtures = packagefy(baseDir, {
            exclude: (fileName) => fileName.indexOf('private') >= 0
          });

        expect(fixtures) .to .have .all .keys('helloWorld', 'helpers', 'someClass');
      });

        it('also accepts an array with previous types', () => {
          const fixtures = packagefy(baseDir, {
            exclude: [
                      'some-class',
                      /^help/,
                       (fileName) => fileName.indexOf('private') >= 0]
          });

        expect(fixtures) .to .have .all .keys('helloWorld');
      });

        it('does not accept any other parameter type', () => {
          expect( () => {
            packagefy(baseDir, {
              exclude: 12
            });
          })
          .to .throw(TypeError, 'The exclude option expects a `String`, a `RegExp`, a `Function` or an array of them');
        });
        
  });

  describe('when the option `onLoad` is passed', () => {
    
    it('throws an error if the value is not a function', () => {
    expect(() => {
      packagefy(baseDir, {
        onLoad: 'not valid'
      });
    })
      .to .throw(TypeError, 'The option `onLoad` must be a function');
        
    });
    
    it('calls the function after each module being loaded', () => {
      var times = 0;
      
      packagefy(baseDir, {
exclude: /private/,
onLoad: () => times++
      });
      
      expect(times) .to .be .equal(3);
    });

    it('passes the module name and the module itself to the function', () => {
      const moduleNames = [];
      
      packagefy(baseDir, {
exclude: /private/,
onLoad (moduleName, module) {
  expect(module) .to .exist; // jshint ignore:line
  moduleNames.push(moduleName);
}
      });
      
      expect(moduleNames) .to .contain('hello-world');
      expect(moduleNames) .to .contain('helpers');
      expect(moduleNames) .to .contain('some-class');
    });
    
  });

  describe('when the option `transform` is passed', () => {
    
    it('throws an error if the value is not a function', () => {
    expect(() => {
      packagefy(baseDir, {
        transform: 'not valid'
      });
    })
      .to .throw(TypeError, 'The option `transform` must be a function');
        
    });

    it('allow customizing the module names transformation', () => {
      const fixtures = packagefy(baseDir, {
        exclude: [/private/, 'helpers'],
        transform: _.snakeCase
        });
        
      expect(fixtures) .to .have .all .keys('hello_world', 'some_class');
    });
    
  });
  
});
