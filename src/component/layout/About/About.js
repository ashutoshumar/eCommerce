import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dwchxu6h1/image/upload/v1684320739/IMG20221216190435_puaa8e.jpg"
              alt="Founder"
            />
            <Typography>Ashutosh Kumar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @ashutosh_kumar. 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Connect Me </Typography>
            <a
              href="https://github.com/ashutoshumar"
              target="blank"
            >
              <GitHubIcon className="githubSvgIcon" />
            </a>

            <a href="https://linkedin.com/in/ashutosh-kumar-2269921b8/" target="blank">
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;