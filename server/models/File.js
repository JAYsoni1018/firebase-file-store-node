const mongoose = require("mongoose");


const fileSchema = new mongoose.Schema(

    {
        fileUrl: {
            type: String,
            required: true
        },
        videoUrl: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }



)
const File = mongoose.model("File", fileSchema);

module.exports = File;