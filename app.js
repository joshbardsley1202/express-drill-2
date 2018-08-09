const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 9000
const csvToJson = require("convert-csv-to-json")
const instructorData = csvToJson.fieldDelimiter(",").getJsonFromCsv("instructors.csv")

app.use(cors())

function findById(data,id) {
    for(let i = 0;i < data.length; i++) {
        let idString = data[i].ID.toString()
        if(idString === id) {
            return data[i]
        }
    } return null
}

app.get("/",(req,res,next) => {
    res.json({instructorData: instructorData})
})

app.get("/:id",(req,res,next) => {
    const instructors = findById(instructorData,req.params.id)
    if (!instructors) {
        res.status(404).send({
            error: {
                message: "No record found!"
            }
        })
    } else {
        res.json({instructorData: instructors})
    }
})

app.listen(port, () => {
    console.log(`I am listening on ${port}`)
})