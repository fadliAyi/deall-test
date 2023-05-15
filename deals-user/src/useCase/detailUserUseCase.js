const userRepository = require('../repository/userRepository');
const wrapReturnUseCase = require('../utils/wrapReturnUseCase');

module.exports = async (userId) => {
  // TODO: cache data
  const result = await userRepository.findOneById(userId);
  return wrapReturnUseCase(true, result, 'detail user');
}