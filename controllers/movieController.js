import configModel from "../models/index.js";
const movieModel = configModel.movie;

/**
 * Create CRUD controller for movie
 */

// Get all movies
export const getAllMovies = async (req, res) => {
    try {
        const movies = await movieModel.find();
        const { judul } = req.query;

        if (judul) {
            const filteredMovie = movies.filter((movie) => movie.judul.toLowerCase().split(" ").includes(judul.toLowerCase()))

            if (!filteredMovie.length) {
                return res.status(404).json({ 
                    message: "Movie not found",
                });
            }
            return res.status(200).json({
                message: "Success",
                data: filteredMovie,
            });
        }
        return res.status(200).json({
            message: "Success",
            data: movies,
        });
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get movie by id
export const getMovieById = async (req, res) => {
    try {
        const movies = await movieModel.findById(req.params.id);
        if (!movies) {
            return res.status(404).json({ 
                message: "Movie not found",
             });
        }
        return res.status(200).json({
            message: "Success",
            data: movies,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new movie
export const createMovie = async (req, res) => {
    const movie = req.body;
    const newMovie = new movieModel(movie);
    try {
        await newMovie.save();
        return res.status(201).json({
            message: "Success",
            data: newMovie,
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Update movie by id
export const updateMovieById = async (req, res) => {
    try {
        const data = req.body;
        const movie = await movieModel.findById(req.params.id);
        if (movie) {
            movie.judul = data.judul;
            movie.direktor = data.direktor;
            movie.aktor = data.aktor;
            movie.tahun = data.tahun;
            movie.genre = data.genre;
            movie.deskripsi = data.deskripsi;
            const updateMovie = await movie.save();
            return res.status(200).json({
                message: "Success",
                data: updateMovie,
            });
        } else {
            return res.status(404).json({ message: "Movie not found" });
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Delete movie by id
export const deleteMovieById = async (req, res) => {
    try {
        const movie = await movieModel.findById(req.params.id);
        if (movie) {
            await movie.remove();
            return res.status(200).json({ message: "Movie deleted" });
        } else {
            return res.status(404).json({ message: "Movie not found" });
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};