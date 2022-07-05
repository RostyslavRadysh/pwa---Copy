import { connect, ConnectedProps } from 'react-redux'
import type { RootState } from '@/utils/store'
import { setMainTitle } from '@/slicers/configSlice'

const mapState = (state: RootState) => ({
    mainTitle: state.config.mainTitle
})

const mapDispatch = {
    setMainTitle
}

export const connector = connect(mapState, mapDispatch)

type PropsConfigSlice = ConnectedProps<typeof connector>

export default PropsConfigSlice
