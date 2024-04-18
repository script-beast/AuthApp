import { useState } from "react";
import { api, myToast } from "../../utils";
import { Heading, Button, Input } from "../../common";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleUserSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/users", { FName, LName, email });
      myToast(data.msg, "success");
      setFName("");
      setLName("");
      setEmail("");
    } catch (err) {
      myToast(err?.response?.data?.error, "failure");
    }
    setLoading(false);
  };

  return (
    <div>
      <Heading level={2} className="mb-12">
        Add User
      </Heading>
      <form
        className="max-w-[26rem] flex flex-col gap-6"
        onSubmit={handleUserSubmission}
      >
        <Input
          label="First Name"
          value={FName}
          onChange={(e) => setFName(e.target.value)}
          required={loading}
        />
        <Input
          label="Last Name"
          value={LName}
          onChange={(e) => setLName(e.target.value)}
          required={loading}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={loading}
        />
        <Button theme="primary" size="lg" type="submit">
          Add User
        </Button>
        <Button size="lg" onClick={() => navigate("/")}>
          Return to Home
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
