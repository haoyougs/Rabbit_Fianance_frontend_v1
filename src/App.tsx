import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import { HomePage } from "views/Home";
import { TypePageBox } from "components/typePage/TypePage";
import { useWallet, hidehash } from "hooks/useWallet";
function App() {
  useWallet();
  return (
    <Box>
      {/* 页面的框架 */}
      <TypePageBox>
        {/* 页面的路由 */}
        <Suspense fallback={null}>
          <Router>
            <Routes>
              {/* 页面的内容 */}
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Router>
        </Suspense>
      </TypePageBox>
    </Box>
  );
}

export default App;

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(128deg, #4773cf, #766eb1 82%, #f14f7d 110%);
`;
