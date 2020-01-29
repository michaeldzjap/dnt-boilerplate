import mongoose from 'mongoose';

import schema from './schemas/user';

export default mongoose.model('User', schema);
