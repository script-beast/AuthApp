import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, myToast } from "../../utils";
import { Heading, Button, Input } from "../../common";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await api.get("/users/" + id);
      setFName(data.FName);
      setLName(data.LName);
      setEmail(data.email);
    } catch (err) {
      myToast(err?.response?.data?.error, "failure");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleUserSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put("/users/" + id, { FName, LName, email });
      myToast(data.msg, "success");
      setFName("");
      setLName("");
      setEmail("");
      navigate("/");
    } catch (err) {
      myToast(err?.response?.data?.error, "failure");
    }
    setLoading(false);
  };

  return (
    <div>
      <Heading level={2} className="mb-12">
        Update User
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
          Save User
        </Button>
        <Button size="lg" onClick={() => navigate("/")}>
          Return to Home
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
