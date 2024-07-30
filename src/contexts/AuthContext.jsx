import { createContext, useContext, useState } from "react";
import { useAppContext } from "./AppContext";
import { useIntl } from "react-intl";
import { post } from "../utils/request";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
  
const AuthProvider = ({children}) => {
  const { setAuthenticate, messageApi } = useAppContext();
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const intl = useIntl();
  const login = async (principals) => {
    return post("/login", principals)
      .then((response) => {
        messageApi.success(intl.formatMessage({id: "login.success"}, {name: response?.message}));
        if (response?.data) {
          const redirectTo = location.state?.from?.pathname || "/";
          navigate(redirectTo);
        }
        setAuthenticate(true);
        localStorage.setItem('isAuthenticated', true);
      })
      .catch((error) => {
        throw error;
      });
  };

  const logout = async () => {
    setAuthenticate(false);
    localStorage.removeItem('isAuthenticated');
    post("/logout")
        .then(response => {
          if(response?.data) {
            messageApi.info(intl.formatMessage({id: "logout.success"}));
          }
        }).catch();
  };
  return (<AuthContext.Provider value={{
    login, logout, 
    user, setUser,
    count, setCount
    }}>
    {children}
  </AuthContext.Provider>);
};

export default AuthProvider;