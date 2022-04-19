const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(bodyParser.json())

const redis = require("./redis-controller")

app.get("/ping", (req, res) => {
    res.json("pong")
})

app.get("/", (req, res) => {
    const {key} = req.query

    try {
        redis.get(key).then((message => {
            res.json(message)
        }))
    }
    catch (e) {
        res.send(e)
    }
  });

  app.post("/", (req, res) => {
    redis.add(req.body)

    res.status(201).send("");
  });

  app.delete("/", (req, res) => {
      res.send(redis.flushAll())
  })

app.listen(5050, (err) => {
    console.log("Listening");
  });