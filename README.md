This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Application Specific Notes
This app started as an exercise for a company 
called TASC. The first phase was entirely in App.tsx.
Phase 2 was to seperate the components and add more
use of props which gave the app a better architecture.
Phase 3 will replace static data with Fetch REST calls
to a service running in Java Spring Boot with an in
memory data database that targets Oracle. 
 
## Application Features for Shopping Basket
Basket List
  A list of selectable shopping baskets
Basket Purchase Details
  Details of the selected shopping basket for purchase
Basket Purchase Receipt 
  Receipt details of the purchased shopping basket

## Application File Structure
src/App.tsx  (parent)
  The main app component 
src/shop/BasketList.tsx
  process the basket list (child of App.tsx)
src/shop/BasketPurchase.tsx 
  process the basket purchase (child of App.tsx)
src/shop/BasketReceipt.tsx
  process the basket purchase receipt (child of BasketPurchase.tsx)
src/calculators/RoundTax.tsx
  Rounds up the tax amounts
src/formatters/Currency2.tsx
  Converts amounts to currency  
src/data/data.tsx
  The data is local in arrays   
   