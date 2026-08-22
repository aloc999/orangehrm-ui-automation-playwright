import * as dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  baseUrl: process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',
  admin: {
    username: process.env.ADMIN_USERNAME ?? 'Admin',
    password: process.env.ADMIN_PASSWORD ?? 'admin123',
  },
} as const;
