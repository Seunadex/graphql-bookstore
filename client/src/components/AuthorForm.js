import React from "react";
import { Form, Input, Button } from "semantic-ui-react";

export default function AuthorForm({
  onSubmit,
  handleChange,
  name,
  age,
  onCancel,
  edit
}) {
  return (
    <Form onSubmit={onSubmit} className="shift-left">
      <Form.Field
        label="Name"
        placeholder="Name"
        name="name"
        onChange={handleChange}
        value={name}
        control={Input}
      />

      <Form.Field
        label="Age"
        placeholder="Age"
        name="age"
        onChange={handleChange}
        value={age}
        control={Input}
      />
      <Button.Group>
        <Form.Button positive>Submit</Form.Button>
        {edit && <Button.Or />}
        {edit && <Button onClick={onCancel}>Cancel</Button>}
      </Button.Group>
    </Form>
  );
}
