import React from "react";
import { Tabs, Tab, Form } from "react-bootstrap";

const categories = ["STARTER", "MAIN COURSE", "DESSERT", "SIDES"];
export default function Filters({
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  vegOnly,
  onVegOnlyChange,
}) {
  return (
    <div className="mb-4">
      <Tabs
        activeKey={activeCategory}
        onSelect={onCategoryChange}
        className="mb-3"
        justify
      >
        {categories.map((cat) => (
          <Tab eventKey={cat} title={cat} key={cat} />
        ))}
      </Tabs>
      <Form className="d-flex mb-2 flex-column flex-sm-row gap-2">
        <Form.Control
          type="search"
          placeholder="Search dish..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="me-sm-2"
          id="searchDish" 
          name="searchDish" 
          autoComplete="off"
        />
        <Form.Check
          type="switch"
          label="Veg Only"
          checked={vegOnly}
          onChange={(e) => onVegOnlyChange(e.target.checked)}
          id="vegOnlySwitch" 
          name="vegOnlySwitch"
        />
      </Form>
    </div>
  );
}
