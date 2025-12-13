const Works = require('../../works/models/works.model');

// GET 
exports.getAllWorks = (req, res) => {
    Works.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
}

// GET by ID
exports.getWorkById = (req, res) => {
    const id = req.params.id;
    Works.getById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Work not found' });
        res.json(results[0]);
    });
};

// POST
exports.createWork = (req, res) => {
    const data = req.body;

    if (req.file) {
    data.foto = req.file.filename;
    }

    let kategori = 'Foto';
    if (data.link_video && data.link_video !== '') {
        kategori = 'Video';
    } else if (
        data.judul?.toLowerCase().includes('animasi') ||
        data.deskripsi?.toLowerCase().includes('animasi')
    ) {
        kategori = 'Animasi';
    }

    data.kategori = kategori;

    Works.create(data, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Work created', id: results.insertId, ...data });
    });
};

// PUT
exports.updateWork = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (req.file) {
    data.foto = req.file.filename;
    }
    let kategori = 'Foto';
    if (data.link_video && data.link_video !== '') {
        kategori = 'Video';
    } else if (
        data.judul?.toLowerCase().includes('animasi') ||
        data.deskripsi?.toLowerCase().includes('animasi')
    ) {
        kategori = 'Animasi';
    }

    data.kategori = kategori;

    Works.update(id, data, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Work not found' });
        res.json({ message: 'Work updated', id, ...data });
    });
};

// DELETE
exports.deleteWork = (req, res) => {
    const id = req.params.id;
    Works.delete(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Work not found' });
        res.json({ message: 'Work deleted', id });
    });
};
