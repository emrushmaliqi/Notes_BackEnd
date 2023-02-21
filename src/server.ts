const express = require("express")


// express app
const app = express()


// listen for request

app.listen(3000, () => {
    console.log("listening on port 4000")
})

app.get("/", (req, res) => {
    res.json({msg: "Welcome to the app"})
}) 