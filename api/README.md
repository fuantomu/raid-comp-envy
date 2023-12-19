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
$BASE: **localhost:8080/**

### Example (Get a build)
Change parameters with your sql server options
```
GET localhost:8080/build/{buildId}
```

# $BASE/player/

## POST
Tries to save/update multiple players

Parameter:
* players (array list of players)

## GET
Tries to get all players

Returns:
* players (array list of players)

# $BASE/player/{playerId}

## POST
Tries to save/update a player with the given id

Parameter:
* player

## GET
Tries to get a player with the given id

Returns:
* player or 404

# $BASE/player/delete/{playerId}

## POST
Tries to delete a player with the given id

# $BASE/build/

## GET
Tries to get all builds

Returns:
* builds (array list of all builds)

# $BASE/build/{buildId}

## POST
Tries to save/update a build

Parameter:
* build

## GET
Tries to get a build with the given id

Returns:
* build

# $BASE/build/delete/{buildId}
Tries to delete a build with the given id

# $BASE/absence/

## POST
Tries to save an absence

Parameter:
* absence

## GET
Tries to get all absences

Returns:
* absences (array list of absences)

# $BASE/absence/{absenceId}

## GET
Tries to get an absence with the given id

Returns:
* absence

# $BASE/absence/delete/{absenceId}

## POST
Tries to delete an absence with the given id
