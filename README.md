## Reuse Directory Admin

The admin interface for [ReUse Directory](https://github.com/waste-prevention-action-team/reuse-directory)

### Set Up

First complete the setup process for [ReUse Directory](https://github.com/waste-prevention-action-team/reuse-directory#set-up).

#### Google API Console

Create an OAuth consent screen and fill in the required fields such as `authorized domains`.

#### Configure your local environment

Create a `config.js` file in `src` based on `src/config-example.json`.
Fill in the following fields with the relevant data from previous steps:

- `google_api_key <string>`
- `google_sheet_id <string>`
- `admin_users <list of emails>`

### Local development

Install the dependencies from `package.json` (`npm install`) and run the dev server (`npm start`).

If you have restricted your application to specific domains on Google API Console, then you need to access the dev server on one of the whitelisted URLs.

For example, you can add `reuse-direcoty.org` to your `hosts` file on Linux and include it in your domains list on Google API Console.
If you do so, you also need to specify this domain in `ALLOWED_HOSTS` environment variable like this:

`ALLOWED_HOSTS=["reuse-directory.org"] npm start`
 
 or
 
 ```
 export ALLOWED_HOSTS=["reuse-directory.org"]
 npm start 
 ```

### Deploy

Make sure your `config.json` is up-to-date and then run `npm run build`, which creates a bundle in the `build` folder.

You can serve that folder on any file server, e.g. Github Pages and AWS S3.

If you would like to use Github Pages, run `npm run deploy`, which uses `gh-pages` library to push the `build` folder to Github.

Read more on Github Pages and other relevant issues like using a custom domain here: https://pages.github.com/  

### Contributors:

- [Kaveh Karimi (ka7eh)](https://github.com/ka7eh)

### Acknowledgements:

This project was conducted by [Corvallis Sustainability Coalition](https://sustainablecorvallis.org/) and funded by [Oregon Department of Environmental Quality](https://www.oregon.gov/DEQ)



