# Chronicles
### Full-Stack Blog Application

## Description

##### Chronicles is a simple and dynamic blog application built using Next.js, Express, and MongoDB. The platform is built for the purpose of creating and engaging with blog content

## Features

* User Authentication: Users can create accounts, log in, and log out with ease.
* Oauth: Users can also create accounts and log in with Github or Google accounts.
* Blog posts: Users can create and publish blog posts(edit and delete functionlity not included yet).
* Comments and Likes: Users can engage through comments and likes on each post.
* Password Management: Users can change password securely to maintain account integrity.
* Forgot Password/Password reset: Users can reset their password through email.
* Dynamic Theme Switching: Dark/Light theme feature to ensure custom reading experience.

## Installation
##### To run Chronicles on your local machine, clone or download the repository and follow these steps:
#### To run the Express backend:
Change into the project directory e.g
```
cd server
```
Install dependencies:
```
npm install
```
Start the dev server:
```
npm start
```
The development server will start at http://localhost:5000.

#### To run the NextJS frontend:
Change into the project directory e.g
```
cd chronicles
```
Install dependencies:
```
npm install
```
Start the dev server:
```
npm run dev
```
The development server will start at http://localhost:3000. You can open this URL in your web browser to view Chronicles.

## Set up environmental variables

#### For Express backend:
##### Create a .env file in the root directory,
##### You need to set the following in your .env file:
- `FRONTEND_URL`: The URL of the frontend application.
- `SECRET_KEY`: The secret key for session management.
- `MONGODB_URI`: The URI of your MongoDB database.
optionally:
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID.
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret.
- `GITHUB_CLIENT_ID`: Your GitHub OAuth client ID.
- `GITHUB_CLIENT_SECRET`: Your GitHub OAuth client secret.
- `EMAIL_HOST_USER`: The host user of your email service.
- `EMAIL_HOST_APP_PASSWORD`: The password for your email service.

#### For NextJS:
##### in your .env.local file,
##### You need to set the following in your .env.local file:
 - `BACKEND_URL`: The URL of the backend application.
 - `FRONTEND_URL`: The URL of the frontend application.

## Usage

1. Open Chronicles in your browser
2. Before signing up/signing in, you can read other blogpost(but you can't create one or comment on it)
3. Click on the "Sign Up" link to create a new account. Fill in the required details.
4. It will redirect you to log in your details after signing up but if you already have an account, click on "Sign In" and enter your credentials.
5. Click on write to create a new blogpost, fill in the title, author name, and content for your blog post. Then Click "Publish"
6. Interact with your post and other posts.

## Licensed by MIT
