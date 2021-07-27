const path = require('path')
const esbuild = require('esbuild')
const alias = require('esbuild-plugin-alias');
const glslxPlugin = require('esbuild-plugin-glslx')
const sassPlugin = require('esbuild-plugin-sass')
const postCssPlugin = require('@deanc/esbuild-plugin-postcss')
const autoprefixer = require('autoprefixer')


module.exports = () => {
  const IS_PRODUCTION = process.env.ELEVENTY_ENV == 'production'
  const IS_DEV = !IS_PRODUCTION

  console.log(path.join(__dirname, ''))
  
  return esbuild.build({
    entryPoints: ['src/site/styles/index.scss', 'src/site/scripts/main.js'],
    define: {
      IS_DEV,
      IS_PRODUCTION
    },
    bundle: true,
    outdir: 'public/',
    sourcemap: IS_DEV,
    target: ['es2018'],
    external: ['/assets/*'],
    plugins: [
        alias({
          'micro-core': path.join(__dirname, 'src/site/scripts/micro-core/index.js'),
          '$modules': path.join(__dirname, 'src/site/scripts/modules/*'),
          '$components': path.join(__dirname, 'src/site/scripts/components/*')
        }),
        sassPlugin(),
        postCssPlugin({
          plugins: [autoprefixer]
      }),
      glslxPlugin(),
    ],
    minify: IS_PRODUCTION,
    // watch: IS_DEV,
  }).then(() => {
    console.log('Watching files...')
  }).catch((e) => console.error(e.message))
}