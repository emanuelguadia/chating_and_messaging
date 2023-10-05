import { useNavigate } from "react-router-dom";
import "./UpdateUsers.css";
import UserModel from "../../../models/user_model/user-model";
import { Button, Col, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../hooks/redux_hooks/redux-hooks";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../app_state_area/context/auth_provider_context/authProvider";
import { userService } from "../../../services/users_service/users-service";
function UpdateUsers(): JSX.Element {
  //Get token from AuthContext
  const { state } = useContext(AuthContext);
  //Profile user from  redux .
  const profileUserState = useAppSelector((state) => {
    return state.profileUserState.profileUser;
  });
  //The active user related to the current request in a web application.
  const [profile, setProfile] = useState<UserModel>();
  const navigateTo = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserModel>();
  async function submit(user: UserModel): Promise<void> {
    if (user.imageOfPost) {
      //@ts-ignore
      user.imageOfPost = user?.imageOfPost?.item(0) || undefined;
    }
    user.isLoggedIn = false;
    if (
      user.firstName &&
      user.lastName &&
      user.birthDate &&
      user.titleOfPost &&
      user.textOfPost &&
      user.userName &&
      user.password
    ) {
      //@ts-ignore
      let data: UserModel = (await userService.fullUpdateUser(
        profile?._id as string,
        user
      )) as UserModel;
      navigateTo("/");
    } else {
      console.log("partialUpdateUser");
      console.log(profile?._id as string);
      //@ts-ignore
      let data: UserModel = (await userService.partialUpdateUser(
        profile?._id as string,
        user
      )) as UserModel;
      navigateTo("/");
    }
    navigateTo("/");
  }
  useEffect(() => {
    setProfile(profileUserState);
  }, []);
  return (
    <div className="UpdateUsers Box container-fluid h-100 w-100 p-0 m-0">
      {state.isLoggedIn ? (
         <form
        onSubmit={handleSubmit(submit)}
        className="formClass container h-100 w-75"
      >
        <div></div>
        <h6>
          <small className="text-muted">Update User</small>
        </h6>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">First Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              autoFocus
              {...register("firstName", {
                maxLength: 50,
                minLength: 1,
              })}
                  value={profile?.firstName}
              aria-invalid={errors.firstName ? "true" : "false"}
              className="form-control"
              id="inputPassword"
            />
            {errors.firstName?.type === "required" && (
              <p role="alert">First name is required</p>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Last Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              {...register("lastName", {
                maxLength: 50,
                minLength: 1,
              })}
             value={profile?.firstName}
              aria-invalid={errors.lastName ? "true" : "false"}
              className="form-control"
              id="inputPassword"
            />
            {errors.lastName?.type === "required" && (
              <p role="alert">Last name is required</p>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Birth Date</label>
          <div className="col-sm-10">
            <input
              type="date"
              {...register("birthDate", {
                maxLength:50,
                minLength: 1,
              })}
                value={profile?.birthDate}
              aria-invalid={errors.birthDate ? "true" : "false"}
              className="form-control"
              id="inputPassword"
              />
            {errors.birthDate?.type === "required" && (
              <p role="alert">Birth date is required</p>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Title Of Post</label>
          <div className="col-sm-10">
            <input
              type="text"
              {...register("titleOfPost", {
                maxLength: 50,
                minLength: 1,
              })}
            value={profile?.titleOfPost}
              className="form-control"
              id="inputPassword"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <input
              type="text"
              {...register("textOfPost", {
                maxLength: 50,
                minLength: 1,
              })}
              value={profile?.textOfPost}
              className="form-control"
              id="inputPassword"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input
              type="email"
              {...register("userName", {
              })}
                 value={profile?.userName}
              aria-invalid={errors.userName ? "true" : "false"}
              className="form-control"
              id="inputPassword"
              />
            {errors.userName && <p role="alert">{errors.userName?.message}</p>}
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input
              type="password"
              {...register("password", {
                maxLength: 20,
                minLength: 5,
              })}
              aria-invalid={errors.password ? "true" : "false"}
              className="form-control"
              id="inputPassword"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Photo Of user</label>
          <input
            type="file"
            accept="imag/*"
            {...register("imageOfPost")}
            className="form-control form-control-lg"
            id="formFileLg"
          />
        </div>
          <Row>
            <Col>
              <Button className="w-100 h-100">Edit</Button>
            </Col>
            <Col>
              <Button className="w-100 h-100" onClick={() => navigateTo("/")}>
                Cancel
              </Button>
            </Col>
          </Row>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UpdateUsers;
