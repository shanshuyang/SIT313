const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
    {
        Key: String,
        task_type: String,
        tittle: String,
        description: String,
        image: String,
        suburb: String,
        date: String,
        budget_type: String,
        budget_number: String
    }
)

module.exports = mongoose.model("Task", taskSchema)