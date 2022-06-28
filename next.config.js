const { ASSET_HOST } = process.env

const assetPrefix = ASSET_HOST || ''
module.exports = {
    assetPrefix,
    target: 'serverless',
    webpack: (config, { dev }) => {
        config.output.publicPath = `${assetPrefix}${config.output.publicPath}`
        return config
    },
}
