import { PrismaClient } from '@prisma/client';
import { map } from 'lodash';
import prettyMilliseconds from 'pretty-ms';

const prisma = new PrismaClient();

// eslint-disable-next-line import/prefer-default-export
export const animals = async () => {
  const startTime = new Date();
  const frens = await prisma.animal.findMany();

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
