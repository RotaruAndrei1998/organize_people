import React, { useState, useEffect } from "react";
import { equals, prop, isNil, ifElse, pipe } from "ramda";
import { Form, Button } from "react-bootstrap";
import { addTreeElement, updateTreeElement } from "../../services/tree";

const isGroup = equals("group");
const formatDate = date => date.substring(0,10);

const ModalForm = ({ item, handleReload, onClose }) => {
  const [formValues, setFormValues] = useState(item);
  const [type, setType] = useState("people");

  useEffect(() => {
    if (prop("content", item)) {
      setType("group");
    }
  }, [item]);

  const onSubmit = (e) => {
    e.preventDefault();
    ifElse(
      isNil,
      () => addTreeElement(formValues),
      () => updateTreeElement(formValues)
    )(item).then(() => handleReload());
    onClose();
  };

  return (
    <>
      {!item && (
        <Form.Check
          type="switch"
          id="type"
          label="Add group"
          checked={isGroup(type)}
          onChange={(e) => setType(e.target.checked ? "group" : "people")}
        />
      )}
      <Form onSubmit={onSubmit}>
        {isGroup(type) && (
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={prop("name", formValues)}
              onChange={(e) =>
                setFormValues((formValues) => ({
                  ...formValues,
                  name: e.target.value,
                }))
              }
              placeholder="Enter name"
            />
          </Form.Group>
        )}
        {!isGroup(type) && (
          <Form.Group controlId="first_name">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              value={prop("firstName", formValues)}
              onChange={(e) =>
                setFormValues((formValues) => ({
                  ...formValues,
                  firstName: e.target.value,
                }))
              }
              placeholder="Enter first name"
            />
          </Form.Group>
        )}
        {!isGroup(type) && (
          <Form.Group controlId="last name">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              value={prop("lastName", formValues)}
              onChange={(e) =>
                setFormValues((formValues) => ({
                  ...formValues,
                  lastName: e.target.value,
                }))
              }
              placeholder="Enter last name"
            />
          </Form.Group>
        )}
        {!isGroup(type) && (
          <Form.Group controlId="job title">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              value={prop("jobTitle", formValues)}
              onChange={(e) =>
                setFormValues((formValues) => ({
                  ...formValues,
                  jobTitle: e.target.value,
                }))
              }
              placeholder="Enter job title"
            />
          </Form.Group>
        )}
        {item && (
          <>
            <Form.Group controlId="date created">
              <Form.Label>Date created</Form.Label>
              <Form.Control
                type="text"
                value={pipe(prop("dateCreated"), formatDate)(formValues)}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="date updated">
              <Form.Label>Date updated</Form.Label>
              <Form.Control
                type="text"
                value={prop("dateUpdated", formValues)}
                readOnly
              />
            </Form.Group>
          </>
        )}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ModalForm;
