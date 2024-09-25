'use client';

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Minus } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import './page.css';

const categories = [
  'Meat',
  'Fish',
  'Dairy',
  'Produce',
  'Bakery',
  'Pantry',
  'Other',
];

const foodItems = [
  {
    id: 1,
    name: 'Banana',
    expiry_date: '2023-12-31',
    quantity: 1,
    category: 'Produce',
    image: '/images/banana.png',
  },
  {
    id: 2,
    name: 'Bread',
    expiry_date: '2023-12-31',
    quantity: 2,
    category: 'Bakery',
    image: '/images/bread.webp',
  },
  {
    id: 3,
    name: 'Eggs',
    expiry_date: '2023-12-31',
    quantity: 12,
    category: 'Dairy',
    image: '/images/eggs.jpeg',
  },
  {
    id: 4,
    name: 'Cheese',
    expiry_date: '2023-12-31',
    quantity: 1,
    category: 'Dairy',
    image: '/images/cheese.jpg',
  },
  {
    id: 5,
    name: 'Yogurt',
    expiry_date: '2023-12-31',
    quantity: 4,
    category: 'Dairy',
    image: '/images/yoghurt.png',
  },
  {
    id: 6,
    name: 'Apples',
    expiry_date: '2023-12-31',
    quantity: 6,
    category: 'Produce',
    image: '/images/apples.png',
  },
  {
    id: 7,
    name: 'Chicken',
    expiry_date: '2023-12-31',
    quantity: 2,
    category: 'Meat',
    image: '/images/chicken.jpg',
  },
  {
    id: 8,
    name: 'Tomatoes',
    expiry_date: '2023-12-31',
    quantity: 5,
    category: 'Produce',
    image: '/images/tomato.jpeg',
  },
];

export default function Home() {
  const [selectedFood, setSelectedFood] = useState(null);
  
  //FOR NEW ITEM
  const [formOpen, setFormOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    expiry_date: '',
    quantity: '',
  });

  const handleSubmit = (e) => {
        // Fire POST API call with details in newItem
    e.preventDefault();
    setFormOpen(false);
    console.log(newItem);
  };
  
  const handleCategoryChange = (value) => {
    setNewItem({
      ...newItem,
      category: event.target.value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
      [category]: value,
    });
  };

  // FOR EDIT CURRENT ITEM
  const handleQuantityChange = (change, e) => {
    if (e) e.preventDefault();
    if (selectedFood) {
      setSelectedFood({
        ...selectedFood,
        quantity: Math.max(0, selectedFood.quantity + change),
      });
    }
  };

  const handleEditSubmit = (e) => {
    // Fire edit API call with details in selectedFood
    e.preventDefault();
    console.log('handleEditSubmit');
    setSelectedFood(null);
  };

  const handleModify = (e) => {
    const { name, value } = e.target;
    setSelectedFood({
      ...selectedFood,
      [name]: value,
    });
  };


  return (
    <div className="container">
      <h1>Food Expiry Tracker</h1>
      <ScrollArea className="scrollArea">
        <div className="foodGrid">
          {foodItems.map((item) => (
            <Card
              key={item.id}
              className="foodItem"
              onClick={() => setSelectedFood(item)}
            >
              <CardContent className="foodItemContent">
                <h2>{item.name}</h2>
                <p>x{item.quantity}</p>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="foodImage"
                />
                <p>Expires on: {item.expiry_date} </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="hoverButtonWrapper">
        <Button className="hoverButton" onClick={() => setFormOpen(true)}>
          <Plus className="buttonIcon" />
        </Button>
      </div>

      {formOpen && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlayContent">
            <form className="productForm" onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                />
              </label>
              <label for="cars">Choose a produce type:</label>
              <select
                name="category"
                id="category"
                onChange={handleCategoryChange}
              >
                <option value="meat">Meat</option>
                <option value="fish">Fish</option>
                <option value="dairy">Dairy</option>
                <option value="produce">Produce</option>
                <option value="bakery">Baker</option>
                <option value="pantry">Pantry</option>
                <option value="other">Other</option>
              </select>

              <button type="submit">Enter</button>
            </form>
          </div>
        </div>
      )}

      {selectedFood && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlayContent">
            <form className="productForm" onSubmit={handleEditSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={selectedFood.name}
                  onChange={(e) => {
                    handleModify(e);
                  }}
                  required
                />
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] justify-between"
                  >
                    {selectedFood.category}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onSelect={() => {
                        const updatedFood = {
                          ...selectedFood,
                          category: category,
                        };
                        setSelectedFood(updatedFood);
                      }}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="imageContainer">
                <Image
                  src={selectedFood.image}
                  alt={selectedFood.name}
                  width={200}
                  height={200}
                  className="foodImage"
                />
              </div>
              <label>
                Expires On:
                <input
                  type="text"
                  name="expiry_date"
                  value={selectedFood.expiry_date}
                  onChange={(e) => {
                    handleModify(e);
                  }}
                  required
                />
              </label>
              Quantity:
              <div className="quantityControl">
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  aria-label="Decrease quantity"
                >
                  <Minus className="icon" />
                </Button>
                <span className="quantity">{selectedFood.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="icon" />
                </Button>
              </div>
              <Button className="closeButton" type="submit">
                Save
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
