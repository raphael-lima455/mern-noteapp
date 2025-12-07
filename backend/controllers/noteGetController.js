import Note from "../models/Note.js"

export const noteGet = async (req, res) => {
    try {
        const note = await Note.find({userID: req.user.id})

        return res.status(200).json({ success: true, note})

    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Cant retrive notes.' })
    }
}