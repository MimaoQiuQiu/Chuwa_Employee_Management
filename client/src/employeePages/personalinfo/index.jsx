import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  message,
} from "antd";
// import "antd/dist/antd.css";

const { Option } = Select;

const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Initialize with some sample data
    firstName: "jiefan",
    lastName: "yu",
    middleName: "",
    preferredName: "derrick",
    profilePicture: "",
    email: "derrickyu98@gmail.com",
    ssn: "123-45-6789",
    dob: "1998-11-10",
    gender: "male",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    // Ask the user if they want to discard changes
    Modal.confirm({
      title: "Discard Changes",
      content: "Do you want to discard all changes?",
      onOk: () => {
        setIsEditing(false);
        // Reset the form data
        // You may want to fetch the original data from an API instead
        setFormData({
          firstName: "jiefan",
          lastName: "yu",
          middleName: "",
          preferredName: "derrick",
          profilePicture: "",
          email: "derrickyu98@gmail.com",
          ssn: "123-45-6789",
          dob: "1998-11-10",
          gender: "male",
        });
      },
    });
  };

  const handleSaveClick = () => {
    // Save the updated data to the backend here
    setIsEditing(false);
    message.success("Changes saved successfully.");
  };

  const handleChange = (changedValues) => {
    setFormData({ ...formData, ...changedValues });
  };

  return (
    <div>
      <h2>Personal Information</h2>
      {isEditing ? (
        <div>
          <Form
            name="personalInfoForm"
            onValuesChange={(_, values) => handleChange(values)}
          >
            <Form.Item label="First Name" name="firstName">
              <Input />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName">
              <Input />
            </Form.Item>
            {/* Add other form fields here */}
          </Form>
          <Button type="primary" onClick={handleSaveClick}>
            Save
          </Button>
          <Button onClick={handleCancelClick}>Cancel</Button>
        </div>
      ) : (
        <div>
          <p>First Name: {formData.firstName}</p>
          <p>Last Name: {formData.lastName}</p>
          {/* Display other non-editable fields here */}
          <Button type="primary" onClick={handleEditClick}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
