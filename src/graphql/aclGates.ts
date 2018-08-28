import { get } from 'lodash';

// conditions
const isAdmin = async ({ context: { jwt } }) => {
  const roles = get(jwt, 'context.user.roles') || [];
  return roles.includes('ADMIN');
};

const isSelf = models => async ({ args, context }) => {
  const _id = args._id || args.record._id;
  const egoId = await models.User.findOne({ _id }).then(user => user.egoId);
  return `${egoId}` === `${context.jwt.sub}`;
};

const defaultErrorMessage = 'Access denied';

// gates
export const idGate = ({ models, errMsg = defaultErrorMessage }) => async ({
  args,
  context,
}) => {
  const _id = args._id || args.record._id;
  const egoId = await models.User.findOne({ _id }).then(user => user.egoId);
  if (args.record && args.record.egoId !== egoId) {
    throw new Error(errMsg);
  }
};
export const selfGate = ({ models, errMsg = defaultErrorMessage }) => async ({
  args,
  context,
}) => {
  if (!isSelf(models)({ args, context })) {
    throw new Error(errMsg);
  }
};
export const adminGate = ({ errMsg = defaultErrorMessage }) => async ({
  context: { jwt },
}) => {
  const roles = get(jwt, 'context.user.roles') || [];
  if (!isAdmin({ context: { jwt } })) {
    throw new Error(errMsg);
  }
};
export const adminOrSelfGate = ({
  models,
  errMsg = defaultErrorMessage,
}) => async ({ args, context }) => {
  if (!(isAdmin({ context }) || isSelf(models)({ args, context }))) {
    throw new Error(errMsg);
  }
};
export const validTokenGate = ({ errMsg = defaultErrorMessage }) => async ({
  context,
}) => {
  if (!context.jwt.valid) throw new Error(errMsg);
};
