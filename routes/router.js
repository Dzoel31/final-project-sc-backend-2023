import express from 'express';
import {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovieById,
    deleteMovieById,
} from '../controllers/movieController.js';

const router = express.Router();

router.get('/movies', getAllMovies);

router.get('/movies/:id', getMovieById);

router.post('/addMovies', createMovie);

router.put('/updateMovies/:id', updateMovieById);

router.delete('/deleteMovies/:id', deleteMovieById);

export default router;