import { useContext } from "react";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage, FieldInputProps } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import UsersContext from "../../contexts/UsersContext";
import BooksContext from "../../contexts/BooksContext";
import { UsersContextTypes, BooksContextTypes, Book } from "../../types";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #181818;
  color: white;
  min-height: 100vh;
  padding: 3rem 1rem;
`;

const Card = styled.div`
  width: 320px;
  background-color: #1f1f1f;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px 25px;
  color: white;
`;

const Title = styled.h2`
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
  display: block;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 6px;
  font-size: 12px;
  background-color: #2a2a2a;
  color: white;
  border: 1px solid #555;
  border-radius: 3px;
  margin-bottom: 8px;

  &:focus {
    outline: none;
    border-color: #f5c518;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 6px;
  font-size: 12px;
  background-color: #2a2a2a;
  color: white;
  border: 1px solid #555;
  border-radius: 3px;
  margin-bottom: 8px;

  &:focus {
    outline: none;
    border-color: #f5c518;
  }
`;

const SubmitButton = styled.button`
  background-color: #f5c518;
  border: none;
  border-radius: 20px;
  width: 100%;
  padding: 7px 0;
  font-size: 12px;
  margin-top: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #181818;

  &:hover {
    background-color: #e2b33c;
  }
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: #f56262;
  margin-top: 6px;
`;

const AddBook = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const { addNewBook } = useContext(BooksContext) as BooksContextTypes;

  const initialValues = {
    title: '',
    description: '',
    image: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(6, "Title must be at least 6 characters")
      .max(30, "Title must be shorter than 30 symbols.")
      .required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .max(300, "Description must not be longer than 300 symbols")
      .required("Description is required"),
    image: Yup.string()
      .url("Must be a valid URL")
      .notRequired()
      .trim()
  });

  const handleSubmit = (values: typeof initialValues) => {
    const newBook: Book = {
      id: uuid(),
      title: values.title,
      description: values.description,
      image: values.image || "https://placehold.co/600x850?text=No+Image",
      userId: loggedInUser!.id,
      createdAt: new Date().toISOString(),
      saved: false
    };

    addNewBook(newBook);
    navigate("/");
  };

  return (
    <Page>
      <Card>
        <Title>Add a New Book</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <Label htmlFor="title">Title</Label>
              <StyledField name="title" type="text" />
              <ErrorMessage name="title" component={ErrorText} />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Field name="description">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <StyledTextarea {...field} rows={4} />
                )}
              </Field>
              <ErrorMessage name="description" component={ErrorText} />
            </div>

            <div>
              <Label htmlFor="image">Image URL (optional)</Label>
              <StyledField name="image" type="text" />
              <ErrorMessage name="image" component={ErrorText} />
            </div>

            <SubmitButton type="submit">Add Book</SubmitButton>
          </Form>
        </Formik>
      </Card>
    </Page>
  );
};

export default AddBook;
