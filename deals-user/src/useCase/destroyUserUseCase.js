const userRepository = require('../repository/userRepository');
const wrapReturnUseCase = require('../utils/wrapReturnUseCase');

module.exports = async (id) => {
  await userRepository.destroy(id);
  return wrapReturnUseCase(true, null, 'delete user');
}