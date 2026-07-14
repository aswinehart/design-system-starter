const StyleDictionary = require('style-dictionary').default;

const COMPANY_PREFIX = 'mri';

const sd = new StyleDictionary({
  source: ['tokens/core.json'],
  hooks: {
    transforms: {
      'name/with-company-prefix': {
        type: 'name',
        transform: token => `${COMPANY_PREFIX}-${token.path.join('-')}`
      }
    }
  },
  platforms: {
    js: {
      transformGroup: 'js',
      buildPath: 'src/',
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
      buildPath: 'src/',
      files: [
        {
          destination: 'tokens.flat.json',
          format: 'json/flat'
        }
      ]
    }
  }
});

sd.buildAllPlatforms();
