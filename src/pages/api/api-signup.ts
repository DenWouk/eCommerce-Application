import { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line consistent-return
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  if (!body.firstName || !body.lastName) {
    return res.status(400).json({ data: 'First or last name not found' });
  }
  const { email, firstName, lastName, password } = body;
  const newCustomerBody = JSON.stringify({ email, firstName, lastName, password });
  const headers = new Headers();

  // TODO: save credentials to .env.local
  // TODO: create service to call CT backend
  headers.append('Authorization', 'Bearer 4CxlorqU7AFhw4VW8p_N_N_cF81V7FIC');
  headers.append('Content-Type', 'application/json');

  const result = await fetch(`${process.env.CT_API_HOST}/${process.env.CT_PROJECT_KEY}/customers`, {
    method: 'POST',
    body: newCustomerBody,
    headers,
  });

  const data = await result.json();
  res.status(200).json({ data });
};

export default handler;
