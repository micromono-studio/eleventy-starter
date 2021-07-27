const Prismic = require('@prismicio/client')

const URL = 'https://nicklas.cdn.prismic.io/api/v2'

module.exports = () => Prismic.client(URL)