const API_BASE_URL = 'http://localhost:8081'; // Update this with your actual API base URL

export const todoService = {
    async getTodos() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/todo/list`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized: Please log in again');
                }
                if (response.status === 403) {
                    throw new Error('Forbidden: You do not have permission to access this resource');
                }
                throw new Error(`Server error: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async addTodo(todo) {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/todo`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized: Please log in again');
                }
                throw new Error(`Failed to add todo: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // async updateTodo(id, updates) {
    //     const token = localStorage.getItem('token');
    //     const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(updates)
    //     });
    //     if (!response.ok) {
    //         throw new Error('Failed to update todo');
    //     }
    //     return response.json();
    // },

    async deleteTodo(id) {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found');
        }

        try {
            console.log('Attempting to delete todo with ID:', id);
            const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
                method: 'DELETE',  // Changed back to DELETE
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Delete response status:', response.status);

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized: Please log in again');
                }
                if (response.status === 404) {
                    throw new Error('Todo not found');
                }
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                throw new Error(`Failed to delete todo: ${response.status} - ${errorText}`);
            }

            // For delete operations, we don't always need to parse the response
            if (response.status === 204 || response.headers.get('content-length') === '0') {
                return true;
            }

            try {
                const jsonResponse = await response.json();
                console.log('Delete response:', jsonResponse);
                return jsonResponse;
            } catch (e) {
                console.log('No JSON response, but delete was successful');
                return true;
            }
        } catch (error) {
            console.error('Delete API Error:', error);
            throw error;
        }
    }
}; 