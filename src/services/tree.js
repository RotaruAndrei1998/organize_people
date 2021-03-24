export const getTree = () =>
  fetch("http://localhost:3000/getTree")
    .then((response) => response.json())
    .catch((err) => console.log(err));
export const addTreeElement = (item) =>
  fetch("http://localhost:3000/addTreeElement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...item,
      dateCreated: new Date().toISOString().substring(0, 10),
      dateUpdated: new Date().toISOString().substring(0, 10),
      parentId: null,
    }),
  })
    .then((r) => r.json())
    .catch((err) => console.log(err));

export const updateTreeElement = (item) =>
  fetch("http://localhost:3000/updateTreeElement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...item,
      dateCreated: item.dateCreated.substring(0, 10),
      dateUpdated: new Date().toISOString().substring(0, 10),
    }),
  })
    .then((r) => r.json())
    .catch((err) => console.log(err));
