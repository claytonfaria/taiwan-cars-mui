import type { NextApiRequest, NextApiResponse } from 'next';

import { getModels } from '../../lib/getModels';
import { getAsString } from '../../utils/getAsString';

export default async function models(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const make = getAsString(req.query.make);
  const models = await getModels(make);
  res.json(models);
}
