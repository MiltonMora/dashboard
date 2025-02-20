"use client";

import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div id="building">
        <div id="blocks" className="m-auto">
          <div className="block" id="block_1"></div>
          <div className="block" id="block_2"></div>
          <div className="block" id="block_3"></div>
          <div className="block" id="block_4"></div>
        </div>
        <div className="caption pl-2 text-4xl m-auto">
          loading...
        </div>
      </div>
    </div>
  );
};

export default Loading;
