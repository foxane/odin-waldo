import prisma from '../prisma/prismaClient.js';

export const getAllImages = async (req, res, next) => {
  const constraint = {};

  const { limit } = req.query;
  if (limit && typeof limit === 'number')
    constraint.limit = Number(req.query.limit);

  try {
    const images = await prisma.image.findMany({
      ...constraint,
    });
    res.json(images);
  } catch (error) {
    next(error);
  }
};

export const getSingleImage = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const post = await prisma.image.findUnique({
      where: { id },
      include: { entities: true, scores: true },
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const getScoreByImage = async (req, res, next) => {
  try {
    const scores = await prisma.score.findMany({
      where: { imageId: Number(req.params.id) },
    });
    res.json(scores);
  } catch (error) {
    next(error);
  }
};

export const createImage = async (req, res, next) => {
  if (req.header('Authorization') !== process.env.SECRET)
    return res.status(403).json({ message: 'Forbidden' });

  try {
    const image = await prisma.image.create(req.body);
    res.json(image);
  } catch (error) {
    next(error);
  }
};

export const createScore = async (req, res, next) => {
  if (req.header('Authorization') !== process.env.SECRET)
    return res.status(403).json({ message: 'Forbidden' });

  const { name, time } = req.body;
  try {
    const data = await prisma.image.update({
      where: { id: Number(req.params.id) },
      data: {
        scores: {
          create: {
            name: name || 'Too cool to write name',
            time,
          },
        },
      },
      include: { entities: true, scores: true },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};
