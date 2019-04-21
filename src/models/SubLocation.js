import mongoose, { Schema } from 'mongoose';

const SubLocationSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name cannot be blank']
  },
  maleCount: {
    type: Number,
    trim: true,
    min: 1,
    required: true,
  },
  femaleCount: {
    type: Number,
    trim: true,
    min: 1,
    required: true,
  },
  subLocation: [{
    type: Schema.Types.ObjectId,
    ref: 'Location'
  }]
}, {
  timestamps: true
});

const SubLocation = mongoose.model('SubLocation', SubLocationSchema);

export default SubLocation;
