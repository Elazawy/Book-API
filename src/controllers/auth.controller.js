import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { hashPassword } from '../services/password.service.js';
import { generateToken } from '../services/jwt.service.js';
import { BadRequestError } from '../errors/errors.errors.js';

const signup = async (req, res) => {
    try {
        const data = req.body;
        const email = data.email;
        const user = await User.findOne({ email: email });
        if (user) {
            throw new BadRequestError("User already exists");
        }
        const hashedPassword = await hashPassword(data.password);
        const newUser = new User({ ...data, password: hashedPassword });
        const token = generateToken(newUser.name, newUser.email, newUser._id);
        await newUser.save();
        res.status(200).json({
            data: newUser,
            token,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const data = req.body;
        const email = data.email;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new BadRequestError("Invalid password or email");
        }
        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) {
            throw new BadRequestError("Invalid password or email");
        }
        const token = generateToken(user.name, user.email, user._id);
        res.status(200).json({
            data: user,
            token,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export { signup, login };
