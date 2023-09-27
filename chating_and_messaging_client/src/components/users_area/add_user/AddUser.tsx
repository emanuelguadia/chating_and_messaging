import { useForm } from "react-hook-form";
import "./AddUser.css";
import UserModel from "../../../models/user_model/user-model";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import { userService } from "../../../services/users_service/users-service";
function AddUser(): JSX.Element {
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
    //@ts-ignore
    let data: UserModel = (await userService.addUser(user)) as UserModel;
    if (data?._id) {
      navigateTo("/");
    }
    navigateTo("/");
    // navigateTo("/add-user");
  }
  return (
    <div className="AddUser Box container-fluid h-100 w-100 p-0 m-0">
      <form
        onSubmit={handleSubmit(submit)}
        className="formClass container h-100 w-75"
      >
        <div></div>
        <h6>
          <small className="text-muted">Add User</small>
        </h6>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">First Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              autoFocus
              {...register("firstName", {
                required: true,
                maxLength: 50,
                minLength: 1,
              })}
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
                required: true,
                maxLength: 50,
                minLength: 1,
              })}
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
              type="text"
              {...register("birthDate", {
                required: true,
                maxLength: 50,
                minLength: 1,
              })}
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
                required: true,
                maxLength: 50,
                minLength: 1,
              })}
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
                required: true,
                maxLength: 50,
                minLength: 1,
              })}
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
                required: "Email Address is required",
              })}
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
                required: true,
                maxLength: 20,
                minLength: 5,
              })}
              aria-invalid={errors.password ? "true" : "false"}
              className="form-control"
              id="inputPassword"
            />
          </div>
          {errors.password?.type === "required" && (
            <p role="alert">Password is required</p>
          )}
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
            <Button className="w-100 h-100">Save</Button>
          </Col>
          <Col>
            <Button className="w-100 h-100" onClick={() => navigateTo("/")}>
              Cancel
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default AddUser;
