import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please provide a question.'],
    maxlength: [200, 'Max of 200 characters'],
  },
  answer: {
    type: String,
    required: [true, 'Please provide the answer'],
    maxlength: [400, "Owner's Name cannot be more than 60 characters"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Faq || mongoose.model('Faq', FaqSchema);

export type FaqModel = {
  question: string;
  answer: string;
};
