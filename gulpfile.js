//modules
const {src, watch, dest, parallel} = require("gulp");
const plumberV = require("gulp-plumber");
const sassV = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");
const rename = require("gulp-rename");

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
    cssbuild();
    done();

}

function cssbuild(done){

    src("./public/build/css/app.css")
    .pipe( rename({
        suffix: ".min"
    }))
    .pipe(purgecss({
        content: ["index.html"]
    }))
    .pipe(dest("./public/build/css"));

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
    watch("./public/build/css/app.css", cssbuild);
    
    done();
    
}

//exports
exports.DEV = parallel (dev,images);