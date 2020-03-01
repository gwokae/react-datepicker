# React Datepicker

## How to start up dev environment?

1. Install latest LTS version [Node.js](https://nodejs.org/en/download/) (tested on `v10.16.3`)
2. Install packages for the root folder and `demo` folder by running command `npm install` accordingly
3. Build `lib` by running `npm run build` or `npm run build-js-watch` in the oot folder of the project to enable watch mode (Since this package is not published, we have to manually build)
4. Start dev server for `demo` by run `npm start` in `demo` folder
5. Checkout [http://localhost:1234/](http://localhost:1234/)

## How to build and open dist bundle for `demo`?

1. same as step 1~3 above.
2. Run `npm run build` in `demo` folder.
3. You can find the bundle in `demo/dist`
4. Because of the security issue of browsers, you can't just open `index.html` in `demo\dist`. You should host these files on a server. For example, you can execute a command like `npx live-server demo/dist` to run a web server locally.

Author: [Leonard Lin](mailto:gwokae@gmail.com)
