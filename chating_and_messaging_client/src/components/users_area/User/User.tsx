import UserModel from "../../../models/user_model/user-model";
import UsersDetail from "../UsersDetail/UsersDetail";
import "./User.css";
interface UsersProps {
  user: UserModel;
}
function User(props: UsersProps): JSX.Element {
  return (
    <div className="User">
      <UsersDetail userObject={props.user}></UsersDetail>
    </div>
  );
}

export default User;
