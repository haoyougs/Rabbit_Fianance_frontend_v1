import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import { TypePageBox } from "components/typePage/TypePage";
import { useWallet, hidehash } from "hooks/useWallet";
import store from "state";
import { Provider as StateProvider } from "react-redux";
// 引入的页面
import { Vault } from "views/Vault/Vault";
import { DepositBox } from "views/Vault/Deposit";
import { WithdrawBox } from "views/Vault/Withdraw";
import { StakePage } from "views/Stake/StakePage";
import { Stake } from "views/Stake/Stake";
import { Unstake } from "views/Stake/Unstake";
import { AllFarmsPage } from "views/Farm/AllFarms/AllFarms";
import { LiquidationPage } from "views/Farm/Liquidation/Liquidation";
import { MyPositionsPage } from "views/Farm/MyPositions/MyPosition";
import { SupplyPage } from "views/Farm/AllFarms/Supply";

function App() {
  useWallet();
  return (
    <StateProvider store={store}>
      <Suspense fallback={null}>
        <Router>
          <Box>
            {/* 页面的框架 */}
            <TypePageBox>
              <Routes>
                {/* 页面的内容 */}
                <Route path="/" element={<Vault />} />
                <Route path="/Deposit/:id" element={<DepositBox />} />
                <Route path="/Withdraw/:id" element={<WithdrawBox />} />
                <Route path="/stake" element={<StakePage />} />
                <Route path="/stake/stake/:id" element={<Stake />} />
                <Route path="/stake/unstake/:id" element={<Unstake />} />

                <Route path="/allFarms" element={<AllFarmsPage />} />
                <Route path="/positions/:id" element={<SupplyPage />} />
                <Route path="/myPositions" element={<MyPositionsPage />} />
                <Route path="/liquidation" element={<LiquidationPage />} />
              </Routes>
            </TypePageBox>
          </Box>
        </Router>
      </Suspense>
    </StateProvider>
  );
}

export default App;

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(128deg, #4773cf, #766eb1 82%, #f14f7d 110%);
`;
