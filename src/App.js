import { Fragment } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiAction } from './store/ui-slice';

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiAction.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data',
        })
      );
    const response = await
      fetch('https://redux-cart-1c571-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      }
    );
      if (!response.ok) {
        throw new Error('Sending cart data failed')
      }

      dispatch(
        uiAction.showNotification({
          status: 'success',
          title: 'Success...',
          message: 'Sent cart data seccessfully',
        })
      );
    }

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch(error => {
      dispatch(
        uiAction.showNotification({
          status: 'error',
          title: 'Error!...',
          message: 'sending cart data failed',
        })
      );
    })
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
