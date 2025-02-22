"use client";

import React from "react";
import Fixed from './Fixed';

const Loading: React.FC = () => {
  return (
    <Fixed>
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
    </Fixed>
  );
};

export default Loading;
