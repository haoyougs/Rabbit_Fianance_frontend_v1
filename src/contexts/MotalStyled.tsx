import styled from 'styled-components'
export const StyledModalWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 2;
  top: 0; right: 0; bottom: 0; left: 0;
`

export const StyledModalBackdrop = styled.div`
  background-color: rgba(1,1,1,.3);
  backdrop-filter: blur(10px);
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;

`