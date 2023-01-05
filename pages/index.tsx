import Layout from '../components/Layout';
import Product from '../components/Product';
import Tabs from '../components/Tabs';

const Home = () => {
  return (
    <Layout>
      <div className='flex'>
        <Tabs />
      </div>
      <div className='grid grid-cols-2 gap-8'>
        <div className='flex flex-col my-5'>
          <h1 className='text-2xl font-bold'>Bullish Products</h1>
          <p className='max-w-md py-3'>We try to provide the most accurate and up-to-date list of cryptos with the most accurate rates and information.</p>
          <div className='grid grid-cols-2 gap-5'>
            {/* <Product />
            <Product /> */}
          </div>
        </div>
        <div className='flex flex-col my-5'>
          <h1 className='text-2xl font-bold'>Bearish Products</h1>
          <p className='max-w-md py-3'>We try to provide the most accurate and up-to-date list of cryptos with the most accurate rates and information.</p>
          <div className='grid grid-cols-2 gap-5'>
            {/* <Product />
            <Product /> */}
          </div>
        </div>
        <div className='flex flex-col my-5'>
          <h1 className='text-2xl font-bold'>Range Products</h1>
          <p className='max-w-md py-3'>We try to provide the most accurate and up-to-date list of cryptos with the most accurate rates and information.</p>
          <div className='grid grid-cols-2 gap-5'>
            {/* <Product />
            <Product /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
