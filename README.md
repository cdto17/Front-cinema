# Frontend for Cinema Management Platform
<p>
This frontend is developed in React and connects to several microservices to manage different functionalities of a cinema platform. The frontend manages two roles: administrator, who has full access to all functionalities, and user, who has limited access to certain functionalities.
</p>

#### Features
- **Movie CRUD:** Allows the creation, reading, updating and deletion of movies.
- **CRUD of Snacks:** Allows the complete management of snacks.
- **Rooms CRUD:** Allows the management of movie theaters.
- **Comments Management:** Allows users to view and add comments on movies.
- **Offers Management:** Allows to view and list special offers.
- **Payment Types Management:** Allows to list the available payment types.
- **Room Type Management:** Allows to view and manage movie room types.
- **Premiere Management:** Allows you to manage movie premieres and view the premiere history.
- **Authentication System:** Allows users to register and log in to the platform.
- **User Roles:** Administrator interface for full management and a user interface with limited access.

#### Technologies Used
- **React** for frontend development.
- **Axios** to make HTTP requests to the microservices.
- **React** Router for navigation between pages.
- **Cors** for secutity.
- **CSS/Styled Components** for frontend design and styling.

#### How to install and run the project? :tw-1f527:
The project requires Node.js and npm installed on your system. To install and run the project, follow these steps:

###### Clone the repository:

- `git clone <URL_OF_REPOSITORY>`
- `cd <URL_OF_REPOSITORY> `

###### Install dependencies:

- `npm install`

###### Configure environment variables:
Create an `.env` file in the root of the project and set the following environment variables:

- `REACT_APP_API_BASE_URL=http://localhost:8000/api`
- `REACT_APP_MOVIES_SERVICE_URL=http://localhost:8001/movies`
- `REACT_APP_SNACKS_SERVICE_URL=http://localhost:8002/snacks`
- `REACT_APP_ROOMS_SERVICE_URL=http://localhost:8003/rooms`

###### Execute the server:
- `npm start`

#### How to use the project :tw-1f52c:
<p>
Once the development server is up and running, you will be able to navigate through the different functionalities according to the user role you are logged in with. The administrator role will have access to all management functions, while regular users will have limited access according to the allowed functionalities.
</p>

####Connect to the Frontend :link:
<p>
The microservice is designed to be consumed by a frontend. Make sure to configure the backend URLs in the frontend so that authentication requests are performed correctly.
</p>

`<link>` : <https://github.com>


####  License :tw-1f4c4: 
This project is licensed under the (AFL-3.0) License - see the [LICENSE](https://opensource.org/license/afl-3-0-php) file for details.

