import { useState } from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import {
  UserAppMetadata,
  UserIdentity,
  Factor,
  UserMetadata,
} from '@supabase/supabase-js';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { BsTrash3 } from 'react-icons/bs';

const propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      descriptions: PropTypes.string,
      start_date: PropTypes.instanceOf(Date),
      end_date: PropTypes.instanceOf(Date),
      created_at: PropTypes.instanceOf(Date),
      deleted_at: PropTypes.instanceOf(Date),
    }),
  ),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    app_metadata: PropTypes.instanceOf(UserAppMetadata).isRequired,
    user_metadata: PropTypes.instanceOf(UserMetadata).isRequired,
    aud: PropTypes.string.isRequired,
    confirmation_sent_at: PropTypes.string.isRequired,
    recovery_sent_at: PropTypes.string,
    email_change_sent_at: PropTypes.string,
    new_email: PropTypes.string,
    invited_at: PropTypes.string,
    action_link: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    confirmed_at: PropTypes.string,
    email_confirmed_at: PropTypes.string,
    phone_confirmed_at: PropTypes.string,
    last_sign_in_at: PropTypes.string,
    role: PropTypes.string,
    updated_at: PropTypes.string,
    identities: PropTypes.arrayOf(PropTypes.instanceOf(UserIdentity)),
    factors: PropTypes.arrayOf(PropTypes.instanceOf(Factor)),
  }).isRequired,
};

const getServerSideProps = async (context) => {
  const { id } = context.params;
  const supabaseClient = createServerSupabaseClient(context);
  const { data } = await supabaseClient.auth.getUser();

  if (data.user === null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { data: todos, error } = await supabaseClient.rpc('get_todos', {
    _user_id: id,
  });

  console.log(todos);

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      todos,
      user: data.user,
    },
  };
};

/**
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const ViewTodos = ({ todos, user }) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const [todoArr, setTodoArr] = useState(todos);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();

    router.push('/');
  };

  const handleDelete = async (id, index) => {
    const { error } = await supabaseClient.from('todos').delete().eq('id', id);

    if (error) {
      setErrorMsg(error.message);
    }

    setTodoArr((prevArr) => prevArr.splice(index, 1));
  };

  return (
    <div className="mx-auto mt-14 max-w-5xl space-y-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Email: {user.email}</h1>
        <div className="space-x-2">
          <Link className="btn" href="/new-todo">
            New Todo
          </Link>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {errorMsg.length !== 0 && (
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
            <span>{errorMsg}</span>
          </div>
        </div>
      )}
      <table className="table w-full">
        <thead>
          <tr>
            <th scope="col">{}</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {todoArr.length !== 0 ?
            todoArr.map((todo, index) => (
              <tr key={todo.id}>
                <th scope="row">{index + 1}</th>
                <td>{todo.name}</td>
                <td>{todo.descriptions}</td>
                <td>
                  {DateTime.fromISO(todo.start_date).toFormat(
                    "EEEE',' MMMM d',' h:mm a",
                  )}
                </td>
                <td>
                  {DateTime.fromISO(todo.end_date).toFormat(
                    "EEEE',' MMMM d',' h:mm a",
                  )}
                </td>
                <td>
                  <Link
                    href={{
                      pathname: '/update',
                      query: { training: todo.id },
                    }}
                  >
                    Edit
                  </Link>
                </td>
                <td className="py-4 px-6 text-right">
                  <button onClick={() => handleDelete(todo.id, index)}>
                    <BsTrash3 />
                  </button>
                </td>
              </tr>
            )) : <tr className='text-center'><td colSpan="7" className='text-2xl font-bold'>No todos found</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

ViewTodos.propTypes = propTypes;

export { getServerSideProps };
export default ViewTodos;
