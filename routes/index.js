const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// /api/____ is the only endpoint option, so any other request that makes it to this point will be met with the following response:
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;