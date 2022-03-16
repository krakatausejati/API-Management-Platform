import React from "react";
import { Button } from "antd";
import "./landing-page.css";

export default function LandingPage() {
  return (
    <div className='wrapper'>
      <div className='jumbotron'>
        <h1>API Management Platform</h1>
        <p>
          Make data transform more easier, secure <br /> and manage as much as
          you want
        </p>
        <Button type='primary'>Get Started</Button>
      </div>
    </div>
  );
}
