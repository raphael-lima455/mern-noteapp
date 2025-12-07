import mongoose from 'mongoose'

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Note = mongoose.model('Note', NoteSchema)

export default Note;