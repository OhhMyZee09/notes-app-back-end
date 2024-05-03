const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler, // * menambahkan data baru/ CREATE
        // * Penerapan Cross Origin untuk komunikasi antar origin
        // options: {
        //     cors: { 
        //         origin: ['http://notesapp-v1.dicodingacademy.com'],
        //     },
        // },
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler, // * mengambil data note/READ
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler, //* mengambil data note setiap id nya/READ
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler, // * mengubah note/UPDATE
    },
    {
        method:'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler, //* menghapus data note/DELETE
    }   
];

module.exports = routes;