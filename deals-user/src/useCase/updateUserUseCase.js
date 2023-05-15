const userRepository = require('../repository/userRepository');
const wrapReturnUseCase = require('../utils/wrapReturnUseCase');

module.exports = async (payload) => {
  const data = await userRepository.findOneById(payload.id);
  if (!data) {
    return wrapReturnUseCase(false, null, 'update user', 404);
  }

  await userRepository.updateById(payload, payload.id);
  return wrapReturnUseCase(true, null, 'update user');
}