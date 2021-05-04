import { listConstants } from '../_constants';
import { listService } from '../_services';

export const listActions = {
    getAll,
    delete: _delete,
    setFilter
};

function setFilter(filterText) {
    return { type: listConstants.SET_FILTER, filterText }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        listService.getAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: listConstants.GETALL_REQUEST } }
    function success(items) { return { type: listConstants.GETALL_SUCCESS, items } }
    function failure(error) { return { type: listConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        listService.delete(id)
            .then(
                list => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: listConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: listConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: listConstants.DELETE_FAILURE, id, error } }
}