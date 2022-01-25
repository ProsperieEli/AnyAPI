const { Router } = require('express');
const Movie = require('../models/Movie');

module.exports = Router()
  .post('/', async (req, res) => {
    const movie = await Movie.insert({
      title: req.body.title,
      release_year: req.body.release_year,
      director: req.body.director,
    });

    res.json(movie);
  })

  .get('/', async (req, res) => {
    const movie = await Movie.getAll();

    res.json(movie);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.getById(id);

    res.json(movie);
  })

  .patch('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Movie.getById(id);
      const movie = await Movie.updateById(id, {
        title: req.body.title,
        release_year: req.body.release_year,
        director: req.body.director,
      });
      res.json(movie);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.delete(id);

    res.json(movie);
  });
