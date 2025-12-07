import Note from "../models/Note.js"

export const noteDelete = async (req, res) => {
    try {

        const { id } = req.params

        const updateNote = await Note.findByIdAndDelete(id)

        return res.status(200).json({ success: true})

    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Failed to delete note.' })
    }
}