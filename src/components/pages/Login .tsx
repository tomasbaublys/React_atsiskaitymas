import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import styled from 'styled-components';

import UsersContext from '../../contexts/UsersContext';
import { UsersContextTypes, LoginValues } from '../../types';

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

const SignInButton = styled.button`
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

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 16px;

  label {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #ccc;
  }
`;

const Checkbox = styled(Field)`
  margin-right: 6px;
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: #f56262;
  margin-top: 6px;
`;

const PasswordRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
`;

const Login = () => {
  const { users, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialValues: LoginValues = {
    email: '',
    password: '',
    stayLoggedIn: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
    const foundUser = users.find(
      (user) =>
        user.email === values.email && bcrypt.compareSync(values.password, user.password)
    );

    if (foundUser) {
      if (values.stayLoggedIn) {
        localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
      }
      setLoggedInUser(foundUser);
      navigate('/');
    } else {
      setError('Incorrect email or password.');
    }

    setSubmitting(false);
  };

  return (
    <Page>
      <Card>
        <Title>Sign in</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Label htmlFor="email">Email</Label>
                <StyledField type="email" name="email" />
                <ErrorMessage name="email" component={ErrorText} />
              </div>

              <div>
                <PasswordRow>
                  <Label htmlFor="password">Password</Label>
                </PasswordRow>
                <StyledField type="password" name="password" />
                <ErrorMessage name="password" component={ErrorText} />
              </div>

              <SignInButton type="submit" disabled={isSubmitting}>
                Sign in
              </SignInButton>

              <CheckboxRow>
                <Checkbox type="checkbox" name="stayLoggedIn" />
                <label htmlFor="stayLoggedIn">Keep me signed in</label>
              </CheckboxRow>

              {error && <ErrorText>{error}</ErrorText>}
            </Form>
          )}
        </Formik>
      </Card>
    </Page>
  );
};

export default Login;
