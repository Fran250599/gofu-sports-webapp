const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../login/auth');


// Endpoint para el login del administrador
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username)
    console.log(password)
    try {
        const result = await loginAdmin(username, password);
        if (result.success) {
            return res.status(200).json({ message: result.message });
        } else {
            return res.status(401).json({ message: result.message });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/', (req, res) => {
    res.send('Router Admin');
});

module.exports = router;