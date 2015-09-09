# generator-angular-flask

> [Yeoman](http://yeoman.io) generator

## Getting Started

Make sure you have the following installed:
 - `node` and `npm`
 - `python`, `pip` and `virtualenv`

To install Yeoman, run:
```bash
npm install -g yo
```

To install generator-angular-flask from npm, run:
```bash
npm install -g generator-angular-flask
```

Finally, use the generator! Just follow the prompts!
```bash
# To create an app
yo angular-flask
# ? What's the name of your project?
# ? Which (if any) CSS pre-processor would you like to use? (Use arrow keys)
# ❯ None
#   less
#   scss
#   sass
# ? Which (if any) CSS Framework would you like to use? (Use arrow keys)
# ❯ None
#   Bootstrap
#   Foundation
#   Angular Material

# To create a new Flask controller with endpoints
yo angular-flask:endpoint
# ? What do you want to name your controller?
# ? What URL do you want this endpoint to have?
# ? What do you want the function for this endpoint to be named?
# ? What methods do you want this endpoint to accept? (Press <space> to select)
# ❯◯ GET
#  ◯ POST
#  ◯ PUT
#  ◯ DELETE
# ? Do you want to define another endpoint for this controller? (y/N)

# To create a new Angular page (a collection of components)
yo angular-flask:page
# ? What's the page name?

# To create a new Angular component (controller, directive, or service)
yo angular-flask:component
# ? What type of component would you like to create? (Use arrow keys)
# ❯ controller
#   directive
#   service
# ? What would you like the name of the controller to be?
# ? Would you like to create a new route for this controller? (y/N)
# ? What would you like that route to be?
# ? What page does the controller belong to?

# To create a new database migration
yo angular-flask:migration
# ? Please describe your migration:
```
