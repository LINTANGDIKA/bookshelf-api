const {
    addbook,
    getAllBook,
    getBookById,
    editBook,
    deleteBook
} = require('./handling');



const router = [
    {
        method: 'POST',
        path: '/books',
        handler: addbook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBook,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookById,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBook,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBook,
    },
    {
        method: '*',
        path: '/{any*}',
        handler: () => 'Halaman tidak ditemukan',
    },
];



module.exports = router;