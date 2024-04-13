"use client";

import React from "react";
import { ProgressBar } from "react-loader-spinner";

const loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default loading;
