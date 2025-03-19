import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    try {
        const unhashed = jwt.verify(token, process.env.JWT_SECRET);
        req.user = unhashed;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

export { verifyToken };
