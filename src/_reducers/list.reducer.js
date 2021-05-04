import { listConstants } from '../_constants';
const initialState = {
    loading: false,
    error: false,
    items: [],
    filterText: ''
}
export function list(state = initialState, action) {
    switch (action.type) {
        case listConstants.SET_FILTER:
            return {
                ...state,
                filterText: action.filterText
            }
        case listConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case listConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: action.items,
                loading: false,
                error: false
            };
        case listConstants.GETALL_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case listConstants.DELETE_REQUEST:
            // add 'deleting:true' property to list being deleted
            return {
                ...state,
                items: state.items.map(list =>
                    list.id === action.id
                        ? { ...list, deleting: true }
                        : list
                )
            };
        case listConstants.DELETE_SUCCESS:
            // remove deleted list from state
            return {
                items: state.items.filter(list => list.id !== action.id)
            };
        case listConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to list 
            return {
                ...state,
                items: state.items.map(list => {
                    if (list.id === action.id) {
                        // make copy of list without 'deleting:true' property
                        const { deleting, ...listCopy } = list;
                        // return copy of list with 'deleteError:[error]' property
                        return { ...listCopy, deleteError: action.error };
                    }

                    return list;
                })
            };
        default:
            return state
    }
}