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
      where: { imageId: req.params.id },
    });
    res.json(scores);
  } catch (error) {
    next(error);
  }
};

export const createImage = async (req, res, next) => {
  try {
    const image = prisma.image.create(req.body);
    res.json(image);
  } catch (error) {
    next(error);
  }
};

export const createScore = async (req, res, next) => {
  const { name, time } = req.body;
  try {
    const score = prisma.score.create({
      data: {
        name,
        time,
        imageId: req.params.id,
      },
    });
    res.json(score);
  } catch (error) {
    next(error);
  }
};
