# How to Get a TMDB API Key

Follow these steps to obtain a valid API key from The Movie Database (TMDB):

## Step 1: Create a TMDB Account
1. Go to [TMDB website](https://www.themoviedb.org/signup)
2. Sign up for a new account (it's free)
3. Verify your email address

## Step 2: Request an API Key
1. Log in to your TMDB account
2. Go to your [account settings](https://www.themoviedb.org/settings/api)
3. Click on "Create" under "Request an API Key"
4. Select "Developer" option
5. Fill out the form with the following information:
   - **Type of Use**: Personal/Educational Project
   - **Application Name**: MovieBox App
   - **Application URL**: (Leave blank if you don't have one)
   - **Application Summary**: A movie discovery application built with React for educational purposes
   - **Accept the terms of use**

## Step 3: Get Your API Key
1. After approval, you'll be taken to a page with your API key details
2. Look for the "API Key (v3 auth)" section
3. Copy the API key (it should look like a string of letters and numbers, e.g., `1a2b3c4d5e6f7g8h9i0j`)

## Step 4: Add the API Key to Your Project
1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following line to the file:
```
VITE_TMDB_API_KEY=your_api_key_here
```
3. Replace `your_api_key_here` with your actual TMDB API key
4. Restart the development server

## Testing Your API Key
1. After restarting the server, open your application
2. If movies are loading correctly, your API key is working
3. If you see an error message, check the console for more details

## Troubleshooting
- Make sure the `.env` file is in the root directory of your project
- Ensure the variable name is exactly `VITE_TMDB_API_KEY`
- Vite requires environment variables to be prefixed with `VITE_` to be accessible in the client-side code
- Try using the API key directly in a browser request: `https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY_HERE`
- Check the [TMDB API documentation](https://developers.themoviedb.org/3/getting-started/introduction) for more information
