const userRepository = require('../repository/userRepository');
const wrapReturnUseCase = require('../utils/wrapReturnUseCase');

module.exports = async (params) => {
  const filter = {};
  if (params.q) {
    filter.name = { $regex: params.q, $options: 'i' };
  }
  const options = {
    page: params.page || 1,
    limit: params.limit || 10
  };

  const result = await userRepository.findAndCountAll(filter, options);
    return wrapReturnUseCase(true, result, 'list user');
}