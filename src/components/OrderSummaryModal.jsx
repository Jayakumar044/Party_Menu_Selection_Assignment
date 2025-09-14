import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

export default function OrderSummaryModal({ show, onHide, selectedDishes, dishes }) {
  const selectedItems = dishes.filter((dish) => selectedDishes.includes(dish.id));
  const totalPrice = selectedItems.reduce((sum, dish) => sum + dish.price, 0);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedItems.length === 0 ? (
          <p>No items selected.</p>
        ) : (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Dish Name</th>
                <th>Category</th>
                <th>Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((dish) => (
                <tr key={dish.id}>
                  <td>{dish.name}</td>
                  <td>{dish.mealType}</td>
                  <td>₹{dish.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <h5 className="text-end">Total: ₹{totalPrice}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" disabled={selectedItems.length === 0}>
          Pay Now
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
