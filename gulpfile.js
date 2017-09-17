
//init gulp
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//kompilasi SASS file
gulp.task('sass',()=>{
	//kembalikan sumber scss ke folder kompilasi di `src/scss`
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
		.pipe(sass())
		.pipe(gulp.dest('src/css')) //masukan ke dalam directory `src/css`
		.pipe(browserSync.stream());
});

//pindahkan JS file ke directory /src
gulp.task('js', ()=>{
	//kembalikan file JS yang dibutuhkan Bootstrap 4
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'
		,'node_modules/popper.js/dist/umd/popper.min.js'])
	.pipe(gulp.dest('src/js')) //masukan ke dalam directory `src/js`
	.pipe(browserSync.stream());
});

//Watch SASS & serve
gulp.task('serve', ['sass'], ()=>{
	// inisialisasi lokasi file untuk di serve
	//mengacu ke directoy /src => index.html
	browserSync.init({
		server: './src'
	});

	//lihat file SASS pada modules
	gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],['sass']);
	//ketika file apapun berekstensi html di ubah, reload dengan broserSync
	gulp.watch('src/*.html').on('change', browserSync.reload);
});

//nama task adalah `fonts` bertugas untuk memindahkan semua file fonts pada module
//ke directory /src/fonts
gulp.task('fonts',()=>{
	return gulp.src('node_modules/font-awesome/fonts/*')
	.pipe(gulp.dest('src/fonts'));
});

//pindahkan font-awesome css file dari node modules ke src folder
gulp.task('fa', ()=>{
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
	.pipe(gulp.dest('src/css'));
});

//task default adalah task yang aktif saat gulp dirunning
//array berisikan nama task yang sudah dibuat sebelumnya
gulp.task('default', ['js','serve','fa','fonts']);