import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/Admin.css";

function Admin() {

  const navigate = useNavigate();
  const [foodList, setFoodList] = useState([]);

  // 🔹 Food State
  const [food, setFood] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: ""
  });

  // 🔹 Orders State
  const [orders, setOrders] = useState([]);

  // 🔹 Handle Input
  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  // 🔹 Add Food
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:5000/api/food/add", food);

    alert("Food Added Successfully!");

    // ✅ REDIRECT TO MENU PAGE
    navigate("/menu");

    setFood({
      name: "",
      price: "",
      category: "",
      image: "",
      description: ""
    });

  } catch (error) {
    console.log(error);
    alert("Error adding food");
  }
};

  // 🔹 Fetch Orders
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/order/all");
      setOrders(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
  fetchFoods();
}, []);

const fetchFoods = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/food");
    setFoodList(res.data);
  } catch (err) {
    console.log(err);
  }
};
const deleteFood = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/food/${id}`);
    alert("Food Deleted");

    // refresh list
    fetchFoods();

  } catch (err) {
    console.log(err);
  }
};

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-container">

      {/* HEADER */}
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* ADD FOOD */}
      <div className="admin-form">
        <h3>Add Food</h3>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={food.name} onChange={handleChange} required />
          <input name="price" placeholder="Price" value={food.price} onChange={handleChange} required />
          <input name="category" placeholder="Category" value={food.category} onChange={handleChange} required />
          <input name="image" placeholder="Image URL" value={food.image} onChange={handleChange} required />
          <input name="description" placeholder="Description" value={food.description} onChange={handleChange} required />
          <button type="submit">Add Food</button>
        </form>
      </div>
      <div className="admin-food-list">
  <h3>Food List</h3>

  {foodList.map((item) => (
    <div key={item._id} className="food-item">
      <p>{item.name} - ₹{item.price}</p>

      <button onClick={() => deleteFood(item._id)}>
        🗑 Delete
      </button>
    </div>
  ))}
</div>

      {/* ORDERS */}
      <div className="admin-orders">
        <h3>Orders</h3>

        {orders.length === 0 ? (
          <p>No Orders</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <p>User: {order.userId?.name || "No Name"}</p>
              <p>Amount: ₹{order.amount}</p>
              <p>Status: {order.status}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Admin;