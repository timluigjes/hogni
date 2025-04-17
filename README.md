# Hogni
version 0.0.2-alpha

A small Deno server framework with built-in caching and optimized performance.

## How to Install?

Make sure that you have Deno version 2 or higher installed. Download the source code and place it into the desired folder.

## Features

- Simple and intuitive routing
- File serving with automatic MIME type detection
- In-memory caching for improved performance
- Async file handling to prevent blocking the event loop
- Error handling and logging

## FAQ
### How to update the port?
By default it listens to port 8000, but you can change this by updating the PORT property in the .env file

### How do I add a route
Open routes.ts and add a new array entry with the following properties:
````ts
{
    method: "GET", //Or use the RouteMethod enum
    path: "/page", //Pathname given after the host (exact match)
    response: PageController.show() //Controller with the show function
}
````

For an example see [routes.ts](routes.ts) and the [Home controller](src/controllers/HomeController.ts)

### How do I serve a file?
Files are automatically served from the `public` directory. Place your files in the `public` directory and they will be accessible at the corresponding URL path.

For example, if you have a file at `public/images/logo.png`, it will be accessible at `/images/logo.png`.

The framework automatically detects file extensions and sets the appropriate MIME type.
