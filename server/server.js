const { reduce, prop, filter, equals, isNil, ifElse } = require("ramda");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { query } = require("./services/db");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.listen(port || 3000, async () => {
  console.log(`Server is listenning ok port: ${port}`);
});

app.get("/getTree", async (req, res) => {
  const all = await query(
    `(SELECT persons.id, dateCreated, dateUpdated, generalId, parentId, firstName, lastName, null as name, jobTitle from persons JOIN items WHERE persons.generalId=items.id) UNION 
      (SELECT groupps.id, dateCreated, dateUpdated, generalId, parentId,  null as firstName, null as lastName, name, null as jobTitle from groupps JOIN items WHERE groupps.generalId=items.id)`
  );
  const roots = all.filter((elem) => isNil(prop("parentId", elem)));

  const addChilds = reduce((acc, value) => {
    if (prop("name", value)) {
      return [
        ...acc,
        {
          ...value,
          content: [
            ...addChilds(
              filter(
                (el) => equals(prop("generalId", value), prop("parentId", el)),
                all
              )
            ),
          ],
        },
      ];
    }

    return [...acc, value];
  }, []);

  res.status(200).json(addChilds(roots));
});

app.post("/updateTreeElement", async (req, res) => {
  const {
    dateCreated,
    dateUpdated,
    parentId,
    firstName,
    lastName,
    name,
    jobTitle,
    generalId,
  } = req.body;

  query(
    `
    UPDATE items SET dateCreated=?, dateUpdated=?, parentId=?  WHERE (id = ?)
    `,
    [dateCreated, dateUpdated, parentId ? parentId : null, generalId]
  )
    .then(() => {
      return ifElse(
        isNil,
        () =>
          query(
            `UPDATE persons SET firstName=?, lastName=?, jobTitle=?  WHERE (generalId = ?)
    `,
            [firstName, lastName, jobTitle, generalId]
          ),
        () =>
          query(
            `UPDATE groupps SET name=?  WHERE (generalId = ?)
    `,
            [name, generalId]
          )
      )(name);
    })
    .then((data) => res.status(200).json(data));
});

app.post("/addTreeElement", async (req, res) => {
  const {
    dateCreated,
    dateUpdated,
    firstName,
    lastName,
    name,
    jobTitle,
  } = req.body;

  query(
    `
    INSERT INTO items (dateCreated, dateUpdated) VALUES (?,?)
    `,
    [dateCreated, dateUpdated]
  )
    .then((insertedItemValue) => {
      ifElse(
        isNil,
        () =>
          query(
            `INSERT INTO persons (firstName, lastName, jobTitle, generalId) VALUES (?,?,?,?)`,
            [firstName, lastName, jobTitle, prop("insertId", insertedItemValue)]
          ),
        () =>
          query(`INSERT INTO groupps (name, generalId) VALUES (?,?)`, [
            name,
            prop("insertId", insertedItemValue),
          ])
      )(name).catch((err) => res.status(400).json(err));
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});
