import { useState, useEffect } from "react";
import { api, myToast, dateFormatter } from "../../utils";
import { Heading, Button, Table, Pagination } from "../../common";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const getUsers = async () => {
    try {
      const { data } = await api.get(`/users?page=${page}`);
      setUsers(data.data.users);
      setTotalPages(data.data.totalPages);
    } catch (err) {
      myToast(err?.response?.data?.error, "failure");
    }
  };
  useEffect(() => {
    getUsers();
  }, [page]);

  const handleDeletion = async (id) => {
    try {
      const { data } = await api.delete(`/users/${id}`);
      myToast(data.msg, "success");
      getUsers();
    } catch (err) {
      myToast(err?.response?.data?.error, "failure");
    }
  };

  return (
    <div>
      <div className="mb-12 flex justify-between items-center">
        <Heading level={2}>User Management System</Heading>
        <Link to="/add-user">
          <Button theme="primary">Add User</Button>
        </Link>
      </div>
      <Table
        tHead={[
          "Name",
          "Email",
          "Status",
          "Created At",
          "Updated At",
          "Actions",
        ]}
      >
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              {user.FName} {user.LName}
            </td>
            <td>{user.email}</td>
            <td>{user.isDeleted ? "Deleted" : "Active"}</td>
            <td>{dateFormatter(user.createdAt)}</td>
            <td>{dateFormatter(user.updatedAt)}</td>
            <td className={user.isDeleted ? "invisible" : ""}>
              <span className="flex gap-2">
                <Link to={`/edit-user/${user._id}`}>
                  <Button theme="primary" size="sm" rounded="sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  theme="danger"
                  size="sm"
                  rounded="sm"
                  onClick={() => handleDeletion(user._id)}
                >
                  Delete
                </Button>
              </span>
            </td>
          </tr>
        ))}
      </Table>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Home;
