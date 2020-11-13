import type { NextApiRequest, NextApiResponse } from 'next';

import { getPaginatedCars } from '../../lib/getPaginatedCars';

export default async function Cars(req: NextApiRequest, res: NextApiResponse) {
  const searchResults = await getPaginatedCars(req.query);
  res.json(searchResults);
}
