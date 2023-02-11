const router = require('express').Router();

router.get('', (req, res) => {
  //   console.log('fi');
  //   if (req.body.latitude) {
  //     handler(req, res);
  //   }
  return res.render('home', { server_no: 04 });
});

module.exports = router;
