import "./GetHelpHowToChatting.css";

function GetHelpHowToChatting(): JSX.Element {
  return (
    <div className="GetHelpHowToChatting h-100 w-100 p-0 m-0 container-fluid bg-white">
      <div className="card h-100 w-100 p-0 m-0 container-fluid">
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">How To Chatting</h6>
          <p className="card-text">
            First time activation: When opening the application for the first
            time, the user must in user name and password, enter them and
            connect to the service. Once the connection is completed, the page
            will change to the client's main page, which will be show all users
            In the site . Here the user sees his list of contacts and their
            statuses – are they currently connected or not. The user can choose
            to communicate with any online contact. Chat – the user
            double-clicks on button with mouse or other device on right side of
            user’s picture selects and contact with the user and can chat with
            the contact. a chat pane will open to the right, in which the user
            can chat with the contact The screen is divided into two panes: the
            upper part has the chat history, and the lower part is the editing
            area, where the user composes and sends his messages by enter. When
            selected,in the menu bar sign out/logout user is logout.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GetHelpHowToChatting;
