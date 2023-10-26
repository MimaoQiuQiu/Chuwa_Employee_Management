import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
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
    phone: "123-456-7890",
    // Add new fields below
    address: "",
    contact: "",
  });

  const [phoneValid, setPhoneValid] = useState(true);
  const [ssnValid, setSsnValid] = useState(true); // Add SSN validation state

  // Define regular expressions for valid phone and SSN
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;

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
          phone: "123-456-7890",
          // Add new fields below
          address: "",
          contact: "",
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
    if (changedValues.phone) {
      // Check if the phone number matches the regex
      setPhoneValid(phoneRegex.test(changedValues.phone));
    }
    if (changedValues.ssn) {
      // Check if the SSN matches the regex
      setSsnValid(ssnRegex.test(changedValues.ssn));
    }
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
            <p>Name</p>
            <div className="form-row" style={{ display: "flex", gap: "10px" }}>
              <Form.Item label="First Name" name="firstName">
                <Input />
              </Form.Item>
              <Form.Item label="Middle Name" name="middleName">
                <Input />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName">
                <Input />
              </Form.Item>
              <Form.Item label="Preferred Name" name="preferredName">
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item label="Pic" name="profilePicture">
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
            </div>
            <div className="form-row" style={{ display: "flex", gap: "10px" }}>
              <Form.Item
                label="Ssn"
                name="ssn"
                hasFeedback
                validateStatus={ssnValid ? "success" : "error"}
                help={ssnValid ? "" : "Invalid SSN format"}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Dob" name="dob">
                <Input />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select an option and change input text above"
                  allowClear
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
            </div>
            <p>Contact Info</p>
            <div>
              <Form.Item
                label="Phone"
                name="phone"
                hasFeedback
                validateStatus={phoneValid ? "success" : "error"}
                help={phoneValid ? "" : "Invalid phone number format"}
              >
                <Input />
              </Form.Item>
            </div>
            {/* Add other form fields here */}
          </Form>
          <Button type="primary" onClick={handleSaveClick}>
            Save
          </Button>
          <Button onClick={handleCancelClick}>Cancel</Button>
        </div>
      ) : (
        <div>
          <p>Name</p>
          <div>
            <p>First Name: {formData.firstName}</p>
            <p>Middle Name: {formData.middleName}</p>
            <p>Last Name: {formData.lastName}</p>
            <p>Preferred Name: {formData.preferredName}</p>
          </div>
          <div>
            <p>Pic: {formData.profilePicture}</p>
            <p>Email: {formData.email}</p>
          </div>
          <div>
            <p>Ssn: {formData.ssn}</p>
            <p>Dob: {formData.dob}</p>
            <p>Gender: {formData.gender}</p>
          </div>
          <p>Contact Info</p>
          <div>
            <p>Phone: {formData.phone}</p>
            <p>Address: {formData.address}</p>
            <p>Contact: {formData.contact}</p>
          </div>
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
