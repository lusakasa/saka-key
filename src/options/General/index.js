import { getAttributes } from 'lib/util';

export default (options, config) => {
  const backgroundOptions = {};
  const clientOptions = getAttributes(options, ['enabled', 'preventStealFocus']);
  const errors = {};
  return { backgroundOptions, clientOptions, errors };
};
