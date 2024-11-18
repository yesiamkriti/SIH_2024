import { NextApiRequest, NextApiResponse } from 'next';
import mongoose, { Document, Model } from 'mongoose';

// Define the feedback interface for TypeScript
interface IFeedback extends Document {
  name: string;
  gender: string;
  age: number;
  patientId: number;
  reason: string;
  trustRating: string;
}

// Define the mongoose model
let Feedback: Model<IFeedback>;

try {
  Feedback = mongoose.model('Feedback');
} catch {
  const feedbackSchema = new mongoose.Schema<IFeedback>({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    patientId: { type: Number, required: true },
    reason: { type: String, required: true },
    trustRating: { type: String, required: true }
  });

  Feedback = mongoose.model<IFeedback>('Feedback', feedbackSchema);
}

// Connect to MongoDB
const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  try {
    return mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Unable to connect to MongoDB');
  }
};

// API Route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectMongo();
      const { name, gender, age, patientId, reason, trustRating } = req.body;

      const feedback = new Feedback({
        name,
        gender,
        age,
        patientId,
        reason,
        trustRating,
      });

      const savedFeedback = await feedback.save();
      res.status(200).json({ message: 'Feedback submitted successfully!', data: savedFeedback });
    } catch (error) {
      console.error('Error saving feedback:', error);
      res.status(500).json({ message: 'Error submitting feedback', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
