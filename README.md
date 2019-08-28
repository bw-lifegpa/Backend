# LifeGPA v1.0.0

API for LifeGPA Habit Tracker

- [Categories](#categories)
	- [Add new category](#add-new-category)
	- [Delete category](#delete-category)
	- [Edit category](#edit-category)
	- [List all categories](#list-all-categories)
	- [Get category by ID](#get-category-by-id)
	- [Get category by name](#get-category-by-name)
	- [Get category&#39;s habits](#get-category&#39;s-habits)
	
- [Habits](#habits)
	- [Add category to habit](#add-category-to-habit)
	- [Add new habit](#add-new-habit)
	- [Delete habit](#delete-habit)
	- [Edit habit](#edit-habit)
	- [Get habit by ID](#get-habit-by-id)
	- [Get habit by name](#get-habit-by-name)
	- [Get habit&#39;s categories](#get-habit&#39;s-categories)
	- [List all habits](#list-all-habits)
	
- [Users](#users)
	- [Add habit to user](#add-habit-to-user)
	- [Edit user information](#edit-user-information)
	- [Get user by ID](#get-user-by-id)
	- [Get user by username](#get-user-by-username)
	- [Get user&#39;s completed habits](#get-user&#39;s-completed-habits)
	- [Get user habits](#get-user-habits)
	- [Get user&#39;s completion record for habit](#get-user&#39;s-completion-record-for-habit)
	- [List all users](#list-all-users)
	- [Mark a habit completed for user&#39;s record](#mark-a-habit-completed-for-user&#39;s-record)
	- [Remove a category from a habit](#remove-a-category-from-a-habit)
	- [Remove a habit from a user](#remove-a-habit-from-a-user)
	


# Categories

## Add new category



	POST /categories


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			|  <p>Category name</p>							|
| description			| String			| **optional** <p>Category description</p>							|
| created_by			| Number			| **optional** <p>User ID of category creator</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
    "id": 2,
    "name": "Health",
    "description": "Habits for health",
    "created_at": "2019-08-27 15:32:55",
    "updated_at": "2019-08-30 04:51:31",
    "habits": []
  }
```
### Error Response

Missed required parameters

```
HTTP/1.1 400
{
  "message": "Missing name parameter"
}
```
## Delete category



	DELETE /categories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>Category ID</p>							|

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
{
"message": "Category successfully deleted.",
"deleted_category": {
  "id": 7,
  "name": "School",
  "description": "Habits for academic success",
  "created_by": 1,
  "created_at": "2019-08-27 19:15:30",
  "updated_at": "2019-08-27 19:15:30",
  "habits": [
    {
      "id": 10,
      "name": "Study data scructures",
      "description": "Keep your data structures and algorithm skills sharp"
    }
  ]
}
```
### Error Response

Category not found

```
HTTP/1.1 404
{
  "message": "Could not find category."
}
```
## Edit category



	PUT /categories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>Category ID</p>							|
| name			| String			| **optional** <p>Category name</p>							|
| description			| String			| **optional** <p>Category description</p>							|
| created_by			| Number			| **optional** <p>User ID of category creator</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
    "id": 2,
    "name": "Health",
    "description": "Habits for health",
    "created_at": "2019-08-27 15:32:55",
    "updated_at": "2019-08-30 04:51:31",
    "habits": []
  }
```
### Error Response

Missed required parameters

```
HTTP/1.1 400
{
  "message": "Missing required parameters"
}
```
## List all categories



	GET /categories


### Success Response

Success-Response:

```
HTTP/1.1 200 OK
[
  {
    "id": 1,
    "name": "Health",
    "description": "For your health!"
  },
  {
    . . .
  }
]
```
### Error Response

List error

```
HTTP/1.1 500 Internal Server Error
```
## Get category by ID



	GET /categories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>Category ID</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "id": 1,
  "name": "Health",
  "description": "For your health!",
  "created_by": 1,
  "created_at": "2019-08-27 15:32:55",
  "updated_at": "2019-08-30 04:51:31",
  "habits": [
    {
      "id": 2,
      "name": "Swim",
      "description": "Swim some laps"
    },
    {
      . . .
    }
  ]
}
```
### Error Response

Category not found

```
HTTP/1.1 404
{
  "message": "Could not find category."
}
```
## Get category by name



	GET /categories/c/:name


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| name			|  <p>Category Name</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "id": 1,
  "name": "Health",
  "description": "For your health!",
  "created_by": 1,
  "created_at": "2019-08-27 15:32:55",
  "updated_at": "2019-08-30 04:51:31",
  "habits": [
    {
      "id": 2,
      "name": "Swim",
      "description": "Swim some laps"
    },
    {
      . . .
    }
  ]
}
```
### Error Response

Category not found

```
HTTP/1.1 404
{
  "message": "Could not find category."
}
```
## Get category&#39;s habits



	GET /categories/:id/habits


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>Habit ID</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
[
  {
    "id": 2,
    "name": "Health",
    "description": "Habits for health"
  },
  {
    . . .
  }
]
```
### Error Response

Habit not found

```
HTTP/1.1 404
{
  "message": "Could not find habit."
}
```
# Habits

## Add category to habit



	POST /habits/:id/categories


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>Habit ID</p>							|
| category_id			| Number			|  							|

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
{
  "message": "Category {id: 6} added successfully.",
  "categories": [
    {
      "category_id": 1,
      "name": "Health",
      "description": "For your health!"
    },
    {
      . . .
    }
  ]
}
```
### Error Response

Habit not found

```
HTTP/1.1 404
{
  "message": "Could not find habit."
}
```
Category not found

```
HTTP/1.1 500
{
  "message": "Failed to add category to habit"
}
```
## Add new habit



	POST /habits


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			|  <p>Habit's name</p>							|
| description			| String			| **optional** <p>Habit's description</p>							|
| created_by			| String			| **optional** <p>User ID of habit creator</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 201 Created
{
  "id": 9,
  "name": "Call mom",
  "description": "Give her a call tonight",
  "created_by": 3,
  "created_at": "2019-08-27 15:32:55",
  "updated_at": "2019-08-30 04:51:31",
  "categories": []
}
```
### Error Response

Missing required parameters

```
HTTP/1.1 400
{
  "message": "Send a name in request body"
}
```
## Delete habit



	DELETE /habits/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>Habit ID</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "message": "Habit successfully deleted",
  "deleted_habit": {
    "id": 1,
    "name": "Swim laps",
    "description": "Good for heart health",
    "created_by": 1,
    "created_at": "2019-08-27 15:32:55",
    "updated_at": "2019-08-30 04:51:31",
    "categories": [
      {
        "id": 2,
        "name": "Health",
        "description": "Habits for health"
      },
      {
        . . .
      }
    ]
  }
}
```
### Error Response

Habit not found

```
HTTP/1.1 404
{
  "message": "Could not find habit."
}
```
## Edit habit



	PUT /habits/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>Habit ID</p>							|
| name			| String			| **optional** <p>Habit's name</p>							|
| description			| String			| **optional** <p>Habit's description</p>							|
| created_by			| String			| **optional** <p>User ID of habit creator</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 201 Created
{
  "id": 9,
  "name": "Call mom",
  "description": "Give her a call tonight",
  "created_by": 3,
  "created_at": "2019-08-27 15:32:55",
  "updated_at": "2019-08-30 04:51:31",
  "categories": []
}
```
### Error Response

Habit not found

```
HTTP/1.1 404
{
  "message": "Could not find habit."
}
```
## Get habit by ID



	GET /habits/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>Habit ID</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "id": 1,
  "name": "Swim laps",
  "description": "Good for heart health",
  "created_by": 1,
  "created_at": "2019-08-27 15:32:55",
  "updated_at": "2019-08-30 04:51:31",
  "categories": [
    {
      "id": 2,
      "name": "Health",
      "description": "Habits for health"
    },
    {
      . . .
    }
  ]
}
```
### Error Response

Habit not found

```
HTTP/1.1 404
{
  "message": "Could not find habit."
}
```
## Get habit by name



	GET /habits/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| name			|  <p>Habit Name</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "id": 1,
  "name": "Swim laps",
  "description": "Good for heart health",
  "created_by": 1,
  "created_at": "2019-08-27 15:32:55",
  "updated_at": "2019-08-30 04:51:31",
  "categories": [
    {
      "id": 2,
      "name": "Health",
      "description": "Habits for health"
    },
    {
      . . .
    }
  ]
}
```
### Error Response

Habit not found

```
HTTP/1.1 404
{
  "message": "Could not find habit."
}
```
## Get habit&#39;s categories



	GET /habits/:id/categories


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>Habit ID</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
[
  {
    "id": 2,
    "name": "Health",
    "description": "Habits for health"
  },
  {
    . . .
  }
]
```
### Error Response

Habit not found

```
HTTP/1.1 404
{
  "message": "Could not find habit."
}
```
## List all habits



	GET /habits


### Success Response

Success-Response:

```
HTTP/1.1 200 OK
[
  {
    "id": 1,
    "name": "Swim laps",
    "description": "Good for heart health"
  },
  {
    . . .
  }
]
```
### Error Response

List error

```
HTTP/1.1 500 Internal Server Error
```
# Users

## Add habit to user



	POST /users/:id/habits


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>User ID</p>							|
| habit_id			| Number			|  							|

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
{
  "message": "Habit {id: 6} added successfully.",
  "habits": [
    {
      "habit_id": 1,
      "name": "Yoga for 30 minutes",
      "description": "Find inner peace",
      "weighting": 0,
      "theme_color": null,
      "start_date": "2019-08-27 19:15:30",
      "end_date": "2019-09-05 19:15:30"
    },
    {
      . . .
    }
  ]
}
```
### Error Response

User not found

```
HTTP/1.1 404
{
  "message": "Could not find user."
}
```
Habit not found

```
HTTP/1.1 500
{
  "message": "Failed to add habit to user"
}
```
## Edit user information



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>User ID</p>							|
| username			| String			| **optional** <p>User's username</p>							|
| password			| String			| **optional** <p>User's password hash</p>							|
| first_name			| String			| **optional** <p>User's first name</p>							|
| last_name			| String			| **optional** <p>User's last name</p>							|
| email			| String			| **optional** <p>User's email address</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 201 Created
{
  "message": "User successfully updated."
  "user": {
    "id": 1,
    "username": "chelsea",
    "password": "fasdfuafaefnnknfwaunifw",
    "first_name": "Chelsea",
    "last_name": "Machen",
    "email": "chelsea@gmail.com"
  }
}
```
### Error Response

User not found

```
HTTP/1.1 404
{
  "message": "Could not find user."
}
```
## Get user by ID



	GET /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>User ID</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "id": 1,
  "username": "chelsea",
  "password": "fasdfuafaefnnknfwaunifw",
  "first_name": "Chelsea",
  "last_name": "Machen",
  "email": "chelsea@gmail.com"
}
```
### Error Response

User not found

```
HTTP/1.1 404
{
  "message": "Could not find user."
}
```
## Get user by username



	GET /users/u/:username


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| username			|  <p>User's username</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "id": 1,
  "username": "chelsea",
  "password": "fasdfuafaefnnknfwaunifw",
  "first_name": "Chelsea",
  "last_name": "Machen",
  "email": "chelsea@gmail.com"
}
```
### Error Response

User not found

```
HTTP/1.1 404
{
  "message": "Could not find user."
}
```
## Get user&#39;s completed habits



	GET /users/:id/habits/completed


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>User ID</p>							|

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
 [
   {
     "habit_id": 1,
     "name": "Yoga for 30 minutes",
     "completed_at": "2019-09-05 19:15:30"
   },
   {
     . . .
   }
]
```
### Error Response

User not found

```
HTTP/1.1 404
{
  "message": "Could not find user."
}
```
## Get user habits



	GET /users/:id/habits


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>User ID</p>							|

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
 [
   {
     "habit_id": 1,
     "name": "Yoga for 30 minutes",
     "description": "Find inner peace",
     "weighting": 0,
     "theme_color": null,
     "start_date": "2019-08-27 19:15:30",
     "end_date": "2019-09-05 19:15:30"
   },
   {
     . . .
   }
]
```
### Error Response

User not found

```
HTTP/1.1 404
{
  "message": "Could not find user."
}
```
## Get user&#39;s completion record for habit



	GET /users/:id/habits/completed/:habit_id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>User ID</p>							|
| habit_id			| habit_id			|  <p>Habit ID</p>							|

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
 [
   {
     "completed_at": "2019-09-05 19:15:30"
   },
   {
     . . .
   }
]
```
### Error Response

User not found

```
HTTP/1.1 404
{
  "message": "Could not find user."
}
```
## List all users



	GET /users


### Success Response

Success-Response:

```
HTTP/1.1 200 OK
[
  {
    "id": 1,
    "username": "chelsea",
    "first_name": "Chelsea",
    "last_name": "Machen",
    "email": "chelsea@gmail.com"
  },
  {
    . . .
  }
]
```
### Error Response

List error

```
HTTP/1.1 500 Internal Server Error
```
## Mark a habit completed for user&#39;s record



	POST /users/:id/habits/completed


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>User ID</p>							|
| habit_id			| Number			|  <p>Habit ID</p>							|
| completed_at			| String			| **optional** <p>Timestamp for when habit was completed. Defaults to now. Format YYYY-MM-DD HH:MM:SS</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "message": "Habit {id: 2} marked complete.",
  "record": [
    {
      "completed_at": "2019-09-05 19:15:30"
    },
    {
      . . .
    }
  ]
}
```
### Error Response

User not found

```
HTTP/1.1 404
{
  "message": "Could not find user."
}
```
User not found

```
HTTP/1.1 400
{
  "message": "User is not tracking habit. Add habit to user first before marking as complete"
}
```
## Remove a category from a habit



	DELETE /habits/:id/categories/


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>Habit ID</p>							|
| category_id			| Number			|  <p>Category ID</p>							|

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
{
  "message": "Category {id: 6} removed successfully.",
  "categories": [
    {
      "category_id": 1,
      "name": "Health",
      "description": "For your health!"
    },
    {
      . . .
    }
  ]
}
```
### Error Response

Habit not found

```
HTTP/1.1 404
{
  "message": "Could not find habit."
}
```
Category not found

```
HTTP/1.1 500
{
  "message": "Failed to remove category from habit"
}
```
## Remove a habit from a user



	DELETE /users/:id/habits/


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| id			|  <p>User ID</p>							|
| habit_id			| Number			|  <p>Habit ID</p>							|

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
{
  "message": "Habit {id: 4} removed from user.",
  "habits": [
    {
      "habit_id": 1,
      "name": "Yoga for 30 minutes",
      "description": "Find inner peace",
      "weighting": 0,
      "theme_color": null,
      "start_date": "2019-08-27 19:15:30",
      "end_date": "2019-09-05 19:15:30"
    },
    {
      . . .
    }
  ]
}
```
### Error Response

User not found

```
HTTP/1.1 404
{
  "message": "Could not find user."
}
```
User not found

```
HTTP/1.1 400
{
  "message": "User is not tracking habit. Add habit to user first before marking as complete"
}
```

