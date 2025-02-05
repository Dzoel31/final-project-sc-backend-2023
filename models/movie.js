import mongoose from 'mongoose';

const movieSchema = mongoose.Schema(
    {
        judul: String,
        direktor: String,
        aktor: [String],
        tahun: Number,
        genre: String,
        deskripsi: String,
    },
    { timestamps: true }
);

movieSchema.methods.toJSON = function () {
    const {_id, ...Object} = this.toObject();
    Object.id = _id;
    return Object;  
};

const movieModel = mongoose.model("movie", movieSchema);

export default movieModel;
