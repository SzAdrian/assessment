import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  prettyDOM,
  within,
  waitForDomChange,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../../App";

test("add new user button is visible", () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("add-user-button")).toBeVisible();
});

test("clicking add new user button opens add new user modal", () => {
  const { getByTestId } = render(<App />);
  const addButton = getByTestId("add-user-button");
  fireEvent.click(addButton);
  const modalTitle = getByTestId("modal-title");
  expect(modalTitle).toHaveTextContent("Add New User");
});
test("sending the form empty shows error", async () => {
  const { getByTestId } = render(<App />);
  const addButton = getByTestId("add-user-button");
  fireEvent.click(addButton);
  const modal = getByTestId("modal-content");
  fireEvent.click(modal.querySelector("button[type=submit]"));
  await waitForDomChange(modal);
  expect(
    modal.querySelector("#first_name_input-helper-text")
  ).toHaveTextContent("CAN'T BE BLANK");
  expect(modal.querySelector("#last_name_input-helper-text")).toHaveTextContent(
    "CAN'T BE BLANK"
  );
});

test("'more menu' button is visible", async () => {
  const { getAllByTestId } = render(<App />);
  const firstMoreMenuButton = await waitForElement(
    () => getAllByTestId("more-menu-button")[0],
    {
      timeout: 4000,
    }
  );
  expect(firstMoreMenuButton).toBeVisible();
});
test("clicking 'more menu' button opens menu", async () => {
  const { getByTestId, getAllByTestId } = render(<App />);
  const firstMoreMenuButton = await waitForElement(
    () => getAllByTestId("more-menu-button")[0],
    {
      timeout: 4000,
    }
  );
  fireEvent.click(firstMoreMenuButton);
  const moreMenu = getByTestId("more-menu-list" + firstMoreMenuButton.id);
  expect(moreMenu).toBeVisible();
});

test("edit button is visible in more menu", async () => {
  const { getByTestId, getAllByTestId, getByText } = render(<App />);
  const firstMoreMenuButton = await waitForElement(
    () => getAllByTestId("more-menu-button")[0]
  );
  const rowID = firstMoreMenuButton.id;
  fireEvent.click(firstMoreMenuButton);

  const moreMenu = getByTestId("more-menu-list" + rowID);

  expect(within(moreMenu).getByText("Edit")).toBeVisible();
});
test("lock button is visible in more menu", async () => {
  const { getByTestId, getAllByTestId, getByText } = render(<App />);
  const firstMoreMenuButton = await waitForElement(
    () => getAllByTestId("more-menu-button")[0]
  );
  const rowID = firstMoreMenuButton.id;
  fireEvent.click(firstMoreMenuButton);

  const moreMenu = getByTestId("more-menu-list" + rowID);
  expect(
    prettyDOM(
      within(moreMenu).getByText((content) =>
        ["Locked", "Active"].includes(content)
      )
    )
  );
});
test("clicking lock button changes button state", async () => {
  const { getByTestId, getAllByTestId, getByText } = render(<App />);
  const firstMoreMenuButton = await waitForElement(
    () => getAllByTestId("more-menu-button")[0]
  );
  const rowID = firstMoreMenuButton.id;
  fireEvent.click(firstMoreMenuButton);

  const moreMenu = getByTestId("more-menu-list" + rowID);

  const lockButton = within(moreMenu).getByText((content) =>
    ["Locked", "Active"].includes(content)
  );
  const initialButtonText = lockButton.textContent;
  fireEvent.click(lockButton);
  await waitForDomChange(lockButton);
  if (initialButtonText === "Locked") {
    expect(lockButton.textContent).toEqual("Active");
  } else {
    expect(lockButton.textContent).toEqual("Locked");
  }
});

test("clicking edit button opens edit modal", async () => {
  const { getByTestId, getAllByTestId, getByText } = render(<App />);
  const firstMoreMenuButton = await waitForElement(
    () => getAllByTestId("more-menu-button")[0]
  );
  const rowID = firstMoreMenuButton.id;
  fireEvent.click(firstMoreMenuButton);

  const moreMenu = getByTestId("more-menu-list" + rowID);

  fireEvent.click(within(moreMenu).getByText("Edit"));

  const modalTitle = getByTestId("modal-title");
  expect(modalTitle).toHaveTextContent("Edit User");
});
