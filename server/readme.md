


**API Documentation**

# **Overview**
The Simple Note-Taking API provides CRUD (Create, Read, Update, Delete) operations for managing text notes. It is built using Node.js, Express.js, and MongoDB. The API supports basic authentication (Optional).

Base URL
`http://localhost:3000/api/notes`

```
Endpoints
```
# 1. Create Note
- Method: POST
- URL: /create
- Request Body:
 - Format: JSON
- Fields:
 - title (string, required): Title of the note.
 - content (string, required): Content of the note.
- Response:
 - Status: 200 OK
 - Body: JSON object representing the created note.
# 2. Retrieve Notes
- Method: GET
- URL: /
- Request Body: (No request body for a GET request)
- Response:
 - Status: 200 OK
- Body: Array of JSON objects representing notes.
# 3. Update Note
- Method: PUT
- URL: /update/:id
- Request Body:
- Format: JSON
- Fields:
 - title (string, required): New title of the note.
 - content (string, required): New content of the note.
- Response:
 - Status: 200 OK
- Body: JSON object representing the updated note.
# 4. Delete Note
- Method: DELETE
- URL: /:id
- Request Body: (No request body for a DELETE request)
- Response:
 - Status: 200 OK (or 204 No Content)
-Body: Message indicating successful deletion.
# Error Handling
In case of validation errors during note creation or updating, the API responds with a 400 Bad Request status and provides details about the validation errors in the response body.
If a non-existent note is requested for update or delete, the API responds with a 404 Not Found status.
For other unexpected errors, a 500 Internal Server Error is returned.
# Authentication 
Basic Authentication is supported for all endpoints.
## Credentials:
Username: mohar
Password: password
