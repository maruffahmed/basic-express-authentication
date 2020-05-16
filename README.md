# Basic express user authentication system

This is a basic session based user authentication system by using express and mongoDB

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes

### Prerequisites

You need node js installed to your local machine.


### Installing

I used a npm package name `bcrypt` that required python. Make sure you have installed python on your local machine.<br/>

For setup python on your npm dependency management run this command:
```
npm config set python [python.exe file address of your local machine]
```

#### Example command

```
npm config set  python "C:\Users\User\AppData\Local\Programs\Python\Python36-32\python.exe"
```

Make sure you have installed MongoDB on your local machine. <br>

[MongoBD](https://www.mongodb.com/) - MongoDB website

To connect MongoDB with the app, user your MongoDB connection string into here :
![Example](/img/MongoDb_connection_string.png)

Run this command for install all the packages i used:

```
npm install
```

To run the server, use:

```
npm start
```

## Built With

* [Express](https://expressjs.com/) - The web framework used
* [Npm](https://www.npmjs.com/) - Dependency Management
* [MongoBD](https://www.mongodb.com/) - Database

## Authors

* **Md Maruf Ahmed** - *Font end developer* - [Qbytesoft ](https://qbytesoft.com/)
