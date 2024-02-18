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

router.delete('/translation/delete', async (req, res) => {
    const id = req.body.id

    try {
        const result = await db.deleteData(id)
        if(result.deletedCount === 1) {
            res.status(200).send({
                status: 200,
                message: "Translation successfully deleted!"
            })
        } else {
            res.status(404).send({
                status: 404,
                message: "Translation not found!"
            })
        }
    } catch(error) {
        console.error("Error deleting translation:", error)
        res.status(500).send({
            status: 500,
            message: "Error occurred deleting translation!"
        })
    }
})

module.exports = {
    router
}