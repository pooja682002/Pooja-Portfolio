import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.css"; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: null, username: "", password: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data.response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  // Handle add or update user
  const handleAddOrUpdateUser = async () => {
    if (newUser.username && newUser.password) {
      try {
        if (newUser.id) {
          // Update existing user
          await axios.put(`http://localhost:8080/api/users/${newUser.id}`, {
            username: newUser.username,
            password: newUser.password,
          });
        } else {
          // Add new user
          await axios.post("http://localhost:8080/api/users/register", {
            username: newUser.username,
            password: newUser.password,
          });
        }
        fetchUsers(); // Re-fetch users after adding or updating
        setNewUser({ id: null, username: "", password: "" }); // Clear form
      } catch (error) {
        console.error("Error adding/updating user:", error);
      }
    }
  };

  // Handle delete user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      fetchUsers(); // Re-fetch users after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="users-container">
      <h2>Users Records</h2>

      {/* Add or Edit User Form */}
      <div className="add-user-form">
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button
          className="action-btn"
          onClick={handleAddOrUpdateUser}
        >
          {newUser.id ? "Update User" : "Add User"}
        </button>
      </div>

      {/* Users Table */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="2">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => setNewUser({ id: user.id, username: user.username, password: "" })}
                    >
                       Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                       Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
