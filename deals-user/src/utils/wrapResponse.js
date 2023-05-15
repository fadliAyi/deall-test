module.exports = (res, returnUseCase) => {
  return res.status(returnUseCase.httpCode).json({
    message: returnUseCase.message,
    data: returnUseCase.data
  });
}