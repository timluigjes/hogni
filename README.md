# Hogni
version 0.0.1-alpha

A small Deno server framework.

## How to Install?

Make sure that you have Deno version 2 or higher installed. Download the source code and place it into the desired folder

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
This is not possible yet, but is something that is planned soon.