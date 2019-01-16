export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
};
