import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { InjectConnector } from '../utils/web3'
import { addChainToBlock } from 'utils/ethereum'

export const useAuth = () => {
    const { activate } = useWeb3React()
    const Login = () => {
        if (InjectConnector) {
            activate(InjectConnector, async (error: Error) => {
                if (error instanceof UnsupportedChainIdError) {
                    const hasSetup = await addChainToBlock(56)
                    if (hasSetup) {
                        activate(InjectConnector)
                    }
                }
            })
        }
    }
    return Login
}