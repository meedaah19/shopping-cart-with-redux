import { Fragment } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';

export let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
  if (isInitial) {
    isInitial = false;
    return;
  }

  if (cart.changed) {
    dispatch(sendCartData(cart));
  }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
        status= {notification.status}
        title = {notification.title}
        message = {notification.message}
        />
      )}
      <Layout>
      {showCart &&  <Cart />} 
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
