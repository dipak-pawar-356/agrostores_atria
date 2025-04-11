import { v4 as uuid } from "uuid";

export const nurseries = [
  {
    _id: uuid(),
    name: "Green Valley Nursery",
    location: "Pune, India",
    rating: 4.5,
    products: [
      {
        category: "Seeds",
        productName: "Hybrid Tomato Seeds",
        price: 150,
        quality: "High",
      },
      {
        category: "Fertilizers",
        productName: "Organic Compost",
        price: 500,
        quality: "Medium",
      },
    ],
  },
  {
    _id: uuid(),
    name: "AgroGrow Nursery",
    location: "Delhi, India",
    rating: 4.2,
    products: [
      {
        category: "Pesticides",
        productName: "Neem Oil",
        price: 300,
        quality: "High",
      },
      {
        category: "Safety Wearables",
        productName: "Protective Gloves",
        price: 200,
        quality: "Medium",
      },
    ],
  },
  {
    _id: uuid(),
    name: "Nature's Care Nursery",
    location: "Mumbai, India",
    rating: 4.8,
    products: [
      {
        category: "Plants",
        productName: "Indoor Money Plant",
        price: 250,
        quality: "High",
      },
      {
        category: "Fertilizers",
        productName: "Vermicompost",
        price: 400,
        quality: "High",
      },
    ],
  },
  {
    _id: uuid(),
    name: "EcoGreen Nursery",
    location: "Bangalore, India",
    rating: 4.0,
    products: [
      {
        category: "Seeds",
        productName: "Sunflower Seeds",
        price: 120,
        quality: "Medium",
      },
      {
        category: "Pesticides",
        productName: "Herbal Pest Repellent",
        price: 350,
        quality: "High",
      },
    ],
  },
];