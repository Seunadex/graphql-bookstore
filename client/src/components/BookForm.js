import React from "react";
import { Form, Input, Button } from "semantic-ui-react";

export default function BookForm({
  onSubmit,
  handleChange,
  title,
  genre,
  onClose
}) {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field
        label="Title"
        placeholder="Title"
        name="title"
        onChange={handleChange}
        value={title}
        control={Input}
      />

      <Form.Field
        label="Genre"
        placeholder="Genre"
        name="genre"
        onChange={handleChange}
        value={genre}
        control={Input}
      />
      <Button.Group>
        <Form.Button positive>Submit</Form.Button>
        <Button.Or />
        <Button onClick={onClose}>Cancel</Button>
      </Button.Group>
    </Form>
  );
}
