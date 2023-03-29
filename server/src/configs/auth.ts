export const authConfig = {
  token: {
    secret: process.env.JWT_SECRET ?? 'default',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
  },
}
