"use client";

import React from "react";
import PageLayout from "../components/PageLayout/PageLayout";
import ThreeDModel from "../components/ThreeDModel/ThreeDModel";

const ThreePage = () => {
  return (
    <PageLayout title="Three.js Visualization">
      {/* 3D Background */}
      <ThreeDModel />

      {/* Content in front */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "#fff",
          textAlign: "center",
          paddingTop: "50px",
        }}
      >
        <section className="text-gray-900 font-bold">
          <h1>Welcome to the 3D Experience</h1>
          <p>This is some content in front of the Three.js background.</p>
        </section>
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            // backgroundColor: '#007BFF',
            border: "1px solid black",
            borderRadius: "5px",
            color: "#fff",
            cursor: "pointer",
            backdropFilter: "blur(5px)",
          }}
        >
          Mouse Move
        </button>
      </div>
    </PageLayout>
  );
};

export default ThreePage;
