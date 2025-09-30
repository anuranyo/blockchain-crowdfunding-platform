const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  imageURL: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
  goalAmount: {
    type: Number,
    required: [true, 'Please add a goal amount'],
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  deadline: {
    type: Date,
    required: [true, 'Please add a deadline'],
  },
  backers: [{
    backer: { type: mongoose.Schema.ObjectId, ref: 'User' },
    amount: { type: Number }
  }],
  // Field for ML prediction result
  successProbability: {
    type: Number,
    default: null
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);