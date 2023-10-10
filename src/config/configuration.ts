import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST || '',
  db: {
    host: process.env.DB_URL,
  },
});
