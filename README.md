# update-gatsby-dependencies

A package that will update gatsby v4 dependencies from alpha to beta

## Usage

go to the directory where the package.json file is and run:

```
 npx update-gatsby-dependencies
```

this will output a string you can use to update your alpha packages to beta

you can also specify an install command but the program defaults to npm i

```
 npx update-gatsby-dependencies yarn add
```

```
 npx update-gatsby-dependencies npm i -f
```
