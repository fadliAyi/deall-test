const userRepository = require('../repository/userRepository');
const wrapReturnUseCase = require('../utils/wrapReturnUseCase');

module.exports = async (payload) => {
  // TODO: cache data
  const result = await userRepository.create(payload);
  return wrapReturnUseCase(true, result, 'create succes');
}