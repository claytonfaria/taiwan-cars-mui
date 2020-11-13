import type { FaqModel } from '../models/Faq';
import Faq from '../models/Faq';
import dbConnect from '../utils/dbConnect';

export const getFaq = async (): Promise<FaqModel[]> => {
  await dbConnect();

  const faqs = await Faq.find().lean();

  return faqs.map(({ _id, date, ...result }) => result) as FaqModel[];
};
