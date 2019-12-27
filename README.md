# Articles Parser

This parser allows you to parse and save articles, provides access to the library of articles available on your computer.

## Getting Started

#####npm: 

```
npm install parsing_articles
```

### Using

At the moment, there are 3 scenarios in the application that will be offered to the user when the script is run.
1. Parsing of articles with 2 available modules
2. Reading articles
3. Clearing the library.

###Parsing
Carried out by existing modules. 
The module code is in /utils/parsers/ParserStrategy.js
In the future, it should be distributed among modules for the full implementation of the factory. 
The configuration of each module must be stored in /config/sites_config.js and represent an object with the necessary fields.
If parsing is successful, the articles are added to /libraries by default or in the place that you define with the 1st argument when running the script.



## Authors

* **lakkinzi_music** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

