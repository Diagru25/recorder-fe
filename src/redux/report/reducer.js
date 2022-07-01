import actions from './action';

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
        case actions.types.GET_RECORD_LIST:
            return state;
        
        case actions.types.UPDATE_STATE:
            return {
                ...state,
                ...payload.state
            }
        default:
            return state;
    }
}

export default reducer;