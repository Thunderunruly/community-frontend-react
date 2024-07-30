import { BrowserRouter, useRoutes } from "react-router-dom";
import AppProvider from "./contexts/AppContext";
import routes from "./routes";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthProvider from "./contexts/AuthContext";


const AppContent = () => {
  const element = useRoutes(routes);
  return (<ProtectedRoute element={element}/>);
};

const App = () => {
  return (<AppProvider>
    <BrowserRouter>
      <AuthProvider>
        <AppContent/>
      </AuthProvider>
    </BrowserRouter>
  </AppProvider>);
};

export default App;
