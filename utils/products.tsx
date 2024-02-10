export const products = [
  {
    id: "64b2b8e3d9e8b5e4a93d1234",
    name: "Samsung Galaxy S22",
    description: "Experience the next generation of Galaxy",
    price: 100,
    brand: "Samsung",
    category: "Phone",
    inStock: true,
    images: [
      {
        color: "Phantom Black",
        colorCode: "#000000",
        image:
          "https://mobileshop.ug/api/uploads/1700042656083-24dc16b8c32095357b27fbd8c8841e569849f83c.webp",
      },
      {
        color: "Sky Blue",
        colorCode: "#87CEEB",
        image:
          "https://mobileshop.ug/api/uploads/1700042656132-f087d6e9a14bf8fed3791b8e8d62641523edee2f.webp",
      },
    ],
    reviews: [],
  },
  {
    id: "64b2c7f1e2f9a8e4b83f4567",
    name: "IPHONE 15 PRO 256GB ROM 8GB RAM 3274mAh BATTERY",
    description:
      "Industry-leading noise cancellation headphones with Dual Noise Sensor technology",
    price: 200,
    brand: "Sony",
    category: "Accessories",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image: "https://mobileshop.ug/api/uploads/1696835619930-BLUE3.webp",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image: "https://mobileshop.ug/api/uploads/1696835619930-BLUE3.webp",
      },
    ],
    reviews: [
      {
        id: "64a65a6158b470c6e06959ee",
        userId: "6475af156bad4917456e6e1e",
        productId: "64b2c7f1e2f9a8e4b83f4567",
        rating: 5,
        comment: "good",
        createdDate: "2023-07-06T06:08:33.067Z",
        user: {
          id: "6475af156bad4917456e6e1e",
          name: "Charles",
          email: "example@gmail.com",
          emailVerified: null,
          image:
            "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
          hashedPassword: null,
          createdAt: "2023-05-30T08:08:53.979Z",
          updatedAt: "2023-05-30T08:08:53.979Z",
          role: "ADMIN",
        },
      },
    ],
  },
  {
    id: "64b2d8e4f1g2h3i4j5k6l789",
    name: "IPHONE 12 PRO MAX 128GB ROM 6GB RAM 3687mAh",
    description: "Powerful performance, stunning display in a sleek, slim body",
    price: 300,
    brand: "Dell",
    category: "Laptop",
    inStock: true,
    images: [
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image: "https://mobileshop.ug/api/uploads/1687266414179-12A.webp",
      },
    ],
    reviews: [
      {
        id: "6499b4887402b0efd394d8f3",
        userId: "6499b184b0e9a8c8709821d3",
        productId: "64b2d8e4f1g2h3i4j5k6l789",
        rating: 4,
        comment:
          "good enough. I like the camera and casing. the delivery was fast too.",
        createdDate: "2023-06-26T15:53:44.483Z",
        user: {
          id: "6499b184b0e9a8c8709821d3",
          name: "Chaoo",
          email: "example1@gmail.com",
          emailVerified: null,
          image:
            "https://lh3.googleusercontent.com/a/AAcHTtcuRLwWi1vPKaQOcJlUurlhRAIIq2LgYccE8p32=s96-c",
          hashedPassword: null,
          createdAt: "2023-06-26T15:40:52.558Z",
          updatedAt: "2023-06-26T15:40:52.558Z",
          role: "USER",
        },
      },
      {
        id: "6499a110efe4e4de451c7edc",
        userId: "6475af156bad4917456e6e1e",
        productId: "64b2d8e4f1g2h3i4j5k6l789",
        rating: 5,
        comment: "I really liked it!!",
        createdDate: "2023-06-26T14:30:40.998Z",
        user: {
          id: "6475af156bad4917456e6e1e",
          name: "Charles",
          email: "example@gmail.com",
          emailVerified: null,
          image:
            "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
          hashedPassword: null,
          createdAt: "2023-05-30T08:08:53.979Z",
          updatedAt: "2023-05-30T08:08:53.979Z",
          role: "ADMIN",
        },
      },
    ],
  },
  {
    id: "65a4b3c2d1e2f3g4h5i6j7k8",
    name: "Apple Watch Series ",
    description:
      "The largest, most advanced display yet. Most durable Apple Watch ever. Breakthrough health innovations.",
    price: 50,
    brand: "Apple",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Midnight",
        colorCode: "#4B0082",
        image:
          "https://mobileshop.ug/api/uploads/1648450850768-71S6CQmCTsL._AC_SX425.webp",
      },
      {
        color: "Starlight",
        colorCode: "#FFD700",
        image:
          "https://mobileshop.ug/api/uploads/1704812030864-818t572-n1L._AC_SL1500_.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "76c4b3d2e1f4g5h6i7j8k9l0",
    name: "Google Pixel 6",
    description: "The all-new Google Pixel 6, designed the Google way.",
    price: 599,
    brand: "Google",
    category: "Phone",
    inStock: true,
    images: [
      {
        color: "Sorta Seafoam",
        colorCode: "#2E8B57",
        image: "https://mobileshop.ug/api/uploads/1681824064426-6PRO3.webp",
      },
      {
        color: "Kinda Coral",
        colorCode: "#FF7F50",
        image: "https://mobileshop.ug/api/uploads/1682496253466-6CC.webp",
      },
    ],
    reviews: [],
  },
];
