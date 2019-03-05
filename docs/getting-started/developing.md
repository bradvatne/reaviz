# Developing

If you want to run the project locally, its really easy! 

The project uses Storybook for its demos and development
enviroment. To run it locally:

- Clone repo
- `npm i`
- `npm start`

Once started the browser will open to the storybook url.
From here you can tweak the charts and see them build
and reload in realtime.

We use Rollup to build and package for distribution.
You can run this by doing `npm run build` and it will
create a `dist` folder with the type definitions, bundled
javascript and css files.
