import Login from "./components/auth/login";
import SingUp from "./components/auth/signup";
import Home from "./components/home";
// import ForgotPassword from "./components/auth/forgotpassword";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    {
      path: "*",
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
    // {
    //   path: "/forgotpassword",
    //   element: <ForgotPassword />,
    // }
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <div className="w-full h-screen flex flex-col">{routesElement}</div>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
