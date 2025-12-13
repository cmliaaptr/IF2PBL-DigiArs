export const authBearer = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Tidak ada authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Harus Bearer
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Bearer token required' });
    }

    // Ambil token
    const token = authHeader.split(' ')[1];

    // Token yang benar (misal hardcode)
    const VALID_TOKEN = 'DIGIARS2025';

    if (token !== VALID_TOKEN) {
        return res.status(403).json({ message: 'Invalid token' });
    }

    // Lanjut ke middleware berikutnya atau route handler
    next();
};