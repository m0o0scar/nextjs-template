import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseContent {
  hello: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseContent>) {
  res.status(200).send({
    hello: 'world',
  });
}
