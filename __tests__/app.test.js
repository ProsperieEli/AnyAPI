const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Movie = require('../lib/models/Movie');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a Movie', async () => {
    const res = await request(app).post('/api/v1/movies').send({
      title: 'Spider-Man',
      release_year: 2020,
      director: 'someone',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Spider-Man',
      releaseYear: 2020,
      director: 'someone',
    });
  });

  it('should get by id', async () => {
    const movie = await Movie.insert({
      title: 'Infinity War',
      release_year: 2018,
      director: 'someone',
    });
    const res = await request(app).get(`/api/v1/movies/${movie.id}`);

    expect(res.body).toEqual(movie);
  });

  it('should get all movies', async () => {
    const movie = await Movie.insert({
      title: 'Infinity War',
      release_year: 2018,
      director: 'someone else',
    });
    const res = await request(app).get('/api/v1/movies');
    expect(res.body).toEqual([movie]);
  });

  it('should update movie', async () => {
    const movie = await Movie.insert({
      title: 'Infinity War',
      release_year: 2018,
      director: 'someone else',
    });
    const res = await request(app).patch(`/api/v1/movies/${movie.id}`).send({
      title: 'Infinity War',
      release_year: 2018,
      director: 'Anthony Russo',
    });
    const expectedMovie = {
      id: expect.any(String),
      title: 'Infinity War',
      releaseYear: 2018,
      director: 'Anthony Russo',
    };
    expect(res.body).toEqual(expectedMovie);
    expect(await Movie.getById(movie.id)).toEqual(expectedMovie);
  });

  it('should delete', async () => {
    const movie = await Movie.insert({
      title: 'Infinity War',
      release_year: 2018,
      director: 'someone else',
    });
    const res = await request(app).delete(`/api/v1/movies/${movie.id}`);

    expect(res.body).toEqual(movie);
    expect(await Movie.getById(movie.id)).toBeNull();
  });
});
