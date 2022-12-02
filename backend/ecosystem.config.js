// eslint-disable-next-line @typescript-eslint/no-var-requires
// const dotenv = require('dotenv');

// dotenv.config({ path: './.env' });

// const {
//   JWT_KEY,
//   POSTGRES_HOST,
//   POSTGRES_USER,
//   POSTGRES_PASSWORD,
//   POSTGRES_DB,
//   POSTGRES_PORT,
// } = process.env;

// console.log(JWT_KEY + 'sss');

module.exports = {
  apps: [
    {
      name: 'api-service',
      script: './dist/main.js',
      // env_production: {
      //   NODE_ENV: 'production',
      //   JWT_KEY:
      //     'ab6cbf4f7b16a9d08f35a86d7f50ba372199a9e2adb3c15ce1145837a90aa104',
      //   POSTGRES_HOST: 'host.docker.internal',
      //   POSTGRES_PORT: 5432,
      //   POSTGRES_USER: 'student',
      //   POSTGRES_PASSWORD: 'student',
      //   POSTGRES_DB: 'kupipodariday',
      //   PGDATA: '/var/lib/postgresql/data/pgdata',
      // },
    },
  ],
};
