import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

export default function DishCard({
  dish,
  isSelected,
  onAddDish,
  onRemoveDish,
  onViewIngredients,
  onClick,
  isFocused,
}) {
  return (
    <Card
      border={isSelected ? "primary" : "light"}
      className={`shadow-sm h-100 d-flex flex-column dish-card${isFocused ? ' focused' : ''} w-100`}
      style={{ maxWidth: '320px', width: '100%' }}
      onClick={onClick}
    >
      <Card.Img
        variant="top"
        src={dish.image}   // images from public folder
        alt={dish.name}
        style={{ height: '200px', objectFit: 'cover', objectPosition: 'center' }}
      />
      <Card.Body className="d-flex flex-column flex-grow-1">
        <Card.Title className="mb-2">
          {dish.name} {isSelected && <Badge bg="info">Selected</Badge>}
        </Card.Title>
        <Card.Text className="mb-3">{dish.description}</Card.Text>
        <div className="mt-auto d-flex align-items-center justify-content-between">
          <div>
            {!isSelected ? (
              <Button
                variant="success"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddDish();
                }}
              >
                Add
              </Button>
            ) : (
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveDish();
                }}
              >
                Remove
              </Button>
            )}
          </div>
          <div className="fw-bold text-success text-center flex-grow-1">₹{dish.price}</div>
          <div>
            <Button
              variant="warning"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewIngredients();
              }}
            >
              Ingredient
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
