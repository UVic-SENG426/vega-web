import { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import UserRegistrationPageLayout from "../templates/UserRegistrationPageLayout.js";
import LoginUser from "../UI/organisms/LoginUser.js";
import { login } from "../../service/auth/AuthenticationManager.js";
import { UserContext } from "../../auth/UserProvider.js";
import { Redirect, Link } from "react-router-dom";

const Login = (props) => {
  //const navigate = useNavigate();

  const { context } = props;
  const { user, setUserInfo, logout } = useContext(UserContext);
  const [auth, setAuth] = useState(false);
  console.log("Userinfo", user);
  function onSubmit(userInfo) {
    login(userInfo).then((res) => {
      console.log("Response", res);
      console.log(res.jwt);
      var role = res.authorities[0].authority;
      setUserInfo(userInfo.username, res.jwt, role);
      setAuth(true);
    });
  }

  if (!auth) {
    return (
      <UserRegistrationPageLayout>
        <LoginUser onSubmit={onSubmit} />
        <Link to="/register">Sign up</Link>
      </UserRegistrationPageLayout>
    );
  } else {
    return <Redirect to="/news" />;
  }
};

export default Login;
