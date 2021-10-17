import { Client, Pool } from 'pg';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const db_config = {
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT
};

const queryDB = async (query) => {
  const client = new Client(db_config);
  await client.connect();

  try {
    const { rows } = await client.query(query);
    await client.end();
    return rows;
  } catch (e) {
    await client.end();
    console.error(e);
    throw e;
  }

}

export const getProducts = () => {
  return queryDB('SELECT p.id, p.title, p.description, p.price, p.image_url as image, s.count FROM products p JOIN stocks s ON p.id = s.product_id');
}

export const getProductById = (id) => {
  return queryDB({
    text: 'SELECT p.id, p.title, p.description, p.price, p.image_url as image, s.count FROM products p JOIN stocks s ON p.id = s.product_id WHERE p.id = $1',
    values: [id]
  });
}

export const createProduct = async ({ title, description, price, image, count }) => {
  const pool = new Pool(db_config);
  const client = await pool.connect();
  let createdProduct;

  try {
    await client.query('BEGIN');
    const insertedData = await client.query({
      text: 'INSERT INTO products(title, description, price, image_url) VALUES($1, $2, $3, $4) RETURNING id',
      values: [title, description, price, image]
    });

    const { id } = insertedData.rows[0];

    await client.query({
      text: 'INSERT INTO stocks (product_id, count) VALUES ($1, $2)',
      values: [id, count]
    });

    await client.query('COMMIT');

    createdProduct = { id, title, description, image, count, price};
  } catch (e) {
    console.error('product was not created', JSON.stringify(e));
    await client.query('ROLLBACK');
    throw { statusCode: 400, message: 'invalid product data' };
  } finally {
    client.release();
  }

  await pool.end();

  return createdProduct;
}