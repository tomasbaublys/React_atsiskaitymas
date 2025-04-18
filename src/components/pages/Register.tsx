import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useContext, useState, SyntheticEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import { v4 as generateID } from 'uuid';
import bcrypt from 'bcryptjs';
import styled from 'styled-components';

import UsersContext from '../../contexts/UsersContext';
import { UsersContextTypes, User } from '../../types';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const FieldWrapper = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  display: block;
  margin-bottom: 4px;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 6px;
  font-size: 12px;
  background-color: #2a2a2a;
  color: white;
  border: 1px solid #555;
  border-radius: 3px;

  &:focus {
    outline: none;
    border-color: #f5c518;
  }
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: #f56262;
  margin-top: 4px;
`;

const InfoText = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  margin-bottom: 12px;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #444;
  margin: 20px 0;
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

const BottomText = styled.p`
  font-size: 12px;
  margin-top: 16px;
  color: #ccc;
`;

const StyledLink = styled(Link)`
  color: #f5c518;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const { users, dispatch, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;

  const [open, setOpen] = useState(false);

  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const initialValues: InitValues = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    profilePicture: '',
    dob: '',
    role: 'customer',
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(4).max(20).required('Username is required.'),
    email: Yup.string().email('Enter a valid email.').required('Email is required.'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
        'Must include upper, lower, digit, special char, 8–25 characters.'
      )
      .required('Password is required.'),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match.')
      .required('Please confirm password.'),
    dob: Yup.string().required('Date of birth is required.'),
    profilePicture: Yup.string().url('Must be a valid image URL').notRequired(),
  });

  type InitValues = Omit<User, 'id' | 'passwordText'> & { passwordRepeat: string };

  const handleSubmit = (
    values: InitValues,
    { setErrors }: FormikHelpers<InitValues>
  ) => {
    const emailExists = users.some((user) => user.email === values.email);
    const usernameExists = users.some((user) => user.username === values.username);

    if (emailExists || usernameExists) {
      setErrors({
        ...(emailExists ? { email: 'Email already exists.' } : {}),
        ...(usernameExists ? { username: 'Username already exists.' } : {}),
      });
      return;
    }

    const newUser: User = {
      id: generateID(),
      username: values.username,
      email: values.email,
      password: bcrypt.hashSync(values.password, 10),
      passwordText: values.password,
      profilePicture: values.profilePicture || '/default-avatar.png',
      role: 'customer',
      dob: values.dob,
    };

    dispatch({ type: 'addUser', newUser });
    setLoggedInUser(newUser);
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    setOpen(true);
    setTimeout(() => navigate('/'), 3000);
  };

  return (
    <Page>
      <Card>
        <Title>Create account</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <FieldWrapper>
                <Label htmlFor="username">Your name</Label>
                <StyledField name="username" type="text" />
                <ErrorMessage name="username" component={ErrorText} />
              </FieldWrapper>

              <FieldWrapper>
                <Label htmlFor="email">Email</Label>
                <StyledField name="email" type="email" />
                <ErrorMessage name="email" component={ErrorText} />
              </FieldWrapper>

              <FieldWrapper>
                <Label htmlFor="dob">Date of Birth</Label>
                <StyledField name="dob" type="date" />
                <ErrorMessage name="dob" component={ErrorText} />
              </FieldWrapper>

              <FieldWrapper>
                <Label htmlFor="profilePicture">Profile Picture URL (optional)</Label>
                <StyledField name="profilePicture" type="url" placeholder="https://..." />
                <ErrorMessage name="profilePicture" component={ErrorText} />
              </FieldWrapper>

              <FieldWrapper>
                <Label htmlFor="password">Password</Label>
                <StyledField name="password" type="password" />
                <ErrorMessage name="password" component={ErrorText} />
                <InfoText>Passwords must be 8+ characters and strong.</InfoText>
              </FieldWrapper>

              <FieldWrapper>
                <Label htmlFor="passwordRepeat">Re-enter password</Label>
                <StyledField name="passwordRepeat" type="password" />
                <ErrorMessage name="passwordRepeat" component={ErrorText} />
              </FieldWrapper>

              <SubmitButton type="submit">Create account</SubmitButton>

              <Divider />

              <BottomText>
                Already have an account? <StyledLink to="/login">Sign in</StyledLink>
              </BottomText>
            </Form>
          )}
        </Formik>
      </Card>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
          Account created successfully!
        </MuiAlert>
      </Snackbar>
    </Page>
  );
};

export default Register;
