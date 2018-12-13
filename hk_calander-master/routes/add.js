const express = require('express');
const router = express.Router();

router.post('/class', (req, res, next) => {
    console.log(request.body);
});

module.exports = router;