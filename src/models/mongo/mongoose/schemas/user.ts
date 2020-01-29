import { Schema } from 'mongoose';
import validator from 'validator';

export default new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        minlength: 2,
        maxlenght: 255,
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        maxlength: 255,
        validate: [validator.isEmail, 'User email is invalid'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minlength: 8,
    },
});
