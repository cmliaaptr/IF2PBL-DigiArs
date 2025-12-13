const db = require('../db');

// Model untuk tabel 'works'
const Works = {
    // Mendapatkan semua karya
    getAll: (callback) => {
        db.query('SELECT * FROM works', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM works WHERE id = ?', [id], callback);
    },

    create: (data, callback) => {
        db.query('INSERT INTO works (kategori, foto, link_video, judul, deskripsi) VALUES (?, ?, ?, ?, ?)',
            [data.kategori, data.foto, data.link_video, data.judul, data.deskripsi],
            callback
        );
    },

    update: (id, data, callback) => {
        db.query('UPDATE works SET kategori = ?, foto = ?, link_video = ?, judul = ?, deskripsi = ? WHERE id = ?',
            [data.kategori, data.foto, data.link_video, data.judul, data.deskripsi, id],
            callback
        );
    },

    delete: (id, callback) => {
        db.query('DELETE FROM works WHERE id = ?', [id], callback);
    }
    
};

module.exports = Works;