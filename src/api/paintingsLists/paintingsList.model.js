const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { STYLES } = require("../../helpers/constants/styles");


const schema = new Schema({
    name: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    style: [{ type: String, enum: STYLES, required: true }],
    paintings: [{ type: Schema.Types.ObjectId, ref:"paintings"}],
    users: [{ type: Schema.Types.ObjectId, ref:"users"}]

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('paintingsList', schema);