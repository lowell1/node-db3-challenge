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

const schemesDb = require("./dbConfig")("schemes");

const knex = require("knex");

const find = () => {
    return schemesDb.select("*");
}

const findById = _id => {
    return schemesDb.select("*").where({id: _id}).first();
}

/*select scheme_name, step_number, instructions from steps
join schemes on steps.scheme_id = 5 and schemes.id = 5 
order by step_number*/

const findSteps = id => {
    console.log(schemesDb.select(knex.raw("?", "scheme_name"), "step_number", "instructions")
    .from("steps")
    .join("schemes", "steps.scheme_id", "=", "schemes.id")
    .where({scheme_id: id})
    .orderBy("steps.step_number").toSQL());

    return schemesDb.select("scheme_name", "step_number", "instructions")
    .from("steps")
    .join("schemes", "steps.scheme_id", "=", "schemes.id")
    .where({scheme_id: id})
    .orderBy("steps.step_number");

}

module.exports = {
    find: find,
    findById: findById,
    findSteps: findSteps
}