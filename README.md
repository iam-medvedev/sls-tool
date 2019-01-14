[![npm version](https://badge.fury.io/js/sls-tool.svg)](https://www.npmjs.com/package/sls-tool) ![](https://img.shields.io/github/license/iam-medvedev/sls-tool.svg)

# sls

A CLI tool that displays available scripts from package.json

# Installation

```
$ yarn global add sls-tool
or
$ npm install -g sls-tool
```

# Static mode

This mode just show list of scripts.

```
$ sls

package.json scripts:
* start (react-scripts start)
* build (react-scripts build)
* test (react-scripts test --env=jsdom)
* eject (react-scripts eject)
```

# Interactive mode

This mode allows you select and run script from list.

```
$ sls -i

package.json scripts:
● start — react-scripts start
○ build — react-scripts build
○ test — react-scripts test --env=jsdom
○ eject — react-scripts eject
```
