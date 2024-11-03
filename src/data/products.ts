import { Product } from '../types/Product';

// Import images for Product 1
import img1_1 from '../assets/images/1/1.jpg';
import img1_2 from '../assets/images/1/2.jpg';
import img1_3 from '../assets/images/1/3.jpg';

// Import images for Product 2
import img2_1 from '../assets/images/2/1.jpg';
import img2_2 from '../assets/images/2/2.jpg';
import img2_3 from '../assets/images/2/3.jpg';

// Import images for Product 3
import img3_1 from '../assets/images/3/1.jpg';
import img3_2 from '../assets/images/3/2.jpg';
import img3_3 from '../assets/images/3/3.jpg';
import img3_4 from '../assets/images/3/4.jpg';

// Import images for Product 4
import img4_1 from '../assets/images/4/1.jpg';
import img4_2 from '../assets/images/4/2.jpg';
import img4_3 from '../assets/images/4/3.jpg';
import img4_4 from '../assets/images/4/4.jpg';

// Import images for Product 5
import img5_1 from '../assets/images/5/1.jpg';
import img5_2 from '../assets/images/5/2.jpg';
import img5_3 from '../assets/images/5/3.jpg';

// Import images for Product 6
import img6_1 from '../assets/images/6/1.jpg';
import img6_2 from '../assets/images/6/2.jpg';
import img6_3 from '../assets/images/6/3.jpg';
import img6_4 from '../assets/images/6/4.jpg';

// Import images for Product 7
import img7_1 from '../assets/images/7/1.jpg';
import img7_2 from '../assets/images/7/2.jpg';

// Import images for Product 8
import img8_1 from '../assets/images/8/1.jpg';
import img8_2 from '../assets/images/8/2.jpg';

// Update the products array
export const products: Product[] = [
  {
    id: 1,
    name: 'Check Pocket Overshirt',
    price: 59.99,
    rating: 4.5,
    image: img1_1,
    images: [img1_1, img1_2, img1_3],
    description:
      'A stylish overshirt featuring a classic check pattern and functional chest pockets, perfect for layering in cooler weather.',
    arrivalDate: '2023-10-01',
    comments: [
      {
        id: 1730558730108,
        username: 'StyleGuru',
        content:
          'This overshirt is a great addition to my wardrobe. The check pattern is timeless.',
        rating: 5,
        date: '2023-10-02T10:30:00.108Z',
      },
      {
        id: 1730558736260,
        username: 'AlexB',
        content: 'Good quality fabric, but I wish it came in more colors.',
        rating: 4,
        date: '2023-10-03T15:45:00.260Z',
      },
    ],
  },
  {
    id: 2,
    name: 'Denim Jacket with Zip',
    price: 49.99,
    rating: 4,
    image: img2_1,
    images: [img2_1, img2_2, img2_3],
    description:
      'A classic denim jacket updated with a modern zip closure, perfect for layering over casual outfits.',
    arrivalDate: '2023-09-15',
    comments: [
      {
        id: 1730558770108,
        username: 'DenimFan',
        content: 'Great jacket, fits well and looks stylish!',
        rating: 4,
        date: '2023-09-16T12:00:00.000Z',
      },
    ],
  },
  {
    id: 3,
    name: 'ZW Collection Check Shirt',
    price: 39.99,
    rating: 4,
    image: img3_1,
    images: [img3_1, img3_2, img3_3, img3_4],
    description:
      'A stylish check shirt from the ZW collection, offering a relaxed fit and comfortable wear.',
    arrivalDate: '2023-10-05',
    comments: [
      {
        id: 1730558740108,
        username: 'FashionFan',
        content:
          'Fits perfectly and looks great with both jeans and chinos!',
        rating: 5,
        date: '2023-10-06T09:15:00.108Z',
      },
      {
        id: 1730558746200,
        username: 'SamS',
        content: 'Nice shirt but the material is thinner than I expected.',
        rating: 3,
        date: '2023-10-07T12:00:00.000Z',
      },
    ],
  },
  {
    id: 4,
    name: 'Dotted Mesh Shirt with Bows',
    price: 199.99,
    rating: 5,
    image: img4_1,
    images: [img4_1, img4_2, img4_3, img4_4],
    description:
      'An elegant dotted mesh shirt adorned with delicate bows, perfect for special occasions.',
    arrivalDate: '2023-08-20',
    comments: [
      {
        id: 1730558780108,
        username: 'ElegantDresser',
        content: 'Absolutely stunning shirt, received many compliments!',
        rating: 5,
        date: '2023-08-21T14:00:00.000Z',
      },
    ],
  },
  {
    id: 5,
    name: 'Textured Check Shirt',
    price: 29.99,
    rating: 3.5,
    image: img5_1,
    images: [img5_1, img5_2, img5_3],
    description:
      'A textured check shirt offering a unique look and comfortable fit.',
    arrivalDate: '2023-11-01',
    comments: [
      {
        id: 1730558750108,
        username: 'MikeH',
        content:
          'The texture adds a nice touch, but the fit was a bit loose for me.',
        rating: 4,
        date: '2023-11-02T11:20:00.108Z',
      },
      {
        id: 1730558756260,
        username: 'LisaG',
        content:
          'I like the design, and the material feels good on the skin.',
        rating: 3,
        date: '2023-11-03T16:30:00.260Z',
      },
    ],
  },
  {
    id: 6,
    name: 'Modal Blend Shirt',
    price: 49.99,
    rating: 4,
    image: img6_1,
    images: [img6_1, img6_2, img6_3, img6_4],
    description:
      'A soft modal blend shirt offering exceptional comfort and style for everyday wear.',
    arrivalDate: '2023-12-01',
    comments: [
      {
        id: 1730558790108,
        username: 'ComfortSeeker',
        content: 'Very comfortable shirt, great for daily wear.',
        rating: 4,
        date: '2023-12-02T09:30:00.000Z',
      },
    ],
  },
  {
    id: 7,
    name: 'Shoulder Bucket Bag',
    price: 39.99,
    rating: 4.5,
    image: img7_1,
    images: [img7_1, img7_2],
    description:
      'A trendy shoulder bucket bag, spacious enough for all your essentials, perfect for daily use.',
    arrivalDate: '2023-12-01',
    comments: [
      {
        id: 1730558760108,
        username: 'BagLover',
        content:
          'Absolutely love this bag! It goes with every outfit.',
        rating: 5,
        date: '2023-12-02T09:00:00.000Z',
      },
      {
        id: 1730558766260,
        username: 'SarahW',
        content:
          'Good size and quality, but the strap is a bit short for me.',
        rating: 4,
        date: '2023-12-03T14:30:00.000Z',
      },
    ],
  },
  {
    id: 8,
    name: 'Ankle Boots with Metallic Detail',
    price: 59.99,
    rating: 4,
    image: img8_1,
    images: [img8_1, img8_2],
    description:
      'Stylish ankle boots featuring metallic detailing, perfect for adding an edge to your outfit.',
    arrivalDate: '2023-12-01',
    comments: [
      {
        id: 1730558800108,
        username: 'BootEnthusiast',
        content:
          'These boots are fantastic, very comfortable and stylish.',
        rating: 4,
        date: '2023-12-02T15:00:00.000Z',
      },
    ],
  },
];