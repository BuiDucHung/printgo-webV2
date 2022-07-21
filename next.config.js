const { ASSET_HOST } = process.env
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();
 
const withNextEnv = nextEnv();

const assetPrefix = ASSET_HOST || ''
module.exports = {
    assetPrefix,
    target: 'serverless',
    webpack: (config, { dev }) => {
        config.output.publicPath = `${assetPrefix}${config.output.publicPath}`
        return config
    },
    withNextEnv,
    parserOpts: { strictMode: true },
}
