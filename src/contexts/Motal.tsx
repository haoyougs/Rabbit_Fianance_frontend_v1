import React, { createContext, useCallback, useState } from 'react'
import { StyledModalWrapper, StyledModalBackdrop } from "./MotalStyled";
interface ModalsContext {
  content?: React.ReactNode,
  isOpen?: boolean,
  onShow: (content: React.ReactNode) => void,
  onHide: () => void
}

export const Context = createContext<ModalsContext>({
  onShow: () => { },
  onHide: () => { },
})
const Modals: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<React.ReactNode>()

  const handlePresent = useCallback((modalContent: React.ReactNode) => {
    setContent(modalContent)
    setIsOpen(true)

  }, [setContent, setIsOpen])

  const handleDismiss = useCallback(() => {
    setContent(undefined)
    setIsOpen(false)

  }, [setContent, setIsOpen])

  return (
    <Context.Provider value={{
      content,
      isOpen,
      onShow: handlePresent,
      onHide: handleDismiss,
    }}>
      {children}
      {isOpen && (
        <StyledModalWrapper>
          <StyledModalBackdrop onClick={handleDismiss} />
          {React.isValidElement(content) && React.cloneElement(content, {
            onHide: handleDismiss,
          })}
        </StyledModalWrapper>
      )}
    </Context.Provider>
  )
}

export default Modals