import { UserModel } from "../../models/user_schema/user-schema";
type UserModelType = InstanceType<typeof UserModel>;
//Filtering allUsers by isLoggedIn field.
async function filtering(
  isLoggedIn: boolean,
  allUsers: UserModelType[]
): Promise<UserModelType[]> {
  //@ts-ignore
  let filterUsers: UserModelType[] = allUsers.filter((user: UserModel) => {
    return user.isLoggedIn == isLoggedIn;
  });
  if (filterUsers) {
    return filterUsers;
  }
  return [];
}
//Updating  user.password = undefined.
async function UpdatingPassword(
  allUsers: UserModelType[]
): Promise<any> {
  //Before  response continue to update  user.password = undefined
  // Means delete users password.
  const allUpdatingUsers = allUsers.map(
    (user:UserModelType) => {
      //@ts-ignore
      return (user.password = undefined);
    }
  );
  return allUpdatingUsers;
}
async function getAllUsers(): Promise<any>{
  try {
    //all users from db.
    const allUsers = await UserModel.find();
    //all after updating password users from db.
    let updatingUsers:UserModelType[] = [];
    if (allUsers) {
      updatingUsers = await UpdatingPassword(allUsers);
    }
    //OffLine users
    const offLineUsers = new Promise(async (resolve, reject) => {
      const isLoggedIn: boolean = false;
      if (allUsers) {
        // //@ts-ignore
        let allOffLineUsers = await filtering(isLoggedIn, allUsers);
        if (allOffLineUsers) {
          resolve(allOffLineUsers);
        }
      } else {
        reject();
      }
    });
    const onLineUsers = new Promise(async (resolve, reject) => {
      const isLoggedIn: boolean = true;
      if (allUsers) {
        //@ts-ignore
        let allOnLineUsers = await filtering(isLoggedIn, allUsers);
        if (allOnLineUsers) {
          resolve(allOnLineUsers);
        } else {
          reject();
        }
      }
    });
    const values = await Promise.all([onLineUsers, offLineUsers]);
    return values;
  } catch (error: any) {
    return error.message;
  }
}
async function getOneUser(_id: string): Promise<any> {
  return await UserModel.findOne({ _id });
}
async function getOneUserWithUserName(userName: string):Promise<any> {
  const user = await UserModel.findOne({
    userName: userName,
  });
  if (user) {
    return user;
  }
  return null;
}
async function AddUser(user: any): Promise<any> {
  return await user.save();
}
async function updateUser(_id: string, user: any): Promise<any> {
  return await UserModel.updateOne({ _id }, user);
}
async function deleteUser(_id: string): Promise<any> {
 console.log(" return await UserModel.deleteOne({ _id });");
}
export = {
  getAllUsers,
  getOneUser,
  AddUser,
  updateUser,
  getOneUserWithUserName,
  deleteUser,
};
