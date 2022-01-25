const pool = require('../utils/pool');

module.exports = class Movie {
  id;
  title;
  releaseYear;
  director;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.releaseYear = row.release_year;
    this.director = row.director;
  }

  static async insert({ title, release_year, director }) {
    const { rows } = await pool.query(
      `
      INSERT INTO movies (title, release_year, director) VALUES ($1, $2, $3)
      RETURNING *`,
      [title, release_year, director]
    );
    return new Movie(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM movies WHERE id=$1;`,
      [id]
    );
    if (!rows[0]) return null;
    return new Movie(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM movies`);

    return rows.map((movie) => new Movie(movie));
  }
  static async updateById(id, { title, release_year, director }) {
    const { rows } = await pool.query(
      `
   UPDATE movies SET title=$2, release_year=$3, director=$4 WHERE id=$1 RETURNING *;`,
      [id, title, release_year, director]
    );
    return new Movie(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM movies WHERE id=$1 RETURNING *`,
      [id]
    );
    return new Movie(rows[0]);
  }
};
