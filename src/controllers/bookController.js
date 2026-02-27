const axios = require("axios");

const searchBooks = async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: "La query es requerida" });
    }

    try {
        const response = await axios.get(
            `https://openlibrary.org/search.json?q=${q}`,
        );

        const books = response.data.docs.slice(0, 10).map(book => ({
            externalId: book.key,
            title: book.title,
            author: book.author_name ? book.author_name.join(", ") : "Desconocido",
            coverImage: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null,
            releaseYear: book.first_publish_year || null,
            externalSource: "OpenLibrary",
            language: book.language ? book.language[0] : null
        }))

        res.json(books);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error al buscar libros" });
    }
};

module.exports = {
    searchBooks
};