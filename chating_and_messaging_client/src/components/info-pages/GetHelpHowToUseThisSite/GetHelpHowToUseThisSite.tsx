import "./GetHelpHowToUseThisSite.css";
function GetHelpHowToUseThisSite(): JSX.Element {
  return (
    <div className="GetHelpHowToUseThisSite h-100 w-100 p-0 m-0 container-fluid bg-white">
      <p  className="card-text bg-white container">
        This system is provide users the ability to chat with each other. and
        allows users to see who is online and offline, and to choose whom to
        talk by double clicked. the act of selecting user on a contact screen is
        by double-clicked on button with mouse or other device on right side of
        user’s picture only not another place.sign-in with correct user name
        and password is opening the application the login page have the format
        of the sign-in button and sign-up button.the sign-up button allows
        users to register for a web site.by click on the sign-up button opening
        the register page. then user can register for a web site. so when user
        register for a web site must remember the password and username because
        when fishing to register for website user pass a login page and then
        login for website with the password and user name.
      </p>
      <h6 className="card-subtitle mb-2 text-muted text-center">
        How To Chatting
      </h6>
      <hr/>
      <p className="card-text bg-white container">
        First time activation: when opening the application for the first time,
        the user must in user name and password, enter them and connect to the
        service. Once the connection is completed, the page will change to the
        client's main page, which will be show all users In the site .here the
        user sees his list of contacts and their statuses are they currently
        connected or not.the user can choose to communicate with any online
        contact.chat – the user double-clicks on button with mouse or other
        device on right side of user’s picture selects and contact with the user
        and can chat with the contact. a picture will open the upper part on left side of  header.
        once the choose to communicate is completed.the user can chat with the choose user.and also  the chat screen is divided into two
        panes: the upper part has the chat history and the lower part is the
        editing area where the user composes and sends his messages by enter.
        When selected,in the menu bar sign out/logout user is logout.
      </p>
    </div>
  );
}

export default GetHelpHowToUseThisSite;
