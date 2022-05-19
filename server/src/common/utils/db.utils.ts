import mongoose from 'mongoose';

/**
 * Chek if a string is valid mongoose objectId
 * @param id
 */
export function isValidObjectId(id: string): boolean {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return String(new mongoose.Types.ObjectId(id)) === id;
  }
  return false;
}
