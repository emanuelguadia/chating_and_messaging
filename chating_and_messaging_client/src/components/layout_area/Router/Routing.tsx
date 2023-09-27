import { Route, Routes } from "react-router-dom";
import Login from "../../authentication_area/login/Login";
import AddUser from "../../users_area/add_user/AddUser";
import GetHelpHowToChatting from "../../info-pages/GetHelpHowToChatting/GetHelpHowToChatting";
import GetHelpHowToUseThisSite from "../../info-pages/GetHelpHowToUseThisSite/GetHelpHowToUseThisSite";
import ChatArea from "../../home_page_area/Chat_area/ChatArea";
import ContactPane from "../../home_page_area/contact_pane/ContactPane";
import UpdateUsers from "../../users_area/update_users/UpdateUsers";
import DeleteUsers from "../../users_area/deletee_users/DeleteUsers";
function Routing(): JSX.Element {
  return (
    <div className="Routing container-fluid h-100 w-100 m-0 p-0">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add-user" element={<AddUser/>} />
        <Route path='/chat-area' element={<ChatArea/>} />
        <Route path='/contact-pane' element={<ContactPane/>} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/update-user" element={<UpdateUsers/>} />
        <Route path="/delete-user" element={<DeleteUsers/>} />
        <Route
          path="/help-how-to-chatting"
          element={<GetHelpHowToChatting />}
        />
        <Route
          path="/help-how-to-this-site"
          element={<GetHelpHowToUseThisSite />}
        />
      </Routes>
    </div>
  );
}

export default Routing;
