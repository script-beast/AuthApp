import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, myToast, useUserContext } from "../../utils";
import { Button, Heading, Input, InputPassword } from "../../common";

const Login = () => {
  const { setLoggedUser } = useUserContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/login`, {
        email,
        password,
      });
      myToast(data.msg, "success");
      setLoggedUser(true);
      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("authRefreshToken", data.data.refreshToken);
      navigate("/");
    } catch (err) {
      myToast(err?.response?.data?.error, "failure");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className="max-w-[26rem]"
    >
      <div className="mb-6">
        <Heading level={2} className="text-center mb-2">
          Admin Login
        </Heading>
        <p className="text-center text-grey">
          We&apos;re glad to see you back!
        </p>
      </div>
      <div className="mb-6 w-full">
        <Input
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full min-w-[20rem]"
          required={loading}
        />
      </div>
      <div className="relative mb-4 w-full">
        <InputPassword
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full min-w-[20rem]"
          required={loading}
        />
      </div>
      <div className="w-full">
        <Button theme="primary" className="w-full" size="lg"  type="submit">
          Sign In
        </Button>
      </div>
      <div className="text-sm mt-2">
        Don&apos;t have an account?{" "}
        <span
          className="font-semibold text-primary cursor-pointer"
          onClick={() => {
            navigate("/auth/register");
          }}
        >
          Register
        </span>
      </div>
    </form>
  );
};

export default Login;
