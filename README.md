# Simple Forum

## Required preconditions

* [install](https://howtonode.org/how-to-install-nodejs) Node.js
* install MongoDB version 3.4.6

## Deployement steps

* clone GIT repository and go inside
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

* by default server will create admin account in MongoDB with following credentials: 
  * email: `admin@forum.ua`
  * password: `password`
    
* in your browser open link [http://localhost:3000/](http://localhost:3000/)
