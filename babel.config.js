module.exports = function (api) {
  api.cache(true);

  const presets = [
    ['@babel/env', { targets: { node: "8.15" } }],
  ];
  const plugins = [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread'
  ];

  return {
    presets,
    plugins
  };
}