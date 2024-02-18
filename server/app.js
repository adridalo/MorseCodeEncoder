const express = require("express");
const { router } = require("./routes/routes");
const { DB } = require("./db/db");
require("dotenv").config()
const port = process.env.PORT || 3000

const app = express();
app.use(express.static('../client/build'))
app.use(express.json())

app.use('/', router);

async function main() {
    try {
        const db = new DB()
        await db.connect('test', 'morse-translations');
    
        app.listen(port, () => {
            console.log("Listening on http://localhost:" + port)
        })
    } catch(err) {
        console.error(err);
        process.exit(1)
    }
}

main()