//modules
const {src, watch, dest, parallel} = require("gulp");
const plumberV = require("gulp-plumber");
const sassV = require("gulp-sass")(require("sass"));

//images
const cacheV = require("gulp-cache");
const imageminV = require("gulp-imagemin");
const webpV = require("gulp-webp");
const avifV = require("gulp-avif");

//functions
function css(done){

    src("./src/scss/**/*.scss")
    .pipe(plumberV())
    .pipe(sassV())
    .pipe(dest("./public/build/css/"));

    done();

}

function js(done){

    src("./src/js/**/*.js")
    .pipe(plumberV())
    .pipe(dest("./public/build/js/"));

    done();

}

function images(done){

    optimization = {
        optimizationLevel : 3
    }

    quality = {
        quality : 50
    }

    src("./src/images/**/*.{jpg,jpeg,png}")
    .pipe(plumberV())
    .pipe(webpV(quality))
    .pipe(dest("./public/build/images/"));

    src("./src/images/**/*.{jpg,jpeg,png}")
    .pipe(plumberV())
    .pipe(avifV(quality))
    .pipe(dest("./public/build/images/"));

    src("./src/images/**/*.{jpg,jpeg,png}")
    .pipe(plumberV())
    .pipe(cacheV(imageminV(optimization)))
    .pipe(dest("./public/build/images/"));

    src("./src/images/**/*.svg")
    .pipe(dest("./public/build/images/"));

    done();

}

function dev(done){

    watch("./src/scss/**/*.scss", css);
    watch("./src/js/**/*.js", js);
    
    done();
    
}

//exports
exports.DEV = parallel (dev,images);