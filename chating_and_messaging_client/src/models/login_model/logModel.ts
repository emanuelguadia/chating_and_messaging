interface CredentialModel{
   email:String;
   password?:String;
   isLoggedIn:boolean;
   message?:string;
   token:string;
}
export default CredentialModel;