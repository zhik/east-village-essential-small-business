# What's Open In The East Village Area During COVID-19?

A directory of essential businesses that are open in the East Village area during COVID-19. 

## How to Contribute

- File an issue via this [repo's issues page](https://github.com/zhik/east-village-essential-small-business/issues).
- Request a feature via this [repo's issues page](https://github.com/zhik/east-village-essential-small-business/issues).
- Comment on issues.
- Write code to fix issues or to create new features. When contributing code, please be sure to:
  - Fork this repository, modify the code (changing only one thing at a time), and then issue a pull request for each change.
  - Follow the project's coding style (using K&R-style indentation and bracketing, commenting above each feature, and using snake case for variables).
  - Test your code locally before issuing a pull request.
  - Clearly state the purpose of your change in the description field for each commit.

## Architecture

This map shows business locations for East Village, from data hosted in [Google Sheets](https://docs.google.com/spreadsheets/d/1Z3pNCmtJhVNwo_tJDnb1i_qAsxYEglRPN9lztTATIVM/).


This application is built using [Svelte](https://svelte.dev/), [drive-db](https://www.npmjs.com/package/drive-db), [Leaflet](https://leafletjs.com/), and [Carto.js](https://carto.com/developers/carto-js/).

Icons from [Maps Icons Collection](https://mapicons.mapsmarker.com).

## Setup

Install node.js packages

```bash
npm install
```

You can either build by running `npm run build` or run live development environment by running `npm run dev`, then opening [localhost:5000](http://localhost:5000/) in your browser.

## Todo

- [ ] A11y - Screenreader and keyboard support
- [ ] Internationalization

## Copyrights

Please see [license](https://github.com/zhik/east-village-essential-small-business/blob/master/LICENSE) file for details.

- Non-code, Creative Commons Attribution 4.0
- Code, GNU General Public License

## Have Questions?
Email [Zhi Keng He](mainto:zhi@beta.nyc)