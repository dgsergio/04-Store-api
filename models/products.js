import mongoose from 'mongoose';
const { Schema } = mongoose;

const products = new Schema({
  name: String,
});
