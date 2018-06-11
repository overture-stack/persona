const self = UserModel => ({ context }: { context: any }) =>
  UserModel.findOne({ egoId: context.jwt.sub });

export default self;
