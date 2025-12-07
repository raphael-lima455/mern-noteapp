import Note from "../models/Note.js"

export const noteUpdate = async (req, res) => {
    try {

        const { id } = req.params

        const updateNote = await Note.findByIdAndUpdate(id, req.body)

        return res.status(200).json({ success: true, updateNote})

    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Cant update notes.' })
    }
}