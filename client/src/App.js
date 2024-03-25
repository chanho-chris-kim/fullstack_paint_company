import Login from "./components/auth/login";
import SingUp from "./components/auth/signup";
import Home from "./components/home";
import Delivery from "./components/delivery";
import Admin from "./components/admin";
import { ApiProvider } from "./contexts/ApiContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    {
      exact: true, 
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/singup",
      element: <SingUp />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/delivery",
      element: <Delivery />,
    },
    {
      path: "/admin",
      element: <Admin />,
    }
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <ApiProvider>
      {routesElement}
    </ApiProvider>
  );
}

export default App;
