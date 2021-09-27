const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
    {
        task_type: String,
        tittle: String,
        description: String,
        suburb: String,
        date: String,
        budget_type: String,
        budget_number: String
    }
)

module.exports = mongoose.model("Task", taskSchema)