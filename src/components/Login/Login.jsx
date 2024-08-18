import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../AuthContext'; // Import your AuthContext

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/product' } }; // Default redirect path
  const { setUser } = useAuth(); // Get setUser from AuthContext

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required!'),
    password: Yup.string()
      .required('Password is required!'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    validationSchema.validate(values)
      .then(() => {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const user = registeredUsers.find(user => user.email === values.email && user.password === values.password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          setUser(user); // Set user in AuthContext
          navigate(from); // Redirect to the previous page or default path
        } else {
          alert('Invalid email or password');
        }
        setSubmitting(false);
      })
      .catch(error => {
        console.error('Form validation failed:', error.errors);
        setSubmitting(false);
      });
  };

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className='login'>
              <div className='form'>
                <span>Login</span>
                <Field type="email" name="email" placeholder="Enter email id" className="form-control inp_text" />
                <ErrorMessage name="email" component="div" className="error" />
                <Field type="password" name="password" placeholder="Enter password" className="form-control" />
                <ErrorMessage name="password" component="div" className="error" />
                <button type="submit" disabled={isSubmitting}>Login</button>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
