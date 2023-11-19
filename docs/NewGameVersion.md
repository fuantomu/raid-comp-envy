# Creating a new game version

To allow the creation of builds for a different game version, follow these steps:

### API

1. Add the version to the API enum `uk.raidcomp.game.version.GameVersion`

### UI

1. Add the version to the UI enum `GameVersionSlug`
2. For consistency, any new implementations of the following interfaces, as well as any game version related logic
   should go under `ui/src/lib/versions/<version slug>`
    1. Create a typescript (preferably `source.ts`) file that exports a json with the type `GameVersionSource`
    2. If the icons do not exist in the live game, implement an `IconProvider`
    3. Implement the `GameVersion` class and call the `super` constructor with the source defined above
    4. Add your implementations to `GameVersionFactory`
3. Add translations for the version and any missing class/spec/buff/utility slug
   in `ui/src/locales/<language>/game.json`

To test locally, add a mock build in the `ui/src/mocks/mock/data` directory