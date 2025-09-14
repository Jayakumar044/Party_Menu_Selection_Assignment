import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

export default function IngredientModal({ dish, isOpen, onClose }) {
  if (!dish) return null;

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{dish.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{dish.description}</p>
        <h5>Ingredients</h5>
        <ListGroup>
          {dish.ingredients.map((ing, idx) => (
            <ListGroup.Item key={idx}>
              <strong>{ing.name}</strong>: {ing.quantity}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
