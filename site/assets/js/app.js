try {
    window.$ = window.jQuery = require('jquery');
} catch (e) {}
require('script-loader!./scripts/vehicle')
require('script-loader!./scripts/utils')
require("../sass/style.scss")
