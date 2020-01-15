module.exports = {
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.s?css$': 'identity-obj-proxy',
  },
  setupTestFrameworkScriptFile: '<rootDir>/enzyme.js',
  setupFiles: ['<rootDir>/jsdom.setup.js'],
  globals: {
    DEBUG: false,
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
