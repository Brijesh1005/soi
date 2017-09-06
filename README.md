## Set up

###### Get code and install dependencies
```
git clone <<url>>
npm install
```

###### Get all server side stuffs
[Mongoose](http://macappstore.org/mongoose/), [mongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/), [express](http://expressjs.com/en/starter/installing.html) and [node js](https://nodejs.org/en/)

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

## Data archiving and purging

Purge Process

[Data purging](https://www.datavail.com/blog/what-is-data-purging/) is the process of freeing up space in the database or of deleting obsolete data that is not required by the system. The purge process can be based on the age of the data or the type of data.

Archive Process

[Data archiving](http://searchdatabackup.techtarget.com/definition/data-archiving) is the process of backing up the obsolete data that will be deleted during the purge process. During the archive process, data will be moved from the main transactional tables to the backup tables.

Know the deference between [Purge and delete](http://stackoverflow.com/questions/12085699/differences-between-purge-and-delete-files)

