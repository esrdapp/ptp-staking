module.exports = {
  // Other webpack configuration options...

  module: {
    rules: [
      // Other rules...
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/", // Output directory for the SVG files
            },
          },
        ],
      },
    ],
  },
};
