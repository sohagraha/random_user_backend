# random_user_backend

Get a random user from the .json file : https://random-user-backend.vercel.app/api/v1/user/random (GET)

Get all the users from the .json file : https://random-user-backend.vercel.app/api/v1/user/all (GET)

Save a user in the .json file : https://random-user-backend.vercel.app/api/v1/user/save (POST)

```
body:
{
"name": "John Test 2",
"gender": "male",
"contact": "01624532689",
"address": "Dhaka",
"photoUrl": "https://www.w3schools.com/w3images/avatar2.png",
"id":0
}
```

Update a user's information in the .json file using its id : https://random-user-backend.vercel.app/api/v1/user/update (PATCH)

```
body :
{
  "id":6,
  "data":{
    "name":"Sohag Update",
    "contact":"016635"
  }
}
```

Update multiple users' information in the .json file : https://random-user-backend.vercel.app/api/v1/user/bulk-update (PATCH)

```
body : {
"data":[1,2,3,12],
"newBody":{
"name":"Test Bulk Update"
}
}

```

Delete a user from the .json file using its id : https://random-user-backend.vercel.app/api/v1/user/delete/6 (delete)

```
parameter : 6 (/:id)
```
