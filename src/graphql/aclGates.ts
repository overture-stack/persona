import { get } from 'lodash';

const APPROVED_STATUS = 'Approved'.toLowerCase();

// conditions
const isAdmin = ({ context: { jwt } }) => {
  const roles = get(jwt, 'context.user.roles', []);
  return roles.includes('ADMIN');
};

const isApplication = ({ context: { jwt } }) => {
  const applicationStatus = get(jwt, 'context.application.status', '');
  return applicationStatus.toLowerCase() === APPROVED_STATUS;
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
  if (!(await isSelf(models)({ args, context }))) {
    throw new Error(errMsg);
  }
};
export const adminOrAppGate = ({ errMsg = defaultErrorMessage }) => async ({
  context: { jwt },
}) => {
  const passesGate =
    isAdmin({ context: { jwt } }) || isApplication({ context: { jwt } });

  if (!passesGate) {
    throw new Error(errMsg);
  }
};

export const adminOrSelfGate = ({
  models,
  errMsg = defaultErrorMessage,
}) => async ({ args, context }) => {
  const passesGate =
    isAdmin({ context }) || (await isSelf(models)({ args, context }));

  if (!passesGate) {
    throw new Error(errMsg);
  }
};

export const validTokenGate = ({ errMsg = defaultErrorMessage }) => async ({
  context,
}) => {
  if (!context.jwt.valid) throw new Error(errMsg);
};
