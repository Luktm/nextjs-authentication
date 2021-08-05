import { Provider } from 'next-auth/client';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

// pageProps contain getStaticProps and getServerSideProps {props: anything}
function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
