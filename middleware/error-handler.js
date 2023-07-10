const errorHandler = (err, req, res, next) => {
  console.error();
  res.status(500).json({ msg: `Something went wrong: ${err}` });
};

module.exports = errorHandler;
