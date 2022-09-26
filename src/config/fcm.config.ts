import { registerAs } from '@nestjs/config';

export default registerAs('fcm', () => ({
  serverKey: process.env.FCM_SERVER_KEY,
}));
