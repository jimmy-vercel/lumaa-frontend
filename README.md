# Frontend setup

- Install the dependencies
  ```
  $ npm install
  ```
- Create a .env file on the root directory and put these variables into it (Update them with your own values).
  ```
  VITE_BACKEND_URL=http://localhost:3000
  ```
- Run the servers on your local
    - Run the development server
      ```
      $ npm run dev
      ```
    - Run the tests
      ```
      $ npm run test           # run the tests
      $ npm run test:watch     # run the tests in watch mode
      $ npm run test:coverage  # generate tests coverage report
      ```
    