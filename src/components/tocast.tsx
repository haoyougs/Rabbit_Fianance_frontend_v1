import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export interface ITocastProps {
    bgColor: string,
    title?: string,
    content: string,
    interVal: number,
    onClose: () => void
}

export const Tocast: FC<ITocastProps> = ({ bgColor, title, content, interVal, onClose }) => {
    let timerId:any = null
    useEffect(() => {
        timerId = setTimeout(() => {
            onClose()
        }, interVal)
        return () => timerId && clearTimeout(timerId)
    }, [])
    const handleClose=()=>{
        if(timerId){
            clearTimeout(timerId)
        }
        onClose()
    }
    return (
        <Wrapper>
            <Main bgColor={bgColor}>
                <TextWrapper>
                    {title && <Title>{title}</Title>}
                    <Content>{content}</Content>
                </TextWrapper>
                <IConWrapper>
                    <Button onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </Button>
                </IConWrapper>
            </Main>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: fixed;
    top:24px;
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
    z-index: 2000;
`
const Main = styled.div<{ bgColor: string }>`
    display: flex;
    padding:6px 16px;
    font-weight: 500;
    background:${({ bgColor }) => bgColor};
    color:#fff;
    border-radius:4px;
    min-width: 300px;
    justify-content: space-between;
`
const Title = styled.div`
   font-size:14px;
   color:#fff;
   font-weight:500;
   margin-bottom: 8px;
`
const Content = styled.div`
   font-size: 14px;
   color:#fff;
   font-weight:500;
`
const TextWrapper = styled.div`
   display: flex;
   flex-direction: column;
`
const IConWrapper = styled.div`
   display: flex;
   margin-left:16px;
   align-items: center;
`
const Button = styled.div`
    border:none;
    outline: none;
    background:transparent;
    cursor:pointer;
    color:#fff;
    font-size:16px;
`