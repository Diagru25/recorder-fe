import recordActions from './action';

const initialState = {
    
    recordList: {
        items: [],
        isPending: false,
        pageIndex: 0,
        pageSize: 20,
        textSearch: ''
    }
}

const reducer = (state = initialState, action) => {
    const payload = action.payload;

    switch(action.type) {
        case recordActions.types.GET_RECORD_LIST:
            return state;
        
        case recordActions.types.UPDATE_STATE:
            return {
                ...state,
                ...payload.state
            }
        default:
            return state;
    }
}

export default reducer;