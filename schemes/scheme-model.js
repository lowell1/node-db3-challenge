/*

- `find()`:
  - Calling find returns a promise that resolves to an array of all schemes in the database.
  - No steps are included.
- `findById(id)`:
  - Expects a scheme `id` as its only parameter.
  - Resolve to a single scheme object.
  - On an invalid `id`, resolves to `null`.
- `findSteps(id)`:
  - Expects a scheme `id`.
  - Resolves to an array of all correctly ordered step for the given scheme: 
  `[ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, 
  { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ]`.
  - This array should include the `scheme_name` _not_ the `scheme_id`.
- `add(scheme)`:
  - Expects a scheme object.
  - Inserts scheme into the database.
  - Resolves to the newly inserted scheme, including `id`.
- `update(changes, id)`:
  - Expects a changes object and an `id`.
  - Updates the scheme with the given id.
  - Resolves to the newly updated scheme object.
- `remove(id)`:
  - Removes the scheme object with the provided id.
  - Resolves to the removed scheme
  - Resolves to `null` on an invalid id.
  - (Hint: Only worry about removing the `scheme`. The database is configured to automatically remove all associated steps.)

*/

const schemesDb = require("./db-config");

const find = () => {
    return schemesDb.select("*").from("schemes");
}

const findById = id => {
    return schemesDb.select("*").from("schemes").where({id: id}).first();
}

/*select scheme_name, step_number, instructions from steps
join schemes on steps.scheme_id = 5 and schemes.id = 5 
order by step_number*/

const findSteps = id => {
    return schemesDb("steps").select("scheme_name", "step_number", "instructions")
    // .from("steps")
    .join("schemes", "steps.scheme_id", "=", "schemes.id")
    .where({scheme_id: id})
    .orderBy("steps.step_number");
}

const add = newScheme => {
    return schemesDb("schemes")
    .insert(newScheme)
    .then(([id]) => findById(id));
}

const update = (changes, id) => {
    return schemesDb("schemes")
    .where({id: id})
    .update(changes)
    .then(count => (count ? findById(id) : null));
}

const remove = id => {
    return schemesDb("schemes")
    .where({id: id})
    .del();
}

module.exports = {
    find: find,
    findById: findById,
    findSteps: findSteps,
    add: add,
    update: update,
    remove: remove
}