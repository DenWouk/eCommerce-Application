import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line consistent-return
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  if (!body.email || !body.password) {
    return res.status(400).json({ data: 'First or last name not found' });
  }
  res.status(200).json({ data: `${body.email} ${body.password}` });
};

export default handler;
