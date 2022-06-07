let mix = require('laravel-mix')

mix.setPublicPath('./')
    .sass('assets/css/popup.scss', 'dist/css')
    .js('assets/js/background.js', 'dist/js')
    .js('assets/js/popup.js', 'dist/js').vue()
    .copy('assets/icons/', 'dist/icons')
    .options({
        processCssUrls: false
    });