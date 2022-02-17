import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
        name: 'Joyelle',
        email: 'joyfleurndikumana@gmail.com',
        password: bcrypt.hashSync('1234', 8),
        isAdmin: true,
        isManager: true,
        manager: {
          name: 'Joy',
          logo: '/images/j1.jpg',
          description: 'best manager',
          rating: 4.5,
          numReviews: 120,
          },
    },
    {
        name: 'Elvis',
        email: 'user@example.com',
        password: bcrypt.hashSync('1234', 8),
        isAdmin: false,
      
    },
  ],
    hotels: [{
        name: "Kiriri Garden",
        province: "Bujumbura",
        image: "/images/j1.jpg",
        price: 87990,
        countInStock: 30,
        rating: 4.5,
        numReviews: 10,
        description: 'good',
    },
   
    ]
};
export default data;