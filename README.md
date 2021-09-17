# update-gatsby-dependencies

A package that will _primarily_ help a developer update gatsby v4 dependencies from alpha to beta (but also has support for other minor features)

## Usage

go to the directory where the package.json file is and run:

```
 npx update-gatsby-dependencies
```

this will output a string you can use to update your alpha packages to beta

### Specifying a command

you can also specify an install command but the program defaults to npm i

```
 npx update-gatsby-dependencies yarn add
```

### adding flags

```
 npx update-gatsby-dependencies npm i -f
```

### Specifying a package type

you can also specify a package type to look for

```
PACKAGE_TYPE='Gatsby' npx update-gatsby-dependencies
```

would look for all gatsby packages that include gatsby in their name

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
