function Login (router, App) {
   router.get('/hey', (req, res) => {
       res.send('hey');
   });
}

module.exports = Login;