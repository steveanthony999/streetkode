import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProducts, reset } from '../features/products/productSlice';

import SingleProduct from '../components/SingleProduct';

const Shop = () => {
  const dispatch = useDispatch();

  const { products, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log('error: ');
      console.log(message);
    }

    dispatch(getAllProducts());
  }, [dispatch, isError, message]);

  //   useEffect(() => {
  //     console.log(products);
  //   }, [products]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {products &&
        products.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
    </div>
  );
};

export default Shop;
