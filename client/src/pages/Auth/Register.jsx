import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, InputPassword, Heading } from "../../common";
import { api, myToast } from "../../utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const handleRegistration = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/register`, {
        name,
        email,
        password,
      });
      myToast(data.msg, "success");
      navigate("/auth/login");
    } catch (err) {
      myToast(err?.response?.data?.error, "failure");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (password !== cPassword)
          return myToast("Passwords do not match", "failure");
        else handleRegistration();
      }}
      className="max-w-[26rem]"
    >
      <div className="mb-6">
        <Heading level={2} className="text-center mb-2">
          Admin Signup
        </Heading>
        <p className="text-center text-grey">Register now to get started!</p>
      </div>
      <div className="mb-4 w-full">
        <Input
          type="text"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full min-w-[20rem]"
          required
          disabled={loading}
        />
      </div>
      <div className="mb-4 w-full">
        <Input
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full min-w-[20rem]"
          required
          disabled={loading}
        />
      </div>
      <div className="relative mb-4 w-full">
        <InputPassword
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full min-w-[20rem]"
          required
          disabled={loading}
        />
      </div>
      <div className="relative mb-4 w-full">
        <InputPassword
          label="Confirm Password"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
          className="w-full min-w-[20rem]"
          required
          disabled={loading}
        />
      </div>
      <div className="w-full">
        <Button
          theme="primary"
          className="w-full flex justify-center"
          type="submit"
          size="lg"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
      <div className="text-sm mt-2">
        Already have an account?{" "}
        <span
          className="font-semibold text-primary cursor-pointer"
          onClick={() => {
            navigate("/auth/login");
          }}
        >
          Login
        </span>
      </div>
    </form>
  );
};

export default Register;
