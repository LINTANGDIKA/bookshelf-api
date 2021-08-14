const { nanoid } = require('nanoid');
const books = require('./books');

const addbook = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading, } = request.payload;
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);

        return response;
    }
    if (pageCount < readPage) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    const id = nanoid(10);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = (pageCount === readPage);
    const dataBooks = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };
    books.push(dataBooks);
    const success = books.filter((book) => book.id === id).length > 0;
    if (success) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        }).code(201);
        return response;
    } else {
        const response = h
            .response({
                status: 'fail',
                message: 'Buku gagal ditambahkan',
            })
            .code(500);
        return response;
    }
}
const getAllBook = (request, h) => {
    // const inisial
    let { name, reading, finished } = request.query;
    if (name) {
        return books.filter((book) => book
            .name.toLowerCase().includes(name.toLowerCase()))
    } else if (reading) {
        return reading.filter((book) => book
            .reading.toLowerCase().includes(reading.toLowerCase()))
    } else if (finished) {
        return finished.filter((book) => book
            .finished.toLowerCase().includes(finished.toLowerCase()))
    }

    if (books.length !== 0) {
        const response = h.response({
            status: 'success',
            data: {
                books: books.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: "success",
            data: {
                books: []
            }
        });
        response.code(200);
        return response;
    }

}
const getBookById = (request, h) => {
    // const inisial
    const { bookId } = request.params;
    const book = books.filter((b) => b.id === bookId)[0]
    if (books.length !== 0) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
}
const editBook = (request, h) => {
    // const inisial
    const { bookId } = request.params;
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === bookId);
    const finished = (pageCount === readPage);

    if (index !== -1) {
        if (!name) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }
        if (pageCount < readPage) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }


        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);

        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);

    return response;
};
const deleteBook = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((a) => a.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);

        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};
module.exports = {
    addbook,
    getAllBook,
    getBookById,
    editBook,
    deleteBook
}