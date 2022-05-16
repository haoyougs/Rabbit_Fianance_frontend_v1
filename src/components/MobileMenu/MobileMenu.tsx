import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
// import Nav from '../TopBar/components/Nav'

import { Navlist } from "components/typePage/NavList";
interface MobileMenuProps {
  rabbitPrice?: any;
  PoolAddLiquidity?: any;
  onDismiss?: () => void
  visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onDismiss, PoolAddLiquidity, visible, rabbitPrice }) => {
  useEffect(() => {
    if (visible) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "scroll";
    }
  }, [visible])
  return (
    visible ? <StyledMobileMenuWrapper>
      <NavBoxMobile className={visible ? "NavBoxMobile" : ""}>
        <Navlist></Navlist>
      </NavBoxMobile>
    </StyledMobileMenuWrapper> : null
  )
}
const StyledMobileMenuWrapper = styled.div`
    display: flex;
    box-pack:center;
    justify-content: center;
    z-index: 1000;
    width: 100%;
    height: calc(100vh - 80px);
    position: absolute;
    top: 100px;
    background: #5671c5;
    @media (min-width: 1000px) {
    display: none;
  }
`
const NavBoxMobile = styled.div`
`
export default MobileMenu
