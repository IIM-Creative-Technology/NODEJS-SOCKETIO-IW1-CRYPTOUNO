import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.API_PORT, 10) || 3000,
  url: process.env.API_URL,
  heddibuApiUrl: process.env.API_HEDDIBU_URL,
  secret: process.env.JWT_SECRET,
  accessTokenExpiration: process.env.JWT_TOKEN_EXPIRATION,
  env: process.env.APP_ENV,
  database: {
    url: process.env.DATABASE_URL,
  },
}));
