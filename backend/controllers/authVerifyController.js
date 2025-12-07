export const verify = async (req, res) => {
    try {
        return res.status(200).json({sucess: true, user: req.user})
    } catch (error) {
       return res.status(401).json({sucess: false}) 
    }
}