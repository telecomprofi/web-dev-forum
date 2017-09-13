# Simple Forum

## Required preconditions

* [install](https://howtonode.org/how-to-install-nodejs) Node.js
* install Gulp
* install MongoDB version 3.4.6

## Deployement steps

* clone GIT repository and switch to folder nataliya.sobkovych/task2 inside repository
* install dependencies
    ```
    $ npm install
    ```
* run MongoDB server demon `mongod`

* run gulp
    ```
    $ gulp
    ```
* run web-server
    ```
    $ npm run dev
    ```

* in browser go to the address [http://localhost:3000](http://localhost:3000)

* by default server will create admin account in MongoDB with following credentials: 
  * email: `admin@forum.ua`
  * password: `Password1`
   
* these are your options:
  * Register new users
  * Allow the users to log in
  * Log in as an administrator
  * The administrator can view all the users (by using "Member List" button)
  * The administrator can add topics (by using "Add Topic" button)
  * The administrator can update and remove topics (by using appropriate control buttons)
  * The administrator and user can add a new thread (by using "Add Thread" button)
  * The administrator can update and remove threads (by using appropriate control buttons)
  * The users can update threads (by using appropriate control buttons)
  * The administrator and the users can create and edit answers (by using appropriate control buttons)
  * The administrator and the users can set likes or dislikes for threads and answers (by using appropriate control buttons)
  * The thread author can choose the best answer (by using appropriate control button)
  * The administrator can ban the user. The banned user can only edit his profile.
  * The administrator and the users can edit their profiles
  * All the visitors can view users profiles (public versions)
  * Allow the users and the administrator to log out
  
  * All mock users have the same password: `Secret1`
