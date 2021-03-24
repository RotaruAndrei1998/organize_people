import React from "react";
import { ifElse, map, prop, __ } from "ramda";
import People from "./people";
import Group from "./group";

const renderTreeElement = (handleReload) =>
  map((element) => {
    return ifElse(
      prop("content"),
      () => (
        <Group group={element} handleReload={handleReload}>
          {renderTreeElement(handleReload)(prop("content", element))}
        </Group>
      ),
      () => <People people={element} handleReload={handleReload} />
    )(element);
  });

export default renderTreeElement;
