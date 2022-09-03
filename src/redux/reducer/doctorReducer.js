import * as Types from '../reducer/ActionTypes'

const initialState = {
    doctors: [],
    isLoading: false,
    error: ''
}

const doctorReducer = (state = initialState, action) => {
    switch(action.type){
        case Types.FETCH_DOC:
            return {
                isLoading: false,
                error: '',
                doctors: action.payload
            }

        case Types.ADD_DOC:
            return {
                isLoading: false,
                error: '',
                doctors: state.doctors.concat(action.payload)
            }

        case Types.DELETE_DOC:
            return {
                isLoading: false,
                error: '',
                doctors: state.doctors.filter(doc => doc.id !== action.payload)
            }

        case Types.UPDATE_DOC:
            return {
                isLoading: false,
                error: '',
                doctors: state.doctors.map(doc => doc.id === action.payload.id ? action.payload : doc)
            }

        case Types.LOADING_DOC:
            return {
                ...state,
                isLoading: true,
                error: ''
            }

        case Types.ERROR_DOC: 
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export default doctorReducer;