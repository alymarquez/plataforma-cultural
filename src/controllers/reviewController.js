const { Op } = require("sequelize");
const { User, Review, Work } = require("../models");

const createReview = async (req, res) => {
    const {
        externalId,
        title,
        coverImage,
        releaseYear,
        language,
        type,
        rating,
        content,
    } = req.body;

    try {
        // Buscar o crear la obra
        let work = await Work.findOne({ where: { externalId } });

        if (!work) {
            work = await Work.create({
                externalId,
                title,
                coverImage,
                releaseYear,
                language,
                type,
            });
        }

        const existingReview = await Review.findOne({
            where: {
                userId: req.userId,
                workId: work.id
            }
        })

        if (existingReview) {
            return res.status(400).json({
                message: "Ya hiciste una review para esta obra"
            });
        }

        const review = await Review.create({
            rating,
            content,
            userId: req.userId,
            workId: work.id,
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la reseña" });
    }
};

module.exports = {
    createReview,
};
