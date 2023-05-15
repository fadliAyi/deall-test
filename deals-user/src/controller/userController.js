const userValidation = require('../validations/userValidation');
const createUserUseCase = require('../useCase/createUserUseCase');
const detailUserUseCase = require('../useCase/detailUserUseCase');
const listUserUseCase = require('../useCase/listUserUseCase');
const updateUserUseCase = require('../useCase/updateUserUseCase');
const destroyUserUseCase = require('../useCase/destroyUserUseCase');
const wrapResponse = require('../utils/wrapResponse');

const create = async (req, res, next) => {
  const {body} = req;

  try {
    await userValidation().validateAsync(body);
  } catch (err) {
    return res.status(422).json({message: err.message});
  }

  try {
    const result = await createUserUseCase(body);
    return wrapResponse(res, result);
  } catch (err) {
    next(err);
  }
};

const detail = async (req, res, next) => {
  const {id} = req.params;
  try {
    const result = await detailUserUseCase(id);
    return wrapResponse(res, result);
  } catch (err) {
    next(err);
  }
}

const list = async (req, res, next) => {
  const {query} = req;
  try {
    const result = await listUserUseCase(query);
    return wrapResponse(res, result);
  } catch (err) {
    next(err);
  }
}

const update = async (req, res, next) => {
  const {body, params} = req;
  try {
    await userValidation().validateAsync(body);
  } catch (err) {
    return res.status(422).json({message: err.message});
  }

  try {
    const result = await updateUserUseCase({...body, id: params.id});
    return wrapResponse(res, result);
  } catch (err) {
    next(err);
  }
}

const destroy = async (req, res, next) => {
  const {id} = req.params
  try {
    const result = await destroyUserUseCase(id);
    return wrapResponse(res, result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  create,
  detail,
  list,
  update,
  destroy,
}