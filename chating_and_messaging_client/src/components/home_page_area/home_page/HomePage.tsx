import { useContext } from "react";
import "./HomePage.css";
import SocketContext, {
  SocketContextProvider,
} from "../../../app_state_area/context/socket_io_context/socket-io-context";
import Routing from "../../layout_area/Router/Routing";
function HomePage(): JSX.Element {
  const { socketState, SocketDispatch } = useContext(SocketContext);
  return (
    <SocketContextProvider
      value={{ socketState: socketState, SocketDispatch: SocketDispatch }}
    >
      <div className="HomePage container-fluid h-100 w-100 p-0 m-0">
        <Routing />
      </div>
    </SocketContextProvider>
  );
}

export default HomePage;
