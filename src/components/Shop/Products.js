import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'My First Book',
    decription: 'The first book i ever wrote',
  },
  {
    id: 'p2',
    price: 6,
    title: 'My Second Book',
    decription: 'The Second book i ever wrote',
  }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.decription}
        />
      ))}
      </ul>
    </section>
  );
};

export default Products;
