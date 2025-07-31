// middlewares/notFound.js
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `🔍 Not Found - ${req.originalUrl}`,
    data: null,
  });
};

export default notFound;
