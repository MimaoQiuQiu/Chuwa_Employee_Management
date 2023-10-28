import "./styles.css";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Drawer, Space, message } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  AuditOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "../../hooks/useMediaQuery";

import { logOut } from "../../app/employeeSlice";
import DrawerContent from "./DrawerContent";

const { Title } = Typography;
let title = "Chuwa Employee Management System";

export default function Navbar() {
  const { pathname: location } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, employee } = useSelector((state) => state.employee);
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState([]);
  const isTablet = useMediaQuery("(max-width: 768px) and (min-width: 425px)");
  const isMobile = useMediaQuery("(max-width: 760px)");

  useEffect(() => {
    employee.role === "HR"
      ? setFeatures([
          {
            name: "Home",
            icon: <HomeOutlined style={{ fontSize: "20px" }} />,
            link: "/",
          },
          {
            name: "Employees Profils",
            icon: <TeamOutlined style={{ fontSize: "20px" }} />,
            link: "/hr/profiles",
          },
          {
            name: "Visa Status Management",
            icon: <SafetyCertificateOutlined style={{ fontSize: "20px" }} />,
            link: "/hr/visas",
          },
          {
            name: "Hiring Management",
            icon: <AuditOutlined style={{ fontSize: "20px" }} />,
            link: "/hr/hiringManagement",
          },

          {
            name: "Onboarding Application",
            icon: <FileDoneOutlined style={{ fontSize: "20px" }} />,
            link: `/employee/${employee.id}/OnboardingPage`,
          },
          {
            name: "Personal Information",
            icon: <UserOutlined style={{ fontSize: "20px" }} />,
            link: `/employee/${employee.id}/PersonalInfoPage`,
          },
          {
            name: "Visa Status",
            icon: <SafetyCertificateOutlined style={{ fontSize: "20px" }} />,
            link: `/employee/${employee.id}/visa`,
          },
        ])
      : setFeatures([
          {
            name: "Home",
            icon: <HomeOutlined style={{ fontSize: "20px" }} />,
            link: "/",
          },
          {
            name: "Onboarding Application",
            icon: <UserOutlined style={{ fontSize: "20px" }} />,
            link: `/employee/${employee.id}/OnboardingPage`,
          },
          {
            name: "Personal Information",
            icon: <UserOutlined style={{ fontSize: "20px" }} />,
            link: `/employee/${employee.id}/PersonalInfoPage`,
          },
          {
            name: "Visa Status Management",
            icon: <SafetyCertificateOutlined style={{ fontSize: "20px" }} />,
            link: `/employee/${employee.id}/visa`,
          },
        ]);
  }, [employee]);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleMenuClick = () => {
    if (isAuthenticated) {
      setOpen(true);
    } else {
      message.error("Please sign in first!");
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSignoutBtnClick = (e) => {
    if (e.target.innerText === "Sign Out") dispatch(logOut());
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="left-menu">
        <div className="menu">
          <Button onClick={handleMenuClick}>
            <Space
              style={{
                color: "#FFF",
                fontFamily: "Inter",
                fontSize: "15px",
              }}
            >
              <MenuOutlined style={{ fontSize: "20px" }} />
            </Space>
          </Button>
        </div>
      </div>

      <div className="title">
        <Title
          level={3}
          className="title-text"
          style={{ margin: 0, color: "#FFF" }}
        >
          {isMobile ? "CEMS" : title}
        </Title>
      </div>

      <div className="right-menu">
        <div className="menu">
          <Button onClick={handleSignoutBtnClick}>
            <Space
              style={{
                color: "#FFF",
                fontFamily: "Inter",
                fontSize: "15px",
              }}
            >
              <UserOutlined style={{ fontSize: "20px" }} />
              {isAuthenticated ? `Sign Out` : `Sign In`}
            </Space>
          </Button>
        </div>
      </div>
      <Drawer
        title="Menu"
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        key="left"
        className="DrawerContent"
      >
        <DrawerContent features={features} />
      </Drawer>
    </nav>
  );
}
