import {pool} from '../db.js';

export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM employee")
        res.send(rows)
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
}

export const getEmployee = async (req, res) => {
    const {id} = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [id])

        if(rows.length <= 0) return res.status(404).send("Employee not found")

         res.send(rows[0])
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
}

export const createEmployees=  async (req, res) => {
    const {name, salary} = req.body;
    try {
        const [rows] = await pool.query("INSERT INTO employee (name, salary) VALUES (?, ?)", [name, salary] )
        res.send({
            id: rows.insertId,
            name,
            salary
        })
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
}

export const deleteEmployees = async (req, res) => {
    const {id} = req.params;
    try {
        const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [id])

        if(result.affectedRows <= 0) return res.status(404).send("Employee not found");
        console.log(result);
        res.send("Employee deleted successfully");
    } catch (error) {
        return res.status(500).send("Internal Server errir");
    }
}

export const updateEmployees = async (req, res) => {
    const {id} = req.params;
    const {name, salary} = req.body;
    try {
        const [result] = await pool.query("UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?", [name, salary, id])

        if(result.affectedRows <= 0) return res.status(404).send("Employee not found");

        const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [id])

        res.send(rows)
   } catch (error) {
        return res.status(500).send("Internal Server Error");
   }
}   

