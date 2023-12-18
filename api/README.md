# Micronaut and Azure Function

## Prerequisites

- Latest [Function Core Tools](https://aka.ms/azfunc-install)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/)
- [MariaDB Connector](https://mariadb.com/kb/en/about-mariadb-connector-j/)


## Build Tools

The application's build uses [Azure Functions Plugin for Gradle](https://plugins.gradle.org/plugin/com.microsoft.azure.azurefunctions).
## Running the function locally

```cmd
./gradlew run
```

## Endpoints
$BASE: **localhost:8080/builds**

Always requires a connectionstring object with the following parameters:
* server
* port
* database
* uid
* password
* table

### Example (Get a build)
Change parameters with your sql server options
```
POST to localhost:8080/builds/load with body:
{
  "server": "localhost",
  "port": 3306,
  "database": "raidcomp_api",
  "uid": "admin",
  "password": "admin",
  "table": "BuildEntity",
  "build": "TestBuild"
}
```

# $BASE/roster/import
Tries to import the roster from the given table

Returns:
* players (array, list of player objects)

# $BASE/roster/save
Tries to save the given roster

Parameters:
* players (array, list of player objects)

# $BASE/roster/delete
Tries to delete players from the roster

Parameters:
* players (array, list of player objects)

# $BASE/save
Tries to save a build

Parameters:
* players (array, list of player objects)
* build (string, name of the build)

# $BASE/load
Tries to load a build

Parameters:
* build (string, name of the build)

Returns:
* players (string, player objects)

# $BASE/delete
Tries to delete a build

Parameters:
* build (string, name of the build)

# $BASE/loadAll
Tries to load all build names

Returns:
* builds (array, list of all build names)

# $BASE/absence/save
Tries to save an absence

Parameters:
* name (string, name of the player)
* startDate (long, start time in milliseconds from 01.01.1970)
* endDate (long, end time in milliseconds from 01.01.1970)
* reason (string, absence reason)

# $BASE/absence/load
Tries to load absences by name
Parameters:
* name (string, name of the player)

Returns:
* absence (Array, list of all absences)
