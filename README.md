# MongoDB - schema.js #

[Project Page](http://skratchdot.com/projects/mongodb-schema/)  
[Source Code](https://github.com/skratchdot/mongodb-schema/)  
[Issues](https://github.com/skratchdot/mongodb-schema/issues/)  

## Description: ##

This is a schema analysis tool for MongoDB. It accomplishes this by
extended the mongo shell, and providing a new function called schema()
with the following signature:  

    DBCollection.prototype.schema = function (optionsOrOutString)  

The schema() function accepts all the same parameters that the mapReduce() function
does. It adds/modifies the following 4 parameters that can be used as well:

    wildcards - array (default: [])
        By using the $, you can combine report results.
        For instance: '$' will group all top level keys and
        'foo.$.bar' will combine 'foo.baz.bar' and 'foo.bar.bar'

    arraysAreWildcards - boolean (default: true)
        When true, 'foo.0.bar' and 'foo.1.bar' will be
        combined into 'foo.$.bar'
        When false, all array keys will be reported

    fields - object (default: {})
        Similar to the usage in find(). You can pick the
        fields to include or exclude. Currently, you cannot 
        pass in nested structures, you need to pass in dot notation keys.

    limit - number (default: 50)
        Behaves the same as the limit in mapReduce(), but defaults to 50.
        You can pass in 0 or -1 to process all documents.

## Usage: ##

    // Return schema results inline
    db.users.schema();
    
    // Create and store schema results in the 'users_schema' collection
    db.users.schema('users_schema'); // Option 1
    db.users.schema({out:'users_schema'}); // Option 2
    db.users.schema({out:{replace:'users_schema'}}); // Option 3
    
    // Only report on the key: 'name.first'
    db.users.schema({fields:{'name.first':1}});
    
    // Report on everything except 'name.first'
    db.users.schema({fields:{'name.first':-1}});
    
    // Combine the 'name.first' and 'name.last' keys into 'name.$'
    db.users.schema({wildcards:['name.$']});
    
    // Don't treat arrays as a wildcard
    db.users.schema({arraysAreWildcards:false});
    
    // Process 50 documents
    db.users.schema();
    
    // Process all documents
    db.users.schema({limit:-1});

## Caveats: ##

By design, schema() returns 'bson' rather than 'object'.
It will return 'numberlong' rather than 'number', etc.

## Installation: ##

Download: [schema.js](https://github.com/skratchdot/mongodb-schema/raw/master/schema.js)

### Option 1 ###

Add this script to your .mongorc.js file.  

See: [http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js](http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js)

### Option 2 ###

Start the shell after executing this script  

    mongo --shell schema.js

## Inspired by: ##

Variety: [https://github.com/JamesCropcho/variety](https://github.com/JamesCropcho/variety)
