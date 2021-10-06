# update-gatsby-dependencies

A package that will _primarily_ help a developer update gatsby dependencies to the latest stable version of gatsby dependencies

## Usage

go to the directory where the package.json file is and run:

```
 npx update-gatsby-dependencies
```

this will output a string you can use to update your alpha packages to beta

```
npm i gatsby@latest ... other packages each with @latest
```

### defaults that can be customized

### Specifying a command

you can also specify an install command but the program defaults to `npm i`

```
 npx update-gatsby-dependencies --yarn
```

```
 npx update-gatsby-dependencies -y
```

### installing dependencies

```
 npx update-gatsby-dependencies --install
```

or

```
 npx update-gatsby-dependencies -i
```

will install the dependencies

### You can specify to use yarn instead of npm

```
npx update-gatsby-dependencies  --yarn
```

would look for all dependencies that have gatsby in the name and output a command like this:

```
yarn add gatsby@latest gatsby-awesome-pagination@latest gatsby-plugin-image@latest
```

### updating a package.json file (for beta only)

you can also update the dependencies, peer dependencies and dev dependencies of a package by using the following command:

```
npx update-gatsby-dependencies --package
```

```
npx update-gatsby-dependencies -p
```

this command looks for the specific version that matches a certain tag, the default tag is latest but here npm will not retrieve the most stable version but the latest created versions:

```
npm i gatsby@next gatsby-awesome-pagination@next gatsby-plugin-image@next
```

### Using custom tags

lastly, you can specify the version tag for every install at once if needed.

```
npx update-gatsby-dependencies --version apple
```

would produce

```
npm i gatsby@apple gatsby-awesome-pagination@apple gatsby-plugin-image@apple
```

Hope this helps!

have fun updating to gatsby 4!
