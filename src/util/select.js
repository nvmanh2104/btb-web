import { createSelector } from 'reselect'

export default (state, dataPath, field) => {
    const selectReducer = () => (
        Array.isArray(dataPath) ? dataPath.reduce((accumulator, currentValue) => accumulator[currentValue], state):state[dataPath]
    )
    return createSelector(selectReducer, selectReducer => selectReducer[field])()
}