import { db } from "../database/database.connection.js";

export async function listCustomers(req, res) {
  try {
    const listCustomers = await db.query(`
    SELECT * FROM customers
    `);

    res.send(listCustomers.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function CustomersById(req, res) {
  const customerId = Number(req.params.id);

  try {
    const customer = await db.query("SELECT * FROM customers WHERE id = $1", [
      customerId,
    ]);
    if (customer.rowCount === 0) {
      return res.sendStatus(404);
    }
    res.send(customer.rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function createCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const cpfExist = await db.query("SELECT * FROM customers WHERE cpf = $1", [
      cpf,
    ]);
    if (cpfExist.rowCount > 0) {
      return res.sendStatus(409);
    }
    const list = await db.query(`
      SELECT * FROM customers
      `);

    let customerId = 1;
    if (list.rows.length !== 0) {
      customerId = list.rows[list.rows.length - 1].id + 1;
    }

    const customer = await db.query(
      `
      INSERT INTO customers(id, "name", "phone", "cpf", "birthday")
      VALUES ($1, $2, $3, $4, $5);`,
      [customerId, name, phone, cpf, birthday]
    );

    console.log(customer);

    res.send(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updateCustomers(req, res) {
  const customerId = Number(req.params.id)
  const { name, phone, cpf, birthday } = req.body

  try {
    const cpfExist = await db.query(
      "SELECT * FROM customers WHERE cpf = $1 AND id = $2",
      [cpf, customerId]
    );

    if (cpfExist.rows.length === 0) {
      return res.sendStatus(409);
    }

    const updateCustomer = await db.query(
      "UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5",
      [name, phone, cpf, birthday, customerId]
    )
    console.log(updateCustomer)
    if (updateCustomer.rowCount === 0) {
      return res.sendStatus(400)
    }
    res.sendStatus(200)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
