import UserModel from 'models/User';

export default ({ context }: { context: any }) =>
  UserModel.findOne({ egoId: context.jwt.sub });
