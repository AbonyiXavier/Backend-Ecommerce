const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "loged out successfully",
  });
};

module.exports = logout;
