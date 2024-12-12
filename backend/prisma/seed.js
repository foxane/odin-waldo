import prisma from './prismaClient.js';

prisma.image
  .create({
    data: {
      name: 'Marvel Avenger',
      url: 'https://i.imgur.com/6NMYHbF.jpeg',
      scores: {
        createMany: {
          data: [{ time: '9999.345s', name: 'Iam Speed' }],
        },
      },
      entities: {
        createMany: {
          data: [
            {
              name: 'Ant-Man',
              url: 'https://i.imgur.com/nIRrFQ8.jpeg',
              x: 230,
              y: 480,
              w: 200,
              h: 240,
            },
            {
              name: 'Wolverine',
              url: 'https://i.imgur.com/4gsvN3G.jpeg',
              x: 650,
              y: 135,
              w: 225,
              h: 130,
            },
            {
              name: 'Ms Marvel',
              url: 'https://i.imgur.com/U6GqBIz.jpeg',
              x: 970,
              y: 210,
              w: 130,
              h: 200,
            },
          ],
        },
      },
    },
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    console.log('Done');
  });
