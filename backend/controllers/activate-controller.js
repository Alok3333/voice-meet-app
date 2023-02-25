class ActivateController {
  async activate(req, res) {
    // Activation logic
    res.json({ message: 'ok' });
  }
}

module.exports = new ActivateController();
