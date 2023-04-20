# wayfinderAPI

** Obsolete **

An Exercise on REST API creation using express. The API Lists skills from a TTRPG called pathfinder 1e.

This API listens to the port: 3001

Endpoints:

GET METHOD

* /skills - returns a json with all skills.
* /skills/:id - returns a json with a single skill that has a skillId matching the url's id.
* /skills/search?q=<skillname> - returns a json with a single skill that has a name matching the query.

POST METHOD

* /skills - adds a new skill taken from the request body.

PUT METHOD

* /skills/:id - edits a skill that has a matching skillId.

DELETE METHOD

* /skills/:id -  deletes a skill that has a matching skillId

Changes in this api does not persist.

This is my first API using what i learned at the time. I Will no longer work on this project and will now focus on building a version 2 with more features and with what i learned soo far.
