import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch } from 'react-redux';
import cartActions from "./components/store/cartSlice";
import Notification from './components/UI/Notification';
function App() {
  const show = useSelector((state) => state.cart.visible);
  const items = useSelector((state) => state.items);
  const notification = useSelector((state) => state.cart.notification);
  const dispatch = useDispatch();


  useEffect(() => {

    const sendCartData = async () => {
      try {
        dispatch(
          cartActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!',
          })
        );
        const response = await fetch(
          'https://react-http-6b4a6.firebaseio.com/cart.json',
          {
            method: 'PUT',
            body: JSON.stringify(items),
          }
        );

        if (!response.ok) {
          throw new Error('something went wromg');

        }

        dispatch(
          cartActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Sent cart data successfully!',
          })
        );
      }

      catch (error) {
        dispatch(
          cartActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Sending cart data failed!',
          })
        );
      };

    };


    sendCartData();
  }, [items, dispatch]);



  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {show && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

//what is sonarQube extesnsion use in vs code
