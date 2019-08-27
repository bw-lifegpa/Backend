# LifeGPA Backend

## Authentication

### Registering a new user

```
POST /auth/register

{
  "username": "smasher64",  *REQUIRED*
  "password": "hunter2",    *REQUIRED*
  "first_name": "George",
  "last_name": "Pinker",
  "email": "gpinker@gmail.com"
}
```

#### Success Response

```
200

{
  "id": 5,
  "username": "smasher64",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhdXJlbiIsImlhdCI6MTU2Njg5MzA0NywiZXhwIjoxNTY2OTIxODQ3fQ.AgK2pmku_n2J2Yg1V3wXT9QqHI21PF4fvNDJp5oGfM8"
}
```

### Logging in

```
POST /auth/login

{
  "username": "smasher64",  *REQUIRED*
  "password": "hunter2"     *REQUIRED*
}
```

#### Success Response

```
200

{
  "id": 5,
  "username": "smasher64",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhdXJlbiIsImlhdCI6MTU2Njg5MzA0NywiZXhwIjoxNTY2OTIxODQ3fQ.AgK2pmku_n2J2Yg1V3wXT9QqHI21PF4fvNDJp5oGfM8"
}
```

## Users

### Getting All Users

```
GET /users
```

#### Success Response

Array of User objects

```
[
  {
    ...
  },
  {
    ...
  },
  ...
]
```

### Getting Specific Users

```
GET /users/:id

or

GET /users/u/:username
```

#### Success Response

User Object

```
{
  ...
}
```

### Getting a User's Habits

```
GET /users/:id/habits
```

#### Success Response

Array of Habit objects

```
[
  {
    ...
  },
  {
    ...
  }
]
```

### Adding a Habit to a User

```
POST /users/:id/habits

{
  habit_id: 1
}
```

#### Success Response

```
{
  "message": "Habit added successfully.",
  "habits": [
    {
      ...
    },
    {
      ...
    }
  ]
}
```

### Removing a Habit from User

```
DELETE /users/:id/habits

{
  habit_id: 1
}
```

#### Success Response

```
{
  "message": "Habit removed successfully.",
  "habits": [
    {
      ...
    },
    {
      ...
    }
  ]
}
```

### Editing Users

```
PUT /users/:id
```

## Habits

### Getting All Habits

```
GET /habits
```

#### Success Response

Array of Habit objects

```
[
  {
    ...
  },
  {
    ...
  },
  ...
]
```

### Getting Specific Habits

```
GET /habits/:id

or

GET /habits/h/:habit_name
```

#### Success Response

Habit Object

```
{
  ...
}
```

### Getting a Habit's Categories

```
GET /habits/:id/categories
```

#### Success Response

Array of Category objects

```
[
  {
    ...
  },
  {
    ...
  }
]
```

### Adding a Category to a Habit

```
POST /habits/:id/categories

{
  category_id: 1
}
```

#### Success Response

```
{
  "message": "Category added successfully.",
  "categories": [
    {
      ...
    },
    {
      ...
    }
  ]
}
```

### Removing a Category from Habit

```
DELETE /habits/:id/categories

{
  category_id: 1
}
```

#### Success Response

```
{
  "message": "Category removed from habit",
  "Categories": [
    {
      ...
    },
    {
      ...
    }
  ]
}
```

### Editing and Deleting Habits

```
PUT/DELETE /habits/:id
```

## Categories

### Getting All Categories

```
GET /categories
```

#### Success Response

Array of Category objects

```
[
  {
    ...
  },
  {
    ...
  },
  ...
]
```

### Getting Specific Categories

```
GET /categories/:id

or

GET /categories/c/:category_name
```

#### Success Response

Category Object

```
{
  ...
}
```

### Getting a Category's Habits

```
GET /categories/:id/habits
```

#### Success Response

Array of Habit objects

```
[
  {
    ...
  },
  {
    ...
  }
]
```

### Editing and Deleting Categories

```
PUT/DELETE /categories/:id
```
