# update-gatsby-dependencies

A package that will _primarily_ help a developer update gatsby v4 dependencies from alpha to beta (but also has support for other minor features)

## Usage

go to the directory where the package.json file is and run:

```
 npx update-gatsby-dependencies
```

this will output a string you can use to update your alpha packages to beta

### defaults that can be customized

- searches for dependencies that have the alpha tag(alpha-9689ff) in the version
- outputs a string that has npm i as the install command
- each dependency will have the @next after it

```
npm i gatsby@next ... other packages each with @next
```

### Specifying a command

you can also specify an install command but the program defaults to `npm i`

```
 npx update-gatsby-dependencies yarn add
```

### adding flags

```
 npx update-gatsby-dependencies npm i -f
```

### Specifying a package type or name to look for

you can also specify a package type(or name) to look for

```
PACKAGE_TYPE='Gatsby' npx update-gatsby-dependencies
```

```
PACKAGE_NAME='Gatsby' npx update-gatsby-dependencies
```

would look for all dependencies that have gatsby in the name and output a command like this:

```
npm i gatsby@next gatsby-awesome-pagination@next gatsby-plugin-image@next
```

### Specifying a package version to look for

you can also specify a package type(or name) to look for

```
PACKAGE_TYPE='Gatsby' npx update-gatsby-dependencies
```

```
PACKAGE_NAME='Gatsby' npx update-gatsby-dependencies
```

would look for all dependencies that have gatsby in the name and output a command like this:

```
npm i gatsby@next gatsby-awesome-pagination@next gatsby-plugin-image@next
```

### Using custom tags

lastly, you can specify the version tag for every install at once if needed.

```
GATSBY_VERSION_TAG='apple' npx update-gatsby-dependencies
```

would produce

```
npm i gatsby@apple gatsby-awesome-pagination@apple gatsby-plugin-image@apple
```

Hope this helps!

have fun updating to gatsby 4!
