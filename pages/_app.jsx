import { useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import PropTypes from 'prop-types';

import '../styles/globals.css';

const propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};

/**
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const App = ({ Component, pageProps }) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const queryClient = new QueryClient();

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

App.propTypes = propTypes;

export default App;
