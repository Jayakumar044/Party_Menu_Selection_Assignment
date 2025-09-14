import React, { useState } from 'react';
import { Container, Button, Badge, Alert } from 'react-bootstrap';
import { dishes } from './data/mockDishes';
import Filters from './components/Filters';
import DishList from './components/DishList';
import IngredientModal from './components/IngredientModal';
import OrderSummaryModal from './components/OrderSummaryModal';

export default function MainApp({ user, logout }) {

  const [selectedCategory, setSelectedCategory] = useState('STARTER');
  const [searchTerm, setSearchTerm] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [modalDish, setModalDish] = useState(null);
  const [isIngredientOpen, setIsIngredientOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.mealType === selectedCategory &&
      (!vegOnly || dish.type === 'VEG') &&
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDish = (id) => {
    setSelectedDishes((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleRemoveDish = (id) => {
    setSelectedDishes((prev) => prev.filter((dishId) => dishId !== id));
  };

  const handleViewIngredients = (dish) => {
    setModalDish(dish);
    setIsIngredientOpen(true);
  };

  const handleCloseIngredient = () => {
    setIsIngredientOpen(false);
    setModalDish(null);
  };

  const categoryList = ['STARTER', 'MAIN COURSE', 'DESSERT', 'SIDES'];

  const categoryCounts = categoryList.map(
    (cat) =>
      selectedDishes.filter((id) => dishes.find((d) => d.id === id)?.mealType === cat)
        .length
  );

  const totalSelected = selectedDishes.length;

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Party Menu Selection</h2>
        <Button variant="outline-danger" onClick={logout}>
          Logout ({user.username})
        </Button>
      </div>

      <Filters
        activeCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        vegOnly={vegOnly}
        onVegOnlyChange={setVegOnly}
      />

      <DishList
        dishes={filteredDishes}
        selectedDishes={selectedDishes}
        onAddDish={handleAddDish}
        onRemoveDish={handleRemoveDish}
        onViewIngredients={handleViewIngredients}
      />

      <Alert variant="primary" className="mt-4">
        <strong>Selected (STARTER | MAIN COURSE | DESSERT | SIDES):</strong>{' '}
        {categoryCounts.join(' | ')}
      </Alert>

      <div className="d-flex align-items-center gap-3">
        <span><strong>Total Selected:</strong></span>
        <Badge bg="success" pill style={{ fontSize: '1.2rem' }}>
          {totalSelected}
        </Badge>
        <Button
          variant="dark"
          disabled={totalSelected === 0}
          onClick={() => setIsSummaryOpen(true)}
          className="ms-auto"
        >
          Continue
        </Button>
      </div>

      <IngredientModal
        dish={modalDish}
        isOpen={isIngredientOpen}
        onClose={handleCloseIngredient}
      />

      <OrderSummaryModal
        show={isSummaryOpen}
        onHide={() => setIsSummaryOpen(false)}
        selectedDishes={selectedDishes}
        dishes={dishes}
      />
    </Container>
  );
}
