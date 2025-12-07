import Note from "../models/Note.js"

export const noteAdd = async (req, res) => {
    try {
        const { title, description } = req.body
        const { name, id } = req.user

        const newNote = new Note({
            title: title,
            description: description,
            userID: id,
        })

        await newNote.save()

        return res.status(200).json({ success: true, message: 'Note created successfully.' })

    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Error in adding new note.' })
    }
}