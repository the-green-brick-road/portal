/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# React app rewired configuration
# -------------------------------------------------------
# Nadège LEMPERIERE, @18 may 2023
# Latest revision: 18 may 2023
# ---------------------------------------------------- */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function override(config, env) {

    config.plugins.push(

      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      })

    );

    const oneOfLoc = config.module.rules.findIndex(n => n.oneOf);
    config.module.rules[oneOfLoc].oneOf = [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      ...config.module.rules[oneOfLoc].oneOf
    ];

    return config;

  }