import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Alert } from "react-bootstrap"; 
import "./Users.css"; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: null, username: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalSuccessMessage, setModalSuccessMessage] = useState("");
  const [modalErrorMessage, setModalErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleAddOrUpdateUser = async () => {
    if (newUser.username && newUser.password) {
      try {
        setModalErrorMessage(""); 
        if (newUser.id) {
          await axios.put(`http://localhost:8080/api/users/${newUser.id}`, {
            username: newUser.username,
            password: newUser.password,
          });
          setModalSuccessMessage("User updated successfully!");
        } else {
          await axios.post("http://localhost:8080/api/users/register", {
            username: newUser.username,
            password: newUser.password,
          });
          setModalSuccessMessage("User added successfully!");
        }
        fetchUsers(); 
        setNewUser({ id: null, username: "", password: "" }); 
        setShowModal(false); 
      } catch (error) {
        console.error("Error adding/updating user:", error);
        setModalErrorMessage("Error adding/updating user.");
      }
    } else {
      setModalErrorMessage("Both fields are required.");
    }
  };

  const confirmDeleteUser = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${userToDelete}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalSuccessMessage(""); 
    setModalErrorMessage(""); 
  };

  useEffect(() => {
    if (showModal) {
      setModalSuccessMessage(""); 
      setModalErrorMessage(""); 
    }
  }, [showModal]); 

  return (
    <div className="users-container">
      <h2>Users Records</h2>

      <Button variant="primary" onClick={() => setShowModal(true)} className="add-new-button">
        Add New User
      </Button>

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
                      onClick={() => {
                        setNewUser({ id: user.id, username: user.username, password: "" });
                        setShowModal(true); 
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => confirmDeleteUser(user.id)}
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{newUser.id ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="form-control"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="form-control"
          />

          {modalErrorMessage && <Alert variant="danger">{modalErrorMessage}</Alert>}
          {modalSuccessMessage && <Alert variant="success">{modalSuccessMessage}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateUser}>
            {newUser.id ? "Update User" : "Add User"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
