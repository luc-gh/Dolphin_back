const mongoose = require('mongoose');
const User = require('src/models/User');

let schema = new mongoose.Schema({
    autor: {type: User, unique: true, required: true, ref: 'User'},
    titulo: {type: String, maxLength: 40},
    corpo: {type: String, maxLength: 400, select: false},
    data: {type: Date, default: Date.now()},
    status: {
        type: [String],
        default: ['normal'],
        enumerable: ['normal', 'favorita', 'oculta'],
        validate: {
            validator: function (array) {
                if (array.length === 0) {
                    array.push('normal');
                }
                return array.length > 0;
            }, message: 'Ao menos um valor deve ser especificado'
        }
    }
}, {
    timestamps: true,
    safe: true
});

let note = mongoose.model('Note', schema);
module.exports = note;