import { registerAs } from '@nestjs/config';

/**
 * Registers the configuration object with nest config module, under the namespace "google-oauth"
 */
export default registerAs('google-oauth', () => ({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}));
