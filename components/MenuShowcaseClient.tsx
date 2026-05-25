"use client";
import { useState, useRef, useCallback } from "react";
import ExportedImage from "next-image-export-optimizer";

type MenuItem = {
  name: string;
  desc?: string;
  price: string;
  tag?: string;
  plate: number;
  image?: string;
};

type Category = {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
};

const PLATES = 5;
const p = (i: number) => `/images/menu/plate${((i % PLATES) + PLATES) % PLATES + 1}.png`;
const beverageCategoryIds = new Set([
  "hot-beverage",
  "cold-beverage",
  "refreshers",
  "smoothies-shakes",
  "juices-tea",
  "whiskey",
  "vodka-gin-rum-tequila",
  "wine",
  "domestic-liquor",
  "liquor-shots-beer",
  "cocktails",
  "mocktails",
  "basics",
]);
const getMenuImage = (item: MenuItem) =>
  item.image
    ? { src: item.image, isFallback: false }
    : { src: p(item.plate - 1), isFallback: true };

const categories: Category[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    emoji: "🍳",
    items: [
      { name: "Choice of Egg", desc: "Plain Omelet / Masala Omelet / Poached / Scrambled / Fried Egg", price: "NPR 180", plate: 1 },
      { name: "Toast", desc: "Toast with Jam Butter", price: "NPR 100", plate: 2 },
      { name: "Add-ons", desc: "Hash Brown / Bacon / Ham / Sausage", price: "NPR 150", plate: 3 },
      { name: "Greenyard Big Breakfast", desc: "Sautéed Broccoli, Mushroom, Lyonnaise Potato, Chicken Sausage / Bacon, Choice of Eggs, Toast, Jam Butter, Fruit Bowl, Tea / Coffee / Fresh Juice", price: "NPR 595", tag: "Signature", plate: 4 },
      { name: "Breakfast Stack", desc: "Homemade Hash Brown, Grilled Chicken, Sliced Avocado & Poached Eggs", price: "NPR 375", plate: 5 },
      { name: "Waffle", desc: "Homemade Special Batter served with Seasonal Fresh Fruits & Caramel Sauce", price: "NPR 475", plate: 1 },
      { name: "Breakfast Sandwich", desc: "Crispy Bacon / Chicken Sausage, Hash Brown & Scrambled Egg Cheese", price: "NPR 295", plate: 2 },
      { name: "Healthy Salad Bowl", desc: "Mixed Lettuce, Tomato, Bell Pepper, Cucumber, Boiled Chick Pea, Avocado, Boiled Egg, Shredded Grilled Chicken", price: "NPR 550", tag: "Healthy", plate: 3 },
      { name: "Pizza Omelette", desc: "Beaten Eggs, Marinara Sauce, Cheese served with Brown Bread", price: "NPR 340", plate: 4 },
      { name: "Life of Pei", desc: "Cottage Cheese, Turmeric, Green Capsicum served with Creamy Spinach, Baked Beans & Bread", price: "NPR 490", plate: 5 },
      { name: "Tow to Tango", desc: "Masala Omelette, Mashed Potato served with Brown Bread", price: "NPR 290", plate: 1 },
      { name: "Smoothie", desc: "Seasonal Fruits", price: "NPR 550", plate: 2 },
      { name: "Fresh Seasonal Fruit Salad", desc: "Served with Fresh Fruits & Sweet Yogurt", price: "NPR 395", plate: 3 },
    ],
  },

  {
    id: "soup",
    label: "Soup",
    emoji: "🍲",
    items: [
      { name: "Clear Soup", desc: "Chicken / Mushroom / Mixed", price: "NPR 275 / 275 / 320", plate: 1 },
      { name: "Cream Soup", desc: "Chicken / Mushroom / Mixed", price: "NPR 340 / 320 / 350", plate: 2 },
      { name: "Hot & Sour Soup", desc: "Veg / Chicken", price: "NPR 325 / 375", plate: 3 },
      { name: "Veg Soup", desc: "Classic Vegetable Soup", price: "NPR 250", plate: 4 },
      { name: "Thai Soup", desc: "Thai-style soup", price: "NPR 240", plate: 5 },
      { name: "Tum Yum Gai", desc: "Veg / Chicken / Shrimp", price: "NPR 400 / 470 / 550", tag: "Thai Style", plate: 1 },
    ],
  },

  {
    id: "salad",
    label: "Salad",
    emoji: "🥗",
    items: [
      { name: "Green Salad", desc: "Cucumber, Carrot, Radish, Tomato, Onion, Lemon Wedge", price: "NPR 240", plate: 2, image: "/images/menu/Green%20salad.png" },
      { name: "Avocado Salad", desc: "Fresh avocado salad", price: "NPR 405", tag: "Healthy", plate: 3 },
      { name: "Russian Salad", desc: "Classic Russian-style salad", price: "NPR 440", plate: 4 },
      { name: "Fresh Seasonal Fruit Salad", desc: "Served with Fresh Fruits & Sweet Yogurt", price: "NPR 395", plate: 5 },
      { name: "Caesar Salad", desc: "Veg / Chicken / Bacon — all salad served with Garlic Bread", price: "NPR 300 / 450 / 525", plate: 1 },
    ],
  },

  {
    id: "asian-non-veg",
    label: "Asian Selection Non-Veg",
    emoji: "🍗",
    items: [
      { name: "Chicken Roast", desc: "Asian-style roasted chicken", price: "NPR 480", plate: 1 },
      { name: "Chicken Sadeko", desc: "Spiced Nepali-style chicken sadeko", price: "NPR 420", plate: 2 },
      { name: "Chicken Chhoila", desc: "Traditional spicy chicken chhoila", price: "NPR 450", plate: 3 },
      { name: "Timur Chicken", desc: "Marinated with Spice Herbs, served with Local Piseko Achhar", price: "NPR 665", tag: "Local Flavor", plate: 4, image: "/images/menu/Timur%20chicken.png" },
      { name: "Mustang Chicken", desc: "Mustang-style spicy chicken", price: "NPR 550", plate: 5 },
      { name: "Mutton Pakku", desc: "Traditional mutton pakku", price: "NPR 800", plate: 1 },
      { name: "Sukuti Sadeko", desc: "Spiced dried meat sadeko", price: "NPR 525", plate: 2 },
      { name: "Badel Tareko / Badel Dameko / Sadeko", desc: "Wild boar prepared fried / grilled / sadeko style", price: "NPR 750", plate: 3 },
      { name: "Pork Tareko", desc: "Fried pork preparation", price: "NPR 525", plate: 4, image: "/images/menu/Pork%20tareko.png" },
      { name: "Pork Thhebe", desc: "Marinated with Himalayan Spice, served with Mula ko Thhebe", price: "NPR 630", plate: 5 },
    ],
  },

  {
    id: "asian-veg",
    label: "Asian Selection Veg",
    emoji: "🥦",
    items: [
      { name: "Masala Papad", desc: "Spiced crispy papad", price: "NPR 140", plate: 1 },
      { name: "Peanut Sadeko", desc: "Spiced peanut sadeko", price: "NPR 245", plate: 2 },
      { name: "Mustang Aloo", desc: "Mustang-style spicy potato", price: "NPR 290", tag: "Popular", plate: 3 },
      { name: "Mushroom Chhoila", desc: "Spiced mushroom chhoila", price: "NPR 390", plate: 4, image: "/images/menu/Mushroom%20choila.png" },
      { name: "Mushroom Chilly", desc: "Chilly-style mushroom", price: "NPR 390", plate: 5 },
      { name: "Paneer Chilly", desc: "Paneer cooked in spicy chilly sauce", price: "NPR 425", plate: 1 },
      { name: "Paneer Pakoda", desc: "Crispy fried paneer pakoda", price: "NPR 425", plate: 2 },
      { name: "Veg Pakoda", desc: "Mixed vegetable fritters", price: "NPR 350", plate: 3 },
      { name: "Tofu Chilly", desc: "Tofu cooked in chilly sauce", price: "NPR 310", plate: 4 },
      { name: "Crispy Spicy Mushroom", desc: "Crispy fried spicy mushroom", price: "NPR 390", plate: 5 },
    ],
  },

  {
    id: "appetizers",
    label: "Appetizers",
    emoji: "🍟",
    items: [
      { name: "Italian Bruschetta", desc: "Mushroom, Basil Leaf, Tomato, Caramelized Onion, Olives, Capers", price: "NPR 475", plate: 1 },
      { name: "Sweet Corn", desc: "Boiled / Fried / Sautéed", price: "NPR 325", plate: 2 },
      { name: "French Fries / Cheesy Fries", desc: "Classic fries or cheesy fries", price: "NPR 275 / 325", plate: 3 },
      { name: "Chilly Chips", desc: "Spicy chilly potato chips", price: "NPR 350", plate: 4 },
      { name: "Onion Rings", desc: "Crunchy rings served with Thousand Island Sauce", price: "NPR 325", plate: 5 },
      { name: "Fish Bites", desc: "Served with Tartar Sauce & Lemon Wedge", price: "NPR 450", plate: 1 },
      { name: "Chicken Chilly", desc: "Chicken cooked in chilly sauce", price: "NPR 450", plate: 2, image: "/images/menu/Chicken%20chilly.png" },
      { name: "Sausage Chilly / Fry", desc: "Sausage prepared chilly or fried style", price: "NPR 350 / 250", plate: 3 },
      { name: "Pork Chilly", desc: "Spicy pork chilly", price: "NPR 525", plate: 4 },
      { name: "Chicken 65", desc: "Spicy fried chicken starter", price: "NPR 450", plate: 5, image: "/images/menu/Chicken%2065.png" },
      { name: "Hot Garlic Chicken Wings", desc: "Served with Side Salad & Ranch Dip", price: "NPR 560", tag: "Popular", plate: 1 },
      { name: "Loaded Nacho", desc: "Veg / Non-veg — served with Salsa, Sour Cream & Guacamole", price: "NPR 480 / 580", plate: 2, image: "/images/menu/Loaded%20Nachos.png" },
      { name: "Chilly Garlic Shrimp Skewers", desc: "Served with Side Salad & Thai Dipping Sauce", price: "NPR 590", plate: 3 },
      { name: "Chilly Cheese Toast", desc: "Toasted bread with cheese and chilly flavor", price: "NPR 325", plate: 4 },
      { name: "Volcano Shrimps", desc: "Marinated with Tabasco Sauce, Hot Sauce & Paprika", price: "NPR 785", plate: 5 },
      { name: "Pan Sautéed Chicken", desc: "Marinated with Green Herbs Muscles with Sesame Oil", price: "NPR 650", plate: 1 },
      { name: "Boiled", desc: "Chicken / Mixed Veg", price: "NPR 390 / 325", plate: 2 },
      { name: "Chicken Kurkure", desc: "Crunchy chicken bites", price: "NPR 480", plate: 3 },
      { name: "Chicken Nuggets", desc: "Crispy chicken nuggets", price: "NPR 540", plate: 4 },
      { name: "Chicken Manchurian", desc: "Chicken / Veg", price: "NPR 425 / 375", plate: 5 },
      { name: "Dragon Chicken", desc: "Spicy dragon-style chicken", price: "NPR 550", tag: "Spicy", plate: 1 },
      { name: "Sesame Chicken", desc: "Chicken tossed with sesame flavor", price: "NPR 490", plate: 2 },
      { name: "Singapore Fish Fry", desc: "Singapore-style fried fish", price: "NPR 600", plate: 3 },
    ],
  },

  {
    id: "sekuwa",
    label: "Sekuwa",
    emoji: "🍖",
    items: [
      { name: "Mutton Sekuwa", desc: "Per plate", price: "NPR 650", plate: 1, image: "/images/menu/Mutton%20sekuwa.png" },
      { name: "Chicken Sekuwa", desc: "Per plate", price: "NPR 450", plate: 2, image: "/images/menu/Chicken%20sekuwa.png" },
      { name: "Pork Sekuwa", desc: "Per plate", price: "NPR 495", plate: 3 },
      { name: "Mutton Sekuwa by Kg", desc: "Half kg / 1 kg", price: "NPR 1,650 / 3,190", plate: 4 },
      { name: "Chicken Sekuwa by Kg", desc: "Half kg / 1 kg", price: "NPR 850 / 1,450", plate: 5 },
      { name: "Pork Sekuwa by Kg", desc: "Half kg / 1 kg", price: "NPR 895 / 1,590", plate: 1 },
    ],
  },

  {
    id: "chinese",
    label: "Chinese",
    emoji: "🥡",
    items: [
      { name: "Garlic Fried Rice", desc: "Veg / Chicken / Mixed", price: "NPR 280 / 425 / 485", plate: 1 },
      { name: "Keema Noodles", desc: "Chicken / Mushroom & Tofu", price: "NPR 350", plate: 2 },
      { name: "Fried Tofu with Chili Garlic Sesame", desc: "Tofu fried with chili garlic sesame flavor", price: "NPR 350", plate: 3 },
    ],
  },

  {
    id: "momo",
    label: "Momo",
    emoji: "🥟",
    items: [
      { name: "Veg Momo", desc: "Steam / Fry / Kothey / Chilly / Jhol", price: "NPR 200 / 230 / 255 / 290 / 310", plate: 1, image: "/images/menu/Veg%20stem%20Momo.png" },
      { name: "Chicken Momo", desc: "Steam / Fry / Kothey / Chilly / Jhol / Jhaneko", price: "NPR 290 / 320 / 350 / 360 / 370 / 500", tag: "Popular", plate: 2 },
    ],
  },

  {
    id: "nepali-indian",
    label: "Nepali / Indian Dishes",
    emoji: "🍛",
    items: [
      { name: "Mutton Curry", desc: "Traditional mutton curry", price: "NPR 425", plate: 1 },
      { name: "Chicken Curry", desc: "Classic chicken curry", price: "NPR 375", plate: 2 },
      { name: "Paneer Curry", desc: "Paneer cooked in curry gravy", price: "NPR 375", plate: 3 },
      { name: "Veg Curry", desc: "Mixed vegetable curry", price: "NPR 250", plate: 4 },
      { name: "Plain Rice / Dill Rice / Saffron Rice", desc: "Plain Rice / Dill Rice with Methi / Saffron Rice", price: "NPR 140 / 200 / 250", plate: 5 },
    ],
  },

  {
    id: "biryani",
    label: "Biryani",
    emoji: "🍚",
    items: [
      { name: "Biryani Medium", desc: "Veg / Paneer / Chicken / Mutton", price: "NPR 395 / 550 / 695 / 750", plate: 1 },
      { name: "Biryani Large", desc: "Veg / Paneer / Chicken / Mutton", price: "NPR 740 / 950 / 1,225 / 1,350", plate: 2 },
    ],
  },

  {
    id: "platters",
    label: "Platters",
    emoji: "🍱",
    items: [
      { name: "Veg Platter", desc: "Sautéed Corn, Tofu Chili, Hot Garlic Paneer Skewers, Spicy Potato Wedge, Veg Pakoda, Peanut Sadeko", price: "NPR 895", plate: 1, image: "/images/menu/Veg%20platters.png" },
      { name: "Non-Veg Platter", desc: "Chicken Chhoila, Chicken Sadeko, Grilled Fish, Sausage Chilly, Chicken Wings, Grilled Chicken", price: "NPR 1,250", tag: "Sharing", plate: 2, image: "/images/menu/Non%20veg%20platters.png" },
      { name: "Momo Platter", desc: "Combination of Steam, Kothey, Fried & Chilly Momo", price: "NPR 690", plate: 3, image: "/images/menu/Momo%20platters.png" },
    ],
  },

  {
    id: "combo",
    label: "Combo",
    emoji: "🎁",
    items: [
      { name: "Greenyard Combo Package", desc: "Chicken Biryani / Mutton Pakku / Tofu Chilly / Momo Fry 6 pcs / Wai Wai Sadeko / Green Salad / Jumbo Coke or Real Juice 2 Glass", price: "NPR 2,750", tag: "Best Value", plate: 1 },
    ],
  },

  {
    id: "sandwich",
    label: "Sandwich",
    emoji: "🥪",
    items: [
      { name: "Club Sandwich", desc: "Lettuce, Tomato, Chicken, Crispy Bacon, Egg & Cheese, Coleslaw", price: "NPR 550", tag: "Popular", plate: 1 },
      { name: "Fresh Veg & Cheese Sandwich", desc: "Served on White Bread with Lettuce, Tomato, Onion, Cucumber & Sliced Cheese", price: "NPR 375", plate: 2 },
      { name: "Grilled Ham & Cheese Sandwich", desc: "Served on White Bread", price: "NPR 350", plate: 3 },
    ],
  },

  {
    id: "burger",
    label: "Burgers",
    emoji: "🍔",
    items: [
      { name: "Crunchy Chicken Burger", desc: "All burgers served with French Fries & Sriracha Mayo", price: "NPR 575", tag: "Popular", plate: 1 },
      { name: "Hawaiian Chicken Burger", desc: "Burger bun, homemade dressing, lettuce, onion, tomato, crispy chicken, sweet & sour sauce, pineapple, cheddar cheese", price: "NPR 575", plate: 2 },
      { name: "BBQ Buff / Chicken Burger", desc: "Burger bun, house dressing, lettuce, tomato, onion, patty, BBQ sauce, cheddar cheese", price: "NPR 530 / 490", plate: 3 },
      { name: "Crispy Chicken Burger", desc: "Served with French Fries & Sriracha Mayo", price: "NPR 550", plate: 4 },
      { name: "Veg Burger", desc: "Served with French Fries & Sriracha Mayo", price: "NPR 400", plate: 5 },
    ],
  },

  {
    id: "pizza",
    label: "Pizza",
    emoji: "🍕",
    items: [
      { name: "Mushroom Broccoli Pizza", desc: "Mushroom and broccoli pizza", price: "NPR 785", plate: 1 },
      { name: "Pizza California", desc: "Veggies, lettuce, Italian herbs", price: "NPR 850", plate: 2 },
      { name: "Meat Lovers Pizza", desc: "Bacon, Sausage, Grilled Chicken, Egg, Ham", price: "NPR 1,095", tag: "Popular", plate: 3 },
      { name: "Chilly Chicken Pizza", desc: "Spicy chilly chicken pizza", price: "NPR 960", plate: 4 },
      { name: "BBQ Pizza", desc: "Smoky BBQ-style pizza", price: "NPR 995", plate: 5 },
      { name: "Pepperoni Pizza", desc: "Classic pepperoni pizza", price: "NPR 1,050", plate: 1 },
      { name: "Greenyard Special Pizza", desc: "Large house special pizza", price: "NPR 1,399", tag: "Signature", plate: 2 },
    ],
  },

  {
    id: "pasta",
    label: "Touch of Italian",
    emoji: "🍝",
    items: [
      { name: "Bolognese", desc: "Spaghetti / Penne — all pasta served with Garlic Bread", price: "NPR 650", plate: 1 },
      { name: "Carbonara", desc: "Mushroom / Chicken / Bacon — served with Garlic Bread", price: "NPR 690", tag: "Popular", plate: 2 },
      { name: "Alla Pastora", desc: "Shiitake Mushroom & Bacon", price: "NPR 575", plate: 3 },
      { name: "Arrabbiata", desc: "Veg / Non-Veg", price: "NPR 525", plate: 4 },
      { name: "Baked Macaroni", desc: "Kids Pasta", price: "NPR 595", plate: 5 },
    ],
  },

  {
    id: "main-course",
    label: "Main Course",
    emoji: "🍽️",
    items: [
      { name: "Crumb Fried Fish & Chips", desc: "Served with French Fries, Tartar Sauce & Lemon Wedge", price: "NPR 625", plate: 1 },
      { name: "Grilled Fish", desc: "Served with Sautéed Veg, Side Salad & Lemon Butter Sauce", price: "NPR 750", plate: 2 },
      { name: "Grilled Chicken Leg / Breast", desc: "Served with Sautéed Veg, Rosemary Potato & Red Wine Sauce", price: "NPR 850 / 800", plate: 3 },
      { name: "Chicken Cordon Bleu", desc: "Served with Sautéed Spaghetti & Creamy Cheese Sauce", price: "NPR 895", plate: 4 },
      { name: "Pork Chop", desc: "Served with Parsley Mashed Sautéed Veg & Red Wine Apple Sauce", price: "NPR 950", plate: 5, image: "/images/menu/Pork%20chops.png" },
      { name: "Cottage Cheese Steak", desc: "Rice with Veggies", price: "NPR 795", plate: 1 },
      { name: "Chicken Sizzler", desc: "Hot sizzling chicken plate", price: "NPR 850", tag: "Popular", plate: 2 },
      { name: "Pork Belli", desc: "Pork belly main course", price: "NPR 950", plate: 3 },
      { name: "Manchurian with Rice", desc: "Veg / Chicken", price: "NPR 475 / 575", plate: 4 },
      { name: "Red / Green / Yellow Curry with Rice", desc: "Veg / Chicken / Shrimp", price: "NPR 500 / 575 / 700", plate: 5 },
    ],
  },

  {
    id: "dessert",
    label: "Dessert",
    emoji: "🍰",
    items: [
      { name: "Chocolate Walnut Brownies", desc: "Chocolate brownie with walnuts", price: "NPR 350", plate: 1 },
      { name: "Fresh Seasonal Fruits with Yogurt", desc: "Fresh fruits served with yogurt", price: "NPR 395", plate: 2 },
      { name: "Smoothie", desc: "Seasonal Fruits", price: "NPR 550", plate: 3 },
    ],
  },

  {
    id: "hot-beverage",
    label: "Hot Beverage",
    emoji: "☕",
    items: [
      
      { name: "Single Espresso", desc: "Classic espresso shot", price: "NPR 120", plate: 1, image: "/images/menu/hot-beverage/single-espresso.png" },
      { name: "Doppio", desc: "Double espresso shot", price: "NPR 150", plate: 2, image: "/images/menu/hot-beverage/Doppio.png" },
      { name: "Affogato", desc: "Espresso with ice cream", price: "NPR 185", plate: 3 },
      { name: "Macchiato", desc: "Espresso with milk foam", price: "NPR 150", plate: 4 },
      { name: "Americano", desc: "Single / Double", price: "NPR 150 / 175", plate: 5 },
      { name: "Cappuccino", desc: "Espresso with steamed milk foam", price: "NPR 195", tag: "Popular", plate: 1 },
      { name: "Café Latte", desc: "Espresso with steamed milk", price: "NPR 195", plate: 2 },
      { name: "Honey Latte", desc: "Latte with honey flavor", price: "NPR 230", plate: 3 },
      { name: "Café Mocha", desc: "Coffee with chocolate flavor", price: "NPR 250", plate: 4 },
      { name: "Hot Chocolate", desc: "Rich hot chocolate drink", price: "NPR 250", plate: 5 },
    ],
  },

  {
    id: "cold-beverage",
    label: "Cold Beverage",
    emoji: "🧊",
    items: [
      { name: "Iced Americano", desc: "Cold americano coffee", price: "NPR 195", plate: 1 },
      { name: "Iced Cappuccino", desc: "Cold cappuccino", price: "NPR 230", plate: 2 },
      { name: "Iced Latte", desc: "Cold latte", price: "NPR 230", plate: 3 },
      { name: "Blended Mocha", desc: "Cold blended mocha", price: "NPR 275", plate: 4 },
      { name: "Coco Iced Americano", desc: "Coconut flavored iced americano", price: "NPR 250", plate: 5 },
    ],
  },

  {
    id: "refreshers",
    label: "Refreshers",
    emoji: "🍹",
    items: [
      { name: "Kiwi Lime Refresher", desc: "Fresh kiwi lime refresher", price: "NPR 250", plate: 1 },
      { name: "Mint Lime Refresher", desc: "Mint and lime refresher", price: "NPR 250", plate: 2 },
      { name: "Peach / Lemon / Apple Iced Tea", desc: "Flavored iced tea", price: "NPR 260", plate: 3, image: "/images/menu/Ice%20teas.png" },
      { name: "Homemade Lemonade", desc: "Classic homemade lemonade", price: "NPR 150", plate: 4 },
      { name: "Fresh Mint Lemonade", desc: "Lemonade with fresh mint", price: "NPR 250", plate: 5 },
      { name: "Fresh Lime Soda", desc: "Refreshing lime soda", price: "NPR 165", plate: 1 },
      { name: "Fresh Fruit Lassi / Plain Lassi", desc: "Fruit or plain yogurt lassi", price: "NPR 250 / 230", plate: 2 },
      { name: "Milk Shakes", desc: "Vanilla / Strawberry / Chocolate / Banana", price: "NPR 250", plate: 3 },
    ],
  },

  {
    id: "smoothies-shakes",
    label: "Smoothies & Thickshakes",
    emoji: "🥤",
    items: [
      { name: "Strawberry / Blueberry Smoothie", desc: "Fresh fruit smoothie", price: "NPR 290", plate: 1 },
      { name: "Thickshake", desc: "Espresso / Vanilla / Chocolate / Strawberry / Blueberry", price: "NPR 290", plate: 2 },
      { name: "Blended Oreo / Snickers / KitKat", desc: "Assorted thick blended shake", price: "NPR 350", tag: "Must Try", plate: 3 },
    ],
  },

  {
    id: "juices-tea",
    label: "Juices & Specialty Leaf Tea",
    emoji: "🫖",
    items: [
      { name: "Fresh Juice", desc: "Watermelon / Orange / Pomegranate", price: "NPR 210 / 240 / 400", plate: 1 },
      { name: "Real Juice", desc: "Glass", price: "NPR 150", plate: 2 },
      { name: "Black Tea", desc: "Specialty leaf tea", price: "NPR 165 / 290", plate: 3 },
      { name: "Green Pearl Tea", desc: "Specialty green pearl tea", price: "NPR 175 / 300", plate: 4 },
      { name: "Silver / Golden Tea", desc: "Specialty silver or golden tea", price: "NPR 190 / 320", plate: 5 },
      { name: "White Tip Tea", desc: "Specialty white tip tea", price: "NPR 175 / 290", plate: 1 },
      { name: "Masala Tea Barista", desc: "Barista-style masala tea", price: "NPR 70 / 180", plate: 2 },
    ],
  },

  {
    id: "whiskey",
    label: "Whiskey",
    emoji: "🥃",
    items: [
      { name: "Johnnie Walker Double Black Label 1000ml", desc: "30ml / Quarter / Half / Full", price: "NPR 625 / 4,950 / 9,500 / 18,000", plate: 1, image: "/images/menu/whiskey/double-black-whiskey.png" },
      { name: "Johnnie Walker Black Label 1000ml", desc: "30ml / Quarter / Half / Full", price: "NPR 490 / 3,900 / 7,500 / 14,000", plate: 2, image: "/images/menu/whiskey/black-label.png" },
      { name: "Chivas Regal 12Yr 1000ml", desc: "30ml / Quarter / Half / Full", price: "NPR 490 / 3,900 / 7,500 / 14,000", plate: 3, image: "/images/menu/whiskey/chivas-regal.png" },
      { name: "Glenlivet 12 Years", desc: "30ml / Quarter / Half / Full", price: "NPR 950 / 6,000 / 11,000 / 20,500", plate: 4, image: "/images/menu/whiskey/Glenlivet-12-Years.png" },
      { name: "Glenfiddich 12 Years", desc: "30ml / Quarter / Half / Full", price: "NPR 850 / 5,500 / 10,500 / 19,500", plate: 5, image: "/images/menu/whiskey/Glenfiddich-12-Years.png" },
      { name: "Jim Beam", desc: "30ml / Quarter / Half / Full", price: "NPR 450 / 3,700 / 7,000 / 13,700", plate: 1, image: "/images/menu/whiskey/Jim-Beam.png" },
      { name: "Jack Daniel's 1000ml", desc: "30ml / Quarter / Half / Full", price: "NPR 450 / 3,700 / 7,000 / 13,700", plate: 2, image: "/images/menu/whiskey/Jack-Daniel-1000ml.png" },
      { name: "Jameson 1000ml", desc: "30ml / Quarter / Half / Full", price: "NPR 450 / 3,700 / 6,800 / 13,700", plate: 3, image: "/images/menu/whiskey/Jameson-1000ml.png" },
    ],
  },

  {
    id: "vodka-gin-rum-tequila",
    label: "Vodka, Gin, Rum & Tequila",
    emoji: "🍸",
    items: [
      { name: "Absolut 1000ml", desc: "30ml / Quarter / Half / Full", price: "NPR 375 / 2,650 / 5,350 / 10,500", plate: 1, image: "/images/menu/vodka-gin-rum-tequila/Absolut-1000ml.png" },
      { name: "Bombay Sapphire 1000ml", desc: "30ml / Quarter / Half / Full", price: "NPR 550 / 4,500 / 8,500 / 16,500", plate: 2, image: "/images/menu/vodka-gin-rum-tequila/Bombay-Sapphire-1000ml.png" },
      { name: "Beefeater 1000ml", desc: "30ml / Quarter / Half / Full", price: "NPR 350 / 2,250 / 5,500 / 10,500", plate: 3, image: "/images/menu/vodka-gin-rum-tequila/Beefeater-1000ml.png" },
      { name: "Snowman 750ml", desc: "30ml / Quarter / Half / Full", price: "NPR 200 / 1,200 / 2,500 / 5,000", plate: 4, image: "/images/menu/vodka-gin-rum-tequila/Snowman-750ml.png" },
      { name: "Captain Morgan Spicy 1000ml", desc: "30ml / Quarter / Half / Full", price: "NPR 350 / 2,950 / 5,500 / 10,500", plate: 5, image: "/images/menu/vodka-gin-rum-tequila/Captain-Morgan-Spicy-1000ml.png" },
      { name: "Olmeca Silver / Gold", desc: "30ml", price: "NPR 550", plate: 1, image: "/images/menu/vodka-gin-rum-tequila/Olmeca-Silver-Gold.png" },
    ],
  },

  {
    id: "wine",
    label: "Wine",
    emoji: "🍷",
    items: [
      { name: "Jacob's Creek Merlot Shiraz", desc: "By Glass / By Bottle", price: "NPR 1,000 / 3,200", plate: 1, image: "/images/menu/wine/Jacobs-Creek-Merlot-Shiraz.png" },
      { name: "Jacob's Creek Cabernet Sauvignon", desc: "By Glass / By Bottle", price: "NPR 1,000 / 3,200", plate: 2, image: "/images/menu/wine/Jacobs-Creek-Cabernet-Sauvignon.png" },
      { name: "Domestic Red Wine", desc: "By Glass / By Bottle", price: "NPR 500 / 750", plate: 3, image: "/images/menu/wine/Domestic-Red-Wine.png" },
      { name: "Jacob's Creek Chardonnay", desc: "By Glass / By Bottle", price: "NPR 1,000 / 3,200", plate: 4, image: "/images/menu/wine/Jacobs-Creek-Chardonnay.png" },
      { name: "Jacob's Creek Sauvignon Blanc", desc: "By Glass / By Bottle", price: "NPR 1,000 / 3,200", plate: 5, image: "/images/menu/wine/Jacobs-Creek-Sauvignon-Blanc.png" },
      { name: "Jacob's Creek Moscato", desc: "By Glass / By Bottle", price: "NPR 1,000 / 3,200", plate: 1, image: "/images/menu/wine/Jacobs-Creek-Moscato.png" },
      { name: "Domestic White Wine", desc: "By Glass / By Bottle", price: "NPR 500 / 1,750", plate: 2, image: "/images/menu/wine/Domestic-White-Wine.png" },
    ],
  },

  {
    id: "domestic-liquor",
    label: "Domestic Liquor",
    emoji: "🍾",
    items: [
      { name: "Old Durbar Reserve 750ml", desc: "30ml / Quarter / Half / Full", price: "NPR 200 / 1,150 / 2,000 / 3,800", plate: 1, image: "/images/menu/domestic-liquor/Old-Durbar-Reserve-750ml.png" },
      { name: "Old Durbar Black Chimney 750ml", desc: "30ml / Quarter / Half / Full", price: "NPR 250 / 1,450 / 2,050 / 4,800", plate: 2, image: "/images/menu/domestic-liquor/Old-Durbar-Black-Chimney-750ml.png" },
      { name: "The Signature Rare 750ml", desc: "30ml / Quarter / Half / Full", price: "NPR 195 / 1,125 / 1,950 / 3,450", plate: 3, image: "/images/menu/domestic-liquor/The-Signature-Rare-750ml.png" },
      { name: "The Signature Premier 750ml", desc: "30ml / Quarter / Half / Full", price: "NPR 200 / 1,050 / 2,100 / 3,900", plate: 4, image: "/images/menu/domestic-liquor/The-Signature-Premier-750ml.png" },
      { name: "Vodka", desc: "Ruslan / 8848 / Nude / Smirnoff — 30ml / Quarter / Half / Full", price: "NPR 175 / 990 / 1,950 / 3,500", plate: 5, image: "/images/menu/domestic-liquor/Vodka-ruslan.png" },
      { name: "Khukuri Rum", desc: "30ml / Quarter / Half / Full", price: "NPR 175 / 990 / 1,950 / 3,500", plate: 1, image: "/images/menu/domestic-liquor/Khukuri-Rum.png" },
      { name: "Khukuri XXX Rum", desc: "30ml / Quarter / Half / Full", price: "NPR 200 / 1,050 / 2,100 / 3,900", plate: 2, image: "/images/menu/domestic-liquor/Khukuri-XXX-Rum.png" },
    ],
  },

  {
    id: "liquor-shots-beer",
    label: "Liquor, Shots & Beer",
    emoji: "🍺",
    items: [
      { name: "Baileys 30ml", desc: "Cream liqueur", price: "NPR 430", plate: 1, image: "/images/menu/liquor-shots-beer/bailey.png" },
      { name: "Kahlua 30ml", desc: "Coffee liqueur", price: "NPR 430", plate: 2, image: "/images/menu/liquor-shots-beer/Kahlua-30ml.png" },
      { name: "Aperol 30ml", desc: "Italian aperitif", price: "NPR 475", plate: 3, image: "/images/menu/liquor-shots-beer/Aperol-30ml.png" },
      { name: "Martini Dry Vermouth 30ml", desc: "Dry vermouth", price: "NPR 250", plate: 4, image: "/images/menu/liquor-shots-beer/Martini-Dry-Vermouth-30ml.png" },
      { name: "Martini Rosso Sweet Vermouth", desc: "Sweet vermouth", price: "NPR 250", plate: 5, image: "/images/menu/liquor-shots-beer/Martini-Rosso-Sweet-Vermouth.png" },
      { name: "B-52", desc: "Shot / Shooter", price: "NPR 500", plate: 1, image: "/images/menu/liquor-shots-beer/B-52-shot.png" },
      { name: "Kamikazi", desc: "Shot / Shooter", price: "NPR 500", plate: 2, image: "/images/menu/liquor-shots-beer/Kamikazi.png" },
      { name: "Jagerbomb", desc: "Shot / Shooter", price: "NPR 600", plate: 3, image: "/images/menu/domestic-liquor/Jagerbomb.png" },
      { name: "Jagermeister", desc: "Shot / Shooter", price: "NPR 450", plate: 4, image: "/images/menu/liquor-shots-beer/Jagermeister.png" },
      { name: "Barasinghe Pilsner 750ml", desc: "Beer", price: "NPR 625", plate: 5, image: "/images/menu/domestic-liquor/Barasinghe-Pilsner-750ml.png" },
      { name: "Gorkha Strong", desc: "Beer", price: "NPR 575", plate: 1, image: "/images/menu/liquor-shots-beer/Gorkha-Strong.png" },
      { name: "Carlsberg", desc: "Beer", price: "NPR 650", plate: 2, image: "/images/menu/liquor-shots-beer/Carlsberg.png" },
      { name: "Tuborg", desc: "Beer", price: "NPR 625", plate: 3, image: "/images/menu/liquor-shots-beer/Tuborg.png" },
    ],
  },

  {
    id: "cocktails",
    label: "Cocktails",
    emoji: "🍹",
    items: [
      { name: "Margarita", desc: "Tequila, Triple Sec, Lemon Juice", price: "NPR 900", plate: 1, image: "/images/menu/cocktails/Margarita.png" },
      { name: "Cosmopolitan", desc: "Vodka, Triple Sec, Cranberry Juice, Lemon Juice", price: "NPR 800", plate: 2, image: "/images/menu/cocktails/Cosmopolitan.png" },
      { name: "The Signature Mojito", desc: "White Rum, Mint Leaf, Lime Wedge, Sugar", price: "NPR 800", tag: "Signature", plate: 3, image: "/images/menu/cocktails/The-Signature-Mojito.png" },
      { name: "Pina Colada", desc: "White Rum, Pineapple Juice, Coconut Cream", price: "NPR 800", plate: 4 },
      { name: "Long Island Iced Tea", desc: "Rum, Vodka, Gin, Tequila, Triple Sec, Lemon Juice, Coke", price: "NPR 950", plate: 5 },
      { name: "Espresso Martini", desc: "Espresso, Vodka, Kahlua", price: "NPR 750", tag: "Popular", plate: 1 },
      { name: "Negroni", desc: "Gin, Sweet Vermouth, Campari", price: "NPR 950", plate: 2 },
      { name: "White Russian", desc: "Vodka, Kahlua, Heavy Cream", price: "NPR 700", plate: 3 },
      { name: "Old Fashioned", desc: "Jim Beam, Angostura Bitter, Brown Sugar, Orange Peel", price: "NPR 950", plate: 4 },
      { name: "Whiskey Sour", desc: "Jim Beam, Sugar, Lemon, Egg White, Dash of Bitter", price: "NPR 700", plate: 5 },
      { name: "Titaura Yard", desc: "Titaura, Vodka, Mango Juice, Lemon, Sugar", price: "NPR 600", tag: "Local Fav", plate: 1 },
      { name: "Gin Mash", desc: "Gin, Orange Juice, Pineapple Juice, Lemon, Sugar, Jalapeno, Mint", price: "NPR 800", plate: 2 },
      { name: "Sangria / Mulled Wine", desc: "Wine-based cocktail", price: "NPR 800", plate: 3 },
      { name: "Hot Rum Punch", desc: "Warm rum-based punch", price: "NPR 800", plate: 4 },
    ],
  },

  {
    id: "mocktails",
    label: "Mocktails",
    emoji: "🍸",
    items: [
      { name: "Virgin Mojito", desc: "Non-alcoholic mojito", price: "NPR 400", plate: 1 },
      { name: "Micky Mouse", desc: "Mocktail drink", price: "NPR 450", plate: 2 },
      { name: "Virgin Pinacolada", desc: "Non-alcoholic pina colada", price: "NPR 450", plate: 3 },
      { name: "Mango Titaura", desc: "Mango with titaura flavor", price: "NPR 450", plate: 4 },
      { name: "Purple Haze", desc: "Mocktail drink", price: "NPR 450", plate: 5 },
      { name: "Fruit Punch", desc: "Mixed fruit mocktail", price: "NPR 500", plate: 1 },
      { name: "Blue Angle", desc: "Blue mocktail drink", price: "NPR 500", plate: 2 },
      { name: "Sun Down", desc: "Mocktail drink", price: "NPR 400", plate: 3 },
    ],
  },

  {
    id: "basics",
    label: "Basics",
    emoji: "🥤",
    items: [
      { name: "Bottled Water", desc: "Regular bottled water", price: "NPR 60", plate: 1 },
      { name: "Perrier Sparkling Water", desc: "Sparkling water", price: "NPR 395", plate: 2 },
      { name: "Ginger Ale", desc: "Soft drink", price: "NPR 200", plate: 3 },
      { name: "Tonic Water", desc: "Mixer", price: "NPR 200", plate: 4 },
      { name: "Coke / Fanta / Sprite / Soda", desc: "Soft drinks", price: "NPR 120", plate: 5 },
      { name: "Energy Drinks", desc: "Energy drink", price: "NPR 250", plate: 1 },
      { name: "Shisha / Hukka", desc: "Hookah service", price: "NPR 600", plate: 2 },
    ],
  },
];

const tagColors: Record<string, string> = {
  "Best Value": "#c9a84c",
  "Popular": "#52b788",
  "Chef's Pick": "#2d6a4f",
  "Must Try": "#8b6345",
  "Signature": "#a07830",
  "Local Fav": "#c0392b",
};

type SlideDir = "left" | "right" | null;

export default function MenuShowcase() {
  const [catIdx, setCatIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [slideDir, setSlideDir] = useState<SlideDir>(null);
  const [animKey, setAnimKey] = useState(0);   // bumped to force re-key on plate + text
  const busyRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cat = categories[catIdx];
  const dish = cat.items[itemIdx];
  const dishImage = getMenuImage(dish);
  const shouldContainImage = beverageCategoryIds.has(cat.id) && !dishImage.isFallback;

  const go = useCallback((nextCat: number, nextItem: number, dir: SlideDir) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setSlideDir(dir);           // plate slides out this direction
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCatIdx(nextCat);
      setItemIdx(nextItem);
      setSlideDir(null);        // plate slides in from opposite
      setAnimKey(k => k + 1);  // re-key text → fade-up
      busyRef.current = false;
    }, 300);
  }, []);

  const navigate = useCallback((dir: "prev" | "next") => {
    const len = cat.items.length;
    const next = dir === "next"
      ? (itemIdx + 1) % len
      : (itemIdx - 1 + len) % len;
    go(catIdx, next, dir === "next" ? "left" : "right");
  }, [cat.items.length, catIdx, itemIdx, go]);

  const switchCategory = (idx: number) => {
    if (idx !== catIdx) go(idx, 0, "left");
  };

  const pickItem = (i: number) => {
    if (i !== itemIdx) go(catIdx, i, i > itemIdx ? "left" : "right");
  };

  return (
    <section id="menu" className="menu-section">
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div className="menu-header">
          <p className="section-subtitle" style={{ color: "var(--gold-light)" }}>Culinary Delights</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", lineHeight: 1.15, marginTop: "0.25rem" }}>
            Our Full Menu
          </h2>
          <div style={{ width: "60px", height: "2px", background: "var(--gold)", margin: "1.25rem auto", borderRadius: "2px" }} />
          <p style={{ fontFamily: "'Lato',sans-serif", color: "rgba(183,228,199,0.75)", fontSize: "1rem" }}>
            From garden-fresh bites to premium cocktails — every flavour, every occasion.
          </p>
        </div>

        {/* Category pills */}
        <div className="menu-cats">
          {categories.map((c, i) => (
            <button
              key={c.id}
              id={`menu-cat-${c.id}`}
              className={`menu-cat-pill${catIdx === i ? " active" : ""}`}
              onClick={() => switchCategory(i)}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        {/* Spotlight card */}
        <div className="menu-spotlight">

          {/* Left: Plate */}
          <div className="menu-plate-side">
            <div className="menu-glow-ring" />
            {/* key changes on every nav → triggers CSS slide animation */}
            <div className='menu-plate-circle'>
              <div
                key={`plate-${catIdx}-${itemIdx}`}
                className={`menu-plate-circle${slideDir === "left" ? " slide-exit-left" :
                  slideDir === "right" ? " slide-exit-right" :
                    " slide-enter"
                  }${shouldContainImage ? " menu-bottle-frame" : ""}`}
              >
                <ExportedImage
                  src={dishImage.src}
                  alt={dish.name}
                  fill
                  style={{ objectFit: shouldContainImage ? "contain" : "cover" }}
                  sizes="300px"
                  priority={catIdx === 0 && itemIdx === 0}
                />
              </div>
            </div>
            <div className="menu-item-counter">
              {String(itemIdx + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(cat.items.length).padStart(2, "0")}
            </div>
            <div className="menu-cat-badge">{cat.emoji} {cat.label}</div>
          </div>

          {/* Right: Info */}
          {/* animKey changes on every nav → text fades up */}
          <div className="menu-info-side menu-info-fadein">
            <div key={animKey} >
              {dish.tag ? (
                <span
                  className="menu-tag-badge"
                  style={{ background: tagColors[dish.tag] ?? "var(--green-mid)" }}
                >
                  {dish.tag}
                </span>
              ) : (
                <span className="menu-tag-badge"></span>
              )}
              <p className="menu-cat-eyebrow">{cat.emoji} {cat.label}</p>
              <h3 className="menu-item-name">{dish.name}</h3>
              {dish.desc && <p className="menu-item-sub">{dish.desc}</p>}
              <div className="menu-price-row">
                <span className="menu-price">{dish.price}</span>
              </div>
            </div>
            {/* Nav */}
            <div className="menu-nav">
              <button
                id="menu-prev-btn"
                aria-label="Previous dish"
                className="menu-nav-btn"
                onClick={() => navigate("prev")}
                disabled={slideDir !== null}
              >←</button>

              <div className="menu-pip-row">
                {cat.items.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Item ${i + 1}`}
                    className={`menu-pip${i === itemIdx ? " on" : ""}`}
                    onClick={() => pickItem(i)}
                  />
                ))}
              </div>

              <button
                id="menu-next-btn"
                aria-label="Next dish"
                className="menu-nav-btn filled"
                onClick={() => navigate("next")}
                disabled={slideDir !== null}
              >→</button>
            </div>

            <a href="#booking" className="btn-gold" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
              🌿 Book a Table
            </a>
          </div>
        </div>

        {/* Item grid */}
        <div className="menu-grid">
          {cat.items.map((item, i) => {
            const itemImage = getMenuImage(item);
            const shouldContainThumb = beverageCategoryIds.has(cat.id) && !itemImage.isFallback;

            return (
              <button
                key={i}
                className={`menu-grid-card${i === itemIdx ? " active" : ""}`}
                onClick={() => pickItem(i)}
              >
                <div className={`mgc-thumb${shouldContainThumb ? " menu-bottle-thumb" : ""}`}>
                  <ExportedImage src={itemImage.src} alt={item.name} fill style={{ objectFit: shouldContainThumb ? "contain" : "cover" }} sizes="52px" />
                </div>
                <div className="mgc-body">
                  <span className="mgc-name">{item.name}</span>
                  {item.desc && <span className="mgc-sub">{item.desc}</span>}
                </div>
                <span className="mgc-price">{item.price}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
