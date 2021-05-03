import config from 'config';

export const listService = {
    getAll,
    getById,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${config.listUrl}/todos`, requestOptions)
        .then(handleResponse)
        .then(addMockPositions);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${config.listUrl}/todos/${id}`, requestOptions).then(handleResponse);
}

function update(todo) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    };

    return fetch(`${config.listUrl}/todos/${todo.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
    };

    return fetch(`${config.listUrl}/todos/${id}`, requestOptions);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function addMockPositions(data) {
    data.forEach(object => {
        object.positions = [getRandomPosition(), getRandomPosition()]
    });
    return data;
}

function getRandomPosition() {
    return {
        lat: getRandomNumber(43.655000, 43.656999),
        lng: getRandomNumber(-79.380000, -79.380999)
    }

}

function getRandomNumber(min, max) {
    return +(Math.random() * (max - min) + min).toFixed(6)
}

