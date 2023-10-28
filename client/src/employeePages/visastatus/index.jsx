import React, { useState } from "react";
import { Steps, Card, message, Button, Upload, Space, List } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Step } = Steps;
const { Dragger } = Upload;

const VisaStatusManagement = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [documentStatus, setDocumentStatus] = useState([
    "pending",
    "pending",
    "pending",
  ]);
  const [uploadedDocuments, setUploadedDocuments] = useState([
    null,
    null,
    null,
  ]);

  const steps = [
    {
      title: "OPT Receipt",
      content: (
        <div>
          {documentStatus[0] === "approved" && (
            <div>
              <p>Uploaded OPT Receipt:</p>
              {uploadedDocuments[0] ? (
                <a
                  href={uploadedDocuments[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Document
                </a>
              ) : (
                <p>No document uploaded</p>
              )}
            </div>
          )}
          {documentStatus[0] === "pending" && (
            <Dragger
              beforeUpload={() => false}
              showUploadList={false}
              onChange={(info) => {
                if (info.file.status === "done") {
                  // Store the uploaded document information
                  setUploadedDocuments((prevDocuments) => {
                    const newDocuments = [...prevDocuments];
                    newDocuments[0] = {
                      url: info.file.response.url, // Replace with the actual URL
                      name: info.file.name,
                    };
                    return newDocuments;
                  });
                }
              }}
            >
              <p>Upload your OPT Receipt here</p>
              <p>Waiting for HR to approve your OPT Receipt</p>
            </Dragger>
          )}
          {documentStatus[0] === "rejected" && (
            <div>
              <p>HR's feedback for OPT Receipt:</p>
              {/* Display HR's feedback here */}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "OPT EAD",
      content: (
        <div>
          {documentStatus[1] === "approved" && (
            <div>
              <p>Uploaded OPT EAD:</p>
              {uploadedDocuments[1] ? (
                <a
                  href={uploadedDocuments[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Document
                </a>
              ) : (
                <p>No document uploaded</p>
              )}
            </div>
          )}
          {documentStatus[1] === "pending" && (
            <Dragger
              beforeUpload={() => false}
              showUploadList={false}
              onChange={(info) => {
                if (info.file.status === "done") {
                  // Store the uploaded document information
                  setUploadedDocuments((prevDocuments) => {
                    const newDocuments = [...prevDocuments];
                    newDocuments[1] = {
                      url: info.file.response.url, // Replace with the actual URL
                      name: info.file.name,
                    };
                    return newDocuments;
                  });
                }
              }}
            >
              <p>Upload your OPT EAD here</p>
              <p>Waiting for HR to approve your OPT EAD</p>
            </Dragger>
          )}
          {documentStatus[1] === "rejected" && (
            <div>
              <p>HR's feedback for OPT EAD:</p>
              {/* Display HR's feedback here */}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "I-20",
      content: (
        <div>
          {documentStatus[2] === "approved" && (
            <div>
              <p>Uploaded I-20:</p>
              {uploadedDocuments[2] ? (
                <a
                  href={uploadedDocuments[2].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Document
                </a>
              ) : (
                <p>No document uploaded</p>
              )}
            </div>
          )}
          {documentStatus[2] === "pending" && (
            <Dragger
              beforeUpload={() => false}
              showUploadList={false}
              onChange={(info) => {
                if (info.file.status === "done") {
                  // Store the uploaded document information
                  setUploadedDocuments((prevDocuments) => {
                    const newDocuments = [...prevDocuments];
                    newDocuments[2] = {
                      url: info.file.response.url, // Replace with the actual URL
                      name: info.file.name,
                    };
                    return newDocuments;
                  });
                }
              }}
            >
              <p>Upload your I-20 here</p>
              <p>Waiting for HR to approve your I-20</p>
            </Dragger>
          )}
          {documentStatus[2] === "rejected" && (
            <div>
              <p>HR's feedback for I-20:</p>
              {/* Display HR's feedback here */}
            </div>
          )}
        </div>
      ),
    },
  ];

  const handleDocumentApproval = (status) => {
    if (documentStatus[currentStep] === "pending") {
      const newDocumentStatus = [...documentStatus];
      newDocumentStatus[currentStep] = status;
      setDocumentStatus(newDocumentStatus);

      if (status === "approved" && currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        message.error("Document rejected. Please check HR feedback.");
      }
    } else {
      message.error("You can only update a pending document.");
    }
  };

  return (
    <Card>
      <Steps current={currentStep} direction="vertical">
        {steps.map((item, index) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
      {currentStep < steps.length - 1 && (
        <Space>
          <Button onClick={() => handleDocumentApproval("approved")}>
            Approve Document
          </Button>
          <Button onClick={() => handleDocumentApproval("rejected")}>
            Reject Document
          </Button>
        </Space>
      )}
    </Card>
  );
};

export default VisaStatusManagement;
