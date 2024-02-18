const express = require("express");
const { DB } = require("../db/db");

const router = express.Router()
const db = new DB()

router.get('/translations', async (req, res) => {
    let results = await db.getTranslations()
    results = await results.toArray()

    res.status(200).send({
        status: 200,
        results: results
    })
});

router.post('/translation/add', async (req, res) => {
    const { regular, morse } = req.body
    await db.insertData([
        {
        regular: regular,
        translation: morse
        }
    ]);

    res.status(201).send({
        status: 201,
        message: "Translation successfully added!"
    })
});

module.exports = {
    router
}