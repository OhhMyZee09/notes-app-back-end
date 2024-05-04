// * Membuat server npm install @hapi/hapi
const Hapi = require('@hapi/hapi');
const routes = require('./routes')

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: true,
            // {
            //     origin: ['*'],
            // },
        },
    });

    server.route(routes); // * untuk routing

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init(); 

const zee = "Zikri rivandi"


// TODO NOTE : 
// * Nodemon : dengan tools ini kita tak perlu menjalankan ulang server ketika terjadi perubahan pada berkas JavaScript. Nodemon akan mendeteksi perubahan kode JavaScript dan mengeksekusi ulang secara otomatis.
// * ESLint dapat mengevaluasi kode yang dituliskan berdasarkan aturan yang Anda terapkan. Anda bisa menuliskan aturannya secara mandiri atau menggunakan gaya penulisan yang sudah ada seperti AirBnb JavaScript Code Style, Google JavaScript Code Style, dan StandardJS Code Style.
// * npx eslint --init : melakukan konfigurasi sebelum digunakan
// * ubah ke package.json code dibawah
/*
"scripts": {
    "start": "nodemon ./src/server.js",
    "lint": "eslint ./src"
}, 
*/

// * Cross-origin resource sharing (CORS) : mekanisme untuk menghubungkan antar origin berkomunikasi
// * response.header('Access-Control-Allow-Origin', '*'); '*' agar bisa akses semua origin
// * response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com'); Untuk akses origin dicoding

// * Konsumsi dan gabungkan data
/* Supaya layanan bisa saling berkomunikasi, kita harus menemukan IP address, 
DNS, atau Port yang ada di server terlebih dahulu. Setelah itu, 
barulah ia dapat berkomunikasi antar layanan menggunakan protokol HTTP, RPC, dan AMQP.


*/
// * token PAT 2 BULAN GITHUB : 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