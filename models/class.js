import mongoose from 'mongoose'

const classSchema = new mongoose.Schema(
    {
        className: {
            type: String,
            required: true
        },
        createdBy: String,
        participants: [{
            studentName: String,
            studentMatricNumber: String,
            studentCourse: String,
            studentLevel: String,
            time: String
        }]
    },
    { timestamps: true } //This stores the createdAt and updatedAt time of the model
)

const Class = new mongoose.model('Class', classSchema)

export default Class