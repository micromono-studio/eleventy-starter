module.exports = {
    env: process.env.ELEVENTY_ENV,
    is_production: process.env.ELEVENTY_ENV == 'production',
    is_dev: process.env.ELEVENTY_ENV == 'development'
}