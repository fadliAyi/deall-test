const {user} = require('../models');

const create = async (data) => {
  return user.create(data);
}

const findOneById = async (id) => {
  return user.findOne({_id: id});
}

const findAndCountAll = async (filter, options) => {
  return user.paginate(filter, {...options, customLabels: {docs: 'itemsList', totalDocs: 'itemCount'}});
}

const updateById = async (data, id) => {
  return user.findByIdAndUpdate(id, data);
}

const destroy = async (id) => {
  return user.deleteOne({_id: id});
}

module.exports = {
  create,
  findOneById,
  findAndCountAll,
  updateById,
  destroy,
}