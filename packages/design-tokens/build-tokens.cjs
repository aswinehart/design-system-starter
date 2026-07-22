const StyleDictionary = require('style-dictionary').default;

const COMPANY_PREFIX = 'acme';

StyleDictionary.registerTransform({
  name: 'name/with-company-prefix',
  type: 'name',
  transform: token => `${COMPANY_PREFIX}-${token.path.join('-')}`,
});

StyleDictionary.registerTransform({
  name: 'name/with-company-prefix-camel',
  type: 'name',
  transform: token => {
    const parts = [COMPANY_PREFIX].concat(token.path.map((p) => String(p)));
    const pascal = parts
      .map((p, i) => {
        if (i === 0) return String(p);
        return String(p).charAt(0).toUpperCase() + String(p).slice(1);
      })
      .join('');
    return String(pascal).charAt(0).toLowerCase() + String(pascal).slice(1);
  },
});

const sd = new StyleDictionary({
  source: ['tokens/core.json'],
  platforms: {
    js: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested'
        }
      ]
    },
    json: {
      transformGroup: 'web',
      transforms: ['attribute/cti', 'name/with-company-prefix'],
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.flat.json',
          format: 'json/flat'
        }
      ]
    }
    ,
    flutter: {
      transformGroup: 'flutter',
      buildPath: 'dist/flutter/',
      files: [
        {
          destination: 'style_dictionary.dart',
          format: 'flutter/class.dart',
          options: {
            className: `${COMPANY_PREFIX.charAt(0).toUpperCase() + COMPANY_PREFIX.slice(1)}Tokens`
          }
        }
      ]
    }
  }
});

sd.buildAllPlatforms();
