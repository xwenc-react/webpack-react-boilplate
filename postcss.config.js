module.exports = {
    plugins: [
        require('autoprefixer')(),
        require("postcss-cssnext")(),
        require("css-declaration-sorter")({
            order: "concentric-css"
        }),
        require("css-mqpacker")(),
    ]
};