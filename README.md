## Set up

###### Get code and install dependencies
```
git clone <<url>>
npm install
```

###### Get all server side stuffs
[Mongoose](http://macappstore.org/mongoose/), [mongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/), [express](http://expressjs.com/en/starter/installing.html) and [node js](https://nodejs.org/en/)

###### Get client side stuffs
1. Go to url https://facebook.github.io/react-native/docs/getting-started.html
2. Select proper Mobile OS and Development OS
3. Follow Installing Dependencies instructions

###### Running the app
1. Server
    1. Start mongo server: `mongod <path to db>`
    2. To make our node server continuously running we used [Forever](https://github.com/foreverjs/forever/tree/3aa17a1088eb812eb03b49219e329fb4a48b4dfc). There are couple of other [process managers for express app](https://expressjs.com/en/advanced/pm.html).
    3. Start node server: `npm run start:dev`

| Command | Description |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `npm run server` | Starts the node server, but any change in server files needs restart of node server. |
| `npm run start:dev` | Starts the node server and forget about it. [Forever](https://github.com/foreverjs/forever/tree/3aa17a1088eb812eb03b49219e329fb4a48b4dfc) will do restarting job for you. This command runs forever continuously in terminal and logs output in terminal. |
| `npm run forever:startdev` | Starts the node server and forget about it. [Forever](https://github.com/foreverjs/forever/tree/3aa17a1088eb812eb03b49219e329fb4a48b4dfc) will do restarting job for you. This command spuns up a daemon process and logs the output at `~/.forever/` |
| `npm run forever:stopAll` | Stops all forever daemons and long running terminal processes |
| `npm run forever:restartAll` | Restart all forever daemons and long running terminal processes |
| `npm run forever:list` | List out details of all forever daemons and long running terminal processes |

2. Client
Start the emulator and application.
    1. Start emulator:
      -`android avd`, select your device and click on start.
      - Alternatively, open Android Studio > Tools > Android > AVD Manager and start the device
    2. Start react native application on port 8088:
      - `react-native start --port=8088`
    3. Start logger:
      - `adb logcat` or `react-native log-android`

Configure application.
    1. Take the current system IP `ifconfig`
    2. Update IP address in src/utils/config.js file. It will make a connection between application and DB using port 8098
    3. Update the IP address of application (in emulator) to tell it where the server is running.
        - Open application soi in emulator and press `cmd + M` > Dev Settings > Debug server host and port for devices
        -  A pop will appear, enter server details here:
          `<IP address>:8088`

## Tech stack

- [React-native](https://facebook.github.io/react-native/)
- [Redux](http://redux.js.org/)
- [Android studio](https://facebook.github.io/react-native/docs/getting-started.html)
- [Watchman](https://github.com/facebook/watchman) - Watchman exists to watch files and record when they actually change. It can also trigger actions (such as rebuilding assets) when matching files change.
- [Forever](https://www.npmjs.com/package/forever) - A simple cli based tool to ensure the scripts runs continuously.

### Some links

- [Hybrid apps](https://www.upwork.com/hiring/mobile/should-you-build-a-hybrid-mobile-app/)
- [Hybrid App framework](https://www.upwork.com/hiring/mobile/hybrid-mobile-app-frameworks/)
- [React Native](https://www.upwork.com/hiring/mobile/react-native-hybrid-app-development/)
- [Popular mobile framework for hybrid HTML5 apps](http://techslides.com/best-mobile-frameworks-and-platforms-for-hybrid-html5-apps)
- [React Native examples](https://react.rocks/tag/ReactNative)
- [React Native docs](https://facebook.github.io/react-native/docs/running-on-device.html)
- [Debugging in React native](https://facebook.github.io/react-native/docs/debugging.html)
- [Hot Reloading](https://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html)
- [Troubleshooting](https://facebook.github.io/react-native/docs/troubleshooting.html)
- [Running on Device](https://facebook.github.io/react-native/docs/running-on-device.html)
- [State Tree design Redux](https://hackernoon.com/avoiding-accidental-complexity-when-structuring-your-app-state-6e6d22ad5e2a#.t9nep2f6n)
- [Population in mongoose](http://mongoosejs.com/docs/populate.html)
- [Events in node](https://nodejs.org/api/events.html)
- [Data archiving](http://searchdatabackup.techtarget.com/definition/data-archiving)
- [Data purging](https://www.datavail.com/blog/what-is-data-purging/)
- [React native icon set](https://github.com/oblador/react-native-vector-icons)
- [React native navigator](http://blog.paracode.com/2016/01/05/routing-and-navigation-in-react-native/)
- [Redux Selectors](http://redux.js.org/docs/recipes/ComputingDerivedData.html)

### React native plugins

| Plugin | Description | Android support | iOS support
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------:|:----------:
| [Native elements](https://react-native-training.github.io/react-native-elements/) | A wonderful place to look for your favorite tools to build apps. It has enhanced UI for the native controls and have some of it's own as well. The community is pretty active and has badge, icons, search bar, checkboxes, card, tile etc. | Yes | Yes |
| [SwipeListView](https://github.com/jemise111/react-native-swipe-list-view) | Gives the ability for a row in a list view to do left or right swipe. You can decide on the UI to be visible after swipe finishes and also customize any action on them. The library has pretty extensive useful options like, renderRow, renderHiddenRow, swipeToOpenPercent, previewFirstRow, tension and friction control etc. | Yes | Yes |
| [Simple Toast](https://www.npmjs.com/package/react-native-simple-toast) | It's a pretty basic toast message displaying plugin. The message will disappear in around 5 secs. Nothing is much configurable here, the only purpose it servers is to notify user about actions. | Yes | Yes |
| [Star Rating](https://github.com/djchie/react-native-star-rating) | An interactive star rating plugin which uses [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) to display the stars. Lots of customization options are available. | Yes | Yes |
| [Modal](https://github.com/react-native-community/react-native-modal) | The plugin is used to display content inside modal. Lots of animation options, modal UI and modal show/hide handlers makes it a perfect choice for our application. | Yes | Need to test in iOS |

### React native options

- http://shoutem.github.io/docs/ui-toolkit/animation/introduction - Good but it's doc is not properly define the properties
- http://nativebase.io/docs/v0.5.13/components#anatomy - Both Android and iOS. Also an alternative
- http://whatpixel.com/react-native-material-library/ - Only Android
- https://github.com/react-native-community/react-native-elements - Documentation is good

## Data archiving and purging

Purge Process

[Data purging](https://www.datavail.com/blog/what-is-data-purging/) is the process of freeing up space in the database or of deleting obsolete data that is not required by the system. The purge process can be based on the age of the data or the type of data.

Archive Process

[Data archiving](http://searchdatabackup.techtarget.com/definition/data-archiving) is the process of backing up the obsolete data that will be deleted during the purge process. During the archive process, data will be moved from the main transactional tables to the backup tables.

Know the deference between [Purge and delete](http://stackoverflow.com/questions/12085699/differences-between-purge-and-delete-files)

## Troubleshooting

1. Running react-native in another port
```
react-native start --port=8088
```

2. To connect to server
```
cmd + M debug server details:
<IP>:<port> eg. 192.168.1.109:8088
```

3. **Error: React packager ready. Error building DepdendencyGraph:** TypeError: Cannot read property 'root' of null
solution: brew update && brew upgrade watchman

4. ** SyntaxError: Strict mode does not allow function declarations in a lexically nested statement **
Solution:
```
open node_modules\react-native\Libraries\Core\InitializeCore.js line 112

change function handleError(e, isFatal) to var handleError = function(e, isFatal)

then do npm start -- --reset-cache
```

5. To see all underlying android errors for react native is simply running `adb logcat` or `react-native log-android` in terminal

6. Since your Android device has an IP of its own, you need to point the URL to your computers IP address instead of just localhost. For example fetch('http://192.168.0.2:3333/').

7. **Error: In this environment the sources for assign MUST be an object.This error is a performance optimization and not spec compliant.**
Issue:
  StyleSheet.create does not return a plane javascript object
Solution:
  [Stylesheet.flatten](https://facebook.github.io/react-native/docs/stylesheet.html#flatten) is a way to dynamically update
  styles in children components

Implement:
1. Implement edit and delete groups  -- Khushboo  
2. Implement flowdock auth.
3. Navigation on browser back button.
4. Server deployment.

Fix Issues:
1. Add a loading indicator in view all.
2. If there are no users, show a proper message and hide all other details.
