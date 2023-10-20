const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

// Create an array to store shopping list items
const shoppingList = [
  { id: 1, item: 'Apples', price: 3.00 },
  { id: 2, item: 'Bananas', price: 4.50},
  { id: 3, item: 'Milk', price: 5.00},
];

// GET all items
app.get('/items', (req, res) => {
  res.json(shoppingList);
});

// POST to add a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  shoppingList.push(newItem);
  res.status(201).json(newItem);
});

// GET an item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = shoppingList.find((i) => i.id === itemId);

  if (!item) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    res.json(item);
  }
});

// PATCH an item by ID
app.patch('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = shoppingList.findIndex((i) => i.id === itemId);

  if (itemIndex === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    const updatedItem = req.body;
    shoppingList[itemIndex] = { ...shoppingList[itemIndex], ...updatedItem };
    res.json(shoppingList[itemIndex]);
  }
});

// DELETE an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = shoppingList.findIndex((i) => i.id === itemId);

  if (itemIndex === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    shoppingList.splice(itemIndex, 1);
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});