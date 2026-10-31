import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/29/08/10/snake-plant-5960115_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114510_1280.jpg", description: "Adds humidity indoors.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/plant-4850669_1280.jpg", description: "Cleans indoor air toxins.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2015/04/10/17/03/aloe-716664_1280.jpg", description: "Soothes skin & purifies air.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/10/22/lavender-828499_1280.jpg", description: "Calming scent.", cost: "$20" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2018/05/16/18/14/jasmine-3406642_1280.jpg", description: "Sweet floral scent.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating herb scent.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/27/07/34/mint-1163774_1280.jpg", description: "Fresh aroma.", cost: "$10" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2018/01/25/11/44/eucalyptus-3106024_1280.jpg", description: "Refreshing medicinal scent.", cost: "$22" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/07/11/17/47/lemon-balm-2494441_1280.jpg", description: "Citrusy relaxing fragrance.", cost: "$12" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2020/05/21/07/28/zz-plant-5199513_1280.jpg", description: "Thrives on neglect.", cost: "$25" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/pothos-3816916_1280.jpg", description: "Fast growing vine.", cost: "$12" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2020/06/07/15/58/leaves-5270921_1280.jpg", description: "Tolerates extreme shade.", cost: "$30" },
        { name: "Succulent", image: "https://cdn.pixabay.com/photo/2016/11/21/16/08/succulent-1846158_1280.jpg", description: "Requires minimal watering.", cost: "$8" },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2019/08/11/07/48/jade-plant-4398335_1280.jpg", description: "Brings good luck.", cost: "$15" },
        { name: "Chinese Evergreen", image: "https://cdn.pixabay.com/photo/2021/01/14/14/07/chinese-evergreen-5916960_1280.jpg", description: "Tolerates low light.", cost: "$22" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <h2 style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>Paradise Nursery</h2>
        <div className="nav-links">
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="flat-rectangle" height="30" width="30"><rect width="256" height="256" fill="none"></rect><path d="M184,184H69.8L41.9,34.7A8,8,0,0,0,34.1,28H16" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><circle cx="80" cy="204" r="20" fill="none" stroke="#fff" strokeWidth="16"></circle><circle cx="184" cy="204" r="20" fill="none" stroke="#fff" strokeWidth="16"></circle><path d="M62.5,144H188.1a8,8,0,0,0,7.9-6.5l14.4-72A8,8,0,0,0,202.5,56H56.1" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
            <span>{totalQuantity}</span>
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h1>{categoryObj.category}</h1>
              <div className="plant-list">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button
                      disabled={addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] || cartItems.some(item => item.name === plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
