# NASA_APOD_API

#Functionality and Requirements 

This API runs by command npm run devStart which enables nodemon for the server.js

`GET/image` Returns ImageUrl and _id as responds on success. Saves the data into mongodb 
`POST/user` Creates a new user. JSON Body is required 
{
  "email": "example@email.com"
}
`DELETE/user` Delete a existing user. JSON Body is required
{
  "email": "example@email.com"
}
`POST/rating` Create a new rating of a picture for a user. JSON Body is required
{
  "email": "example@email.com"
  "rating": 4,
  "ImgUrl": "https://apod.nasa.gov/apod/image/2112/LeonardMeteor_Poole_960.jpg"
}
`PATCH/rating` Update a user's rating on a picture.  JSON Body is required
{
  "email": "example@email.com"
  "rating": 4,
  "ImgUrl": "https://apod.nasa.gov/apod/image/2112/LeonardMeteor_Poole_960.jpg"
}
`DELETE/rating` Delete user's rating on a picture. JSON Body is required
{
  "email": "example@email.com"
  "ImgUrl": "https://apod.nasa.gov/apod/image/2112/LeonardMeteor_Poole_960.jpg"
}

`GET/rating` Get a user's all ratings. JSON Body is required
{
  "email": "example@email.com"
}

# RESTful Architecture
![alt text](https://github.com/timothyglee94/NASA_APOD_API/blob/main/Screen%20Shot%202021-12-20%20at%205.22.57%20PM.png)
