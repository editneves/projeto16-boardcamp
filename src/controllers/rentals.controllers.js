import { db } from "../database/database.connection.js";

export async function listRentals(req, res) {
  try {
    const listRentals = await db.query(`
    SELECT
    rentals.*,
    json_build_object('id', customers.id, 'name', customers.name) AS customer,
    json_build_object('id', games.id, 'name', games.name) AS game
  FROM
    rentals
    JOIN customers ON rentals."customerId" = customers.id
    JOIN games ON rentals."gameId" = games.id;
  `);
    res.send(listRentals.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const customerIdExist = await db.query(
      "SELECT * FROM customers WHERE id = $1",
      [customerId]
    );
    if (!customerIdExist.rowCount > 0) {
      return res.sendStatus(400);
    }

    const gameIdExist = await db.query("SELECT * FROM games WHERE id = $1", [
      gameId,
    ]);
    if (!gameIdExist.rowCount > 0) {
      return res.sendStatus(400);
    }

    const list = await db.query(`
      SELECT * FROM rentals
      `);

    let rentalsID = 1;
    if (list.rows.length !== 0) {
      rentalsID = list.rows[list.rows.length - 1].id + 1;
    }
    const rental = await db.query(
      `
    INSERT INTO rentals (id,"customerId", "gameId", "daysRented", "rentDate", "originalPrice")
    VALUES ($1, $2, $3, $4, NOW(), (SELECT "pricePerDay" FROM games WHERE id = $1) * $3);
    `,
      [rentalsID, customerId, gameId, daysRented]
    );

    console.log(rental);

    res.send(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
