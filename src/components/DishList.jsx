import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import DishCard from './DishCard';

export default function DishList({
  dishes,
  selectedDishes,
  onAddDish,
  onRemoveDish,
  onViewIngredients,
}) {
  const [focusedCardId, setFocusedCardId] = useState(null);

  const handleCardClick = (id) => {
    setFocusedCardId(focusedCardId === id ? null : id);
  };

  return (
    <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-5 justify-content-center">
      {dishes.length === 0 && <p>No dishes found.</p>}
      {dishes.map((dish) => (
        <Col key={dish.id} className="d-flex justify-content-center">
          <DishCard
            dish={dish}
            isSelected={selectedDishes.includes(dish.id)}
            onAddDish={() => onAddDish(dish.id)}
            onRemoveDish={() => onRemoveDish(dish.id)}
            onViewIngredients={() => onViewIngredients(dish)}
            isFocused={focusedCardId === dish.id}
            onClick={() => handleCardClick(dish.id)}
          />
        </Col>
      ))}
    </Row>
  );
}
