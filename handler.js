const { map } = require('lodash');
const { PrismaClient } = require('@prisma/client');
const prettyMilliseconds = require('pretty-ms');

const prisma = new PrismaClient();

module.exports.animals = async (event) => {
  const startTime = new Date();
  const frens = await prisma.animal.findMany();

  console.log(map(frens, 'name').join(' & '));
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        frens: map(frens, 'name').join(' & '),
        runTime: prettyMilliseconds(new Date() - startTime),
      },
      null,
      2
    ),
  };
};
