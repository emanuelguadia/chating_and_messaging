import UserModel from "../../../models/user_model/user-model";
import "./UsersDetail.css";
import { useAppSelector } from "../../../hooks/redux_hooks/redux-hooks";
interface UsersDetailProps {
  userObject?: UserModel;
}
function UsersDetail(props: UsersDetailProps): JSX.Element {
  //Choose user from  redux means get the activeChooseUser.
  const chooseUserState = useAppSelector((state) => {
    return state.chooseUserState.activeChooseUser;
  });
  //Choose user statues from  redux
  const chooseUserStatus = useAppSelector((state) => {
    return state.chooseUserState.status;
  });
  const getChooseUserImage = () => {
    let url_image;
    const imageOfPost = chooseUserState?.imageOfPost;
    if (imageOfPost) {
      //const {type:Buffer, data: Array} =imageOfPost as any;
      const { type, data } = imageOfPost as { type: any; data: any } | any;
      url_image = `data:image/*;base64,${btoa(
        String.fromCharCode(...data?.data)
      )}`;
    }
    return url_image;
  };
  return (
    <div className="UsersDetail h-100 w-100 p-0 m-0">
      {chooseUserStatus ? (
        <>
          <div className="card h-100 w-25 p-0 m-0">
            <img
              src={getChooseUserImage()}
              className="card-img-top h-75 w-100 p-0 m-0"
              alt="good"
            ></img>
            <div className="card-body h-25 w-100 p-0 m-0 ">
              <p className="card-text">
                <b> {chooseUserState?.titleOfPost}</b>
              </p>
            </div>
          </div>
         
          <div className="card  h-100 w-75 p-0 m-0">
            <h6 className="card-header  h-25 w-100 p-0 m-0">
              First Name {chooseUserState.firstName}
            </h6>
            <div className="card-body  h-75 w-100 p-0 m-0">
              <h6 className="card-title ">
                Last Name {chooseUserState.lastName}
              </h6>
              <p className="card-text">{chooseUserState?.textOfPost}</p>
            </div>
          </div>
        </>
      ) : (
        <>choose user</>
      )}
    </div>
  );
}

export default UsersDetail;
