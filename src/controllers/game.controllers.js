import { db } from "../database/database.connection.js";

export async function listGame(req, res) {
  try {
    const list = await db.query(`
    SELECT * FROM games
    `);

    res.send(list.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const gameExist = await db.query("SELECT * FROM games WHERE name = $1", [
      name,
    ]);
    if (gameExist.rowCount > 0) {
      return res.sendStatus(409);
    }
    const list = await db.query(`
    SELECT * FROM games
    `);

    let gameId = 1;
    if (list.rows.length !== 0) {
      gameId = list.rows[list.rows.length - 1].id + 1;
    }

    const game = await db.query(
      `
    INSERT INTO games(id, name, image, "stockTotal", "pricePerDay")
    VALUES ($1, $2, $3, $4, $5);`,
      [gameId, name, image, stockTotal, pricePerDay]
    );

    console.log(game);

    res.send(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
