interface UserModel{
  _id?:string;
  firstName:string;
  lastName:string;
  birthDate:string;
  titleOfPost:string;
  textOfPost:string;
  //email1
  userName:string;
  password:string;
  imageOfPost?:FileList;
  isLoggedIn?:boolean;
  socketId:string;
}
export default UserModel;
