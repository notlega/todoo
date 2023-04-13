import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { object, string } from 'yup';
import cn from 'classnames';

const Login = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const [loginError, setLoginError] = useState('');

  const loginSchema = object().shape({
    email: string().email('Invalid email').required('Email is required'),
    password: string().required('Password is required'),
  });

  const loginHandler = async (email, password) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError('Invalid email or password. Please try again.');
      return;
    }

    router.push(`view/${data.user.id}`);
  };

  return (
    <div className="hero min-h-screen !mt-0">
      <div className="hero-content flex-col text-center justify-center space-y-8 w-full">
        <h1 className="text-5xl font-bold w-full">Sign In</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            loginHandler(values.email, values.password);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              className="form-control justify-center space-y-4 w-full md:w-1/2"
              onSubmit={handleSubmit}
            >
              {loginError.length !== 0 && (
                <div className="alert alert-error shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{loginError}</span>
                  </div>
                </div>
              )}
              {errors.email && (
                <label
                  className={cn('label', {
                    '!mt-0': loginError.length !== 0,
                  })}
                >
                  <span className="label-text text-error">{errors.email}</span>
                </label>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={cn('input input-bordered', {
                  'input-error !mt-0': errors.email,
                })}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.password && (
                <label className="label !mt-0">
                  <span className="label-text text-error">
                    {errors.password}
                  </span>
                </label>
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={cn('input input-bordered', {
                  'input-error !mt-0': errors.password,
                })}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <button type="submit" disabled={isSubmitting} className="btn">
                Login
              </button>
            </form>
          )}
        </Formik>
        <div className="flex flex-row justify-between w-full md:w-1/2 !mt-0">
          <div
            className="tooltip tooltip-bottom"
            data-tip="This feature is not ready yet!"
          >
            <button className="link text-gray-400 cursor-not-allowed" disabled>
              Forgot Password?
            </button>
          </div>
          <div
            className="tooltip tooltip-bottom"
            data-tip="This feature is not ready yet!"
          >
            <button className="link text-gray-400 cursor-not-allowed" disabled>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
