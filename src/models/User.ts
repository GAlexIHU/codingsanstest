import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface UserDocument extends mongoose.Document {
  username: string;
  password: string;
  createdAt: Date;
  validatePassword: (password: string) => Promise<boolean>;
  getSignedToken: () => Promise<string>;
}

export interface UserModel extends mongoose.Model<UserDocument> {}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hashing passwords
userSchema.pre<UserDocument>('save', function(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  }
});

userSchema.methods.validatePassword = function(password: string): Promise<boolean> {
  return new Promise((res, rej) => {
    bcrypt.compare(password, this.password, (err, same) => {
      if (err) return rej(err);
      return res(same);
    });
  });
};

userSchema.methods.getSignedToken = async function(): Promise<string> {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export default mongoose.model<UserDocument, UserModel>('User', userSchema);
