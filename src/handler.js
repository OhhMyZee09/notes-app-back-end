const nanoid = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    // * function untuk handler ketika note ditambahkan
    const {title, tags, body} = request.payload;

    const id = nanoid(16) // * 16 ukuran untuk string
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // * sekarang simpan properti diatas ke dalam berkas notes
    const newNotes = {
        title, tags, body, id, createdAt, updatedAt
    };

    notes.push(newNotes); //* masukan data ke file notes.js

    // * untuk memastikan data masuk ke notes.js
    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            }
        });
        response.code(201); // * Created
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan'
    });
    response.code(500); //* server wrong
    return response;

}

// * handler untuk ambil semua note 
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

// * handler untuk ambil detail notes setiap id-nya
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((n) => n.id === id)[0];

    // * pastikan nilai note tidak undefined
    if(note !== undefined){
        return {
            status: 'success',
            data: {
                note,
            },
        }
    };

    const response = h.response({
        status : 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

// * Method handler untuk mengubah data catatan
const editNoteByIdHandler = (request, h) => { //* ambil setiap id catatan yg mau diubah
    const { id } = request.params;
    // * lalu dapatkan data note baru dari user/client
    const { title, tags, body } = request.payload;
    // * Perbarui nilai updatedAt untuk update waktu saat note diubah
    const updatedAt = new Date().toISOString();

    // * update data dengan indexing array
    const index = notes.findIndex((note) => note.id === id);
    // * validasi saat data tidak ditemukan (-1)
    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404); //* not found
    return response;
};

// * Method Menghapus data notes
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params; //* ambil id data yg mau dihapus
    const index = notes.findIndex((note) => note.id === id); // * ambil indeksnya
    // * validasi saat data ditemukan dan pakai method arr.slice untuk hapus indeks pada array
    if(index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { 
    addNoteHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler, 
    editNoteByIdHandler,
    deleteNoteByIdHandler
};

// TODO NOTE : 
// * properti id merupakan string dan harus unik, kita akan menggunakan bantuan 
// * library pihak ketiga untuk menghasilkan nilainya. nanoid merupakan salah satu library yang populer untuk menangani ini. 
// * npm install nanoid@3 (https://github.com/ai/nanoid)

// * createdAt dan updatedAt
/* 
createdAt dan updatedAt. Karena kasus sekarang adalah menambahkan catatan baru, 
maka nilai kedua properti tersebut seharusnya sama. 
Jadi, kita bisa secara mudah memberikan nilai new Date().toISOString();
*/