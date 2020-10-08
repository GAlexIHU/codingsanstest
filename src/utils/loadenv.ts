import path from 'path';
import dotenv from 'dotenv';

function loadenv(): string {
  const envType =
    process.env.NODE_ENV === 'development' ? 'development' : process.env.NODE_ENV === 'test' ? 'test' : 'production';
  dotenv.config({ path: path.resolve(__dirname, `../../config/.env.${envType}`) });
  return envType;
}

loadenv();

export default loadenv;
