const rimraf = require("rimraf")
const htmlmin = require("./src/utils/htmlmin")
const esbuildConfig = require("./esbuild.config")

const OUTPUT = "public"

function clean() {
  rimraf.sync(OUTPUT)
}

module.exports = function (eleventy) {
  eleventy.on("beforeBuild", clean)
  eleventy.on("afterBuild", esbuildConfig)
  eleventy.addWatchTarget("./src/site/")
  eleventy.addPassthroughCopy({ "src/assets": "assets" })
  eleventy.addTransform("htmlmin", htmlmin)
  eleventy.addShortcode("hash", () => Date.now())

  const eleventyPackage = require("@11ty/eleventy/package.json")
  const liquidjs = require("liquidjs/package.json")
  console.log(
    `${eleventyPackage.name} v${eleventyPackage.version} includes ${liquidjs.name}@${liquidjs.version}`
  )

  return {
    dir: {
      input: "src/site/templates",
      data: "../data",
      includes: "includes",
      output: "public",
    },
  }
}
