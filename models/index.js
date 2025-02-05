import configDB from "../config/dbConfig.js";
import mongoose from "mongoose";
import movieModel from "./movie.js";

const configModel = {
    mongoose,
    url: configDB.url,
    movie: movieModel,
};

export default configModel;