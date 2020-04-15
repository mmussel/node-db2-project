const express = require('express');
const knex = require('knex');

const knexfile = require('../knexfile.js');

const db = knex(knexfile.development);

const router = express.Router();

router.get("/", (req, res) => {
    db.select("*")
    .from("cars")
    .then(cars => {
        res.status(200).json(cars)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
    })
});

router.get("/:id", (req, res) => {
    db("cars")
    .where({ id: req.params.id })
    .first()
    .then(car => {
        if (car) {
            res.status(200).json({ data: car })
        } else {
            res.status(404).json({ error: "car not found" })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message })
    })
});

router.post("/", (req, res) => {
    db("cars")
    .insert(req.body)
    .then(car => {
        res.status(201).json(car)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
    })
})

module.exports = router;