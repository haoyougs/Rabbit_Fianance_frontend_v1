import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// 这下边的两个是添加的引入文件
import { getLibray } from "./utils/web3";
import { Web3ReactProvider } from "@web3-react/core";
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
ReactDOM.render(
  <ConfigProvider
    getPopupContainer={(node: any) => {
      if (node) {
        return node.parentNode;
      }
      return document.body;
    }}
  >
    {/* 在这里用 Web3ReactProvider 包裹 app 文件 */}
    <Web3ReactProvider getLibrary={getLibray}
    >
      <App />
    </Web3ReactProvider>
  </ConfigProvider>
  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//////console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
