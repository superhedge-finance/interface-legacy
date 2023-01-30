import ProductList from '../components/products/List';

const Home = () => {
  return (
    <div className={'py-12'}>
    <span className={'bg-clip-text text-transparent bg-primary-gradient text-[68px] leading-[76px]'}>SuperHedge Products</span>
      <div className='mt-7'>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
