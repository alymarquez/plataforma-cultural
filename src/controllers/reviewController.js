const { Op } = require("sequelize");
const { User, Review, Work } = require("../models");

const createReview = async (req, res) => {
    try {
        const { userId, workId, rating, comment } = req.body;
        res.status(201).json( { message: "Reseña creada exitosamente" } );
    } catch (error) {
        res.status(500).json( { error: "Error al crear la reseña" } );
    }
}

module.exports = {
    createReview
};