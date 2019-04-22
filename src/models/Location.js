import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const LocationSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Name cannot be blank'],
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
    required: true,
    min: 1,
  },
  totalResidents: {
    type: Number,
    trim: true
  }
}, {
  timestamps: true
});

LocationSchema.plugin(mongoosePaginate);

// eslint-disable-next-line func-names
LocationSchema.pre('save', function (next) {
  this.totalResidents = this.maleCount + this.femaleCount;

  next();
});

const Location = mongoose.model('Location', LocationSchema);

export default Location;
