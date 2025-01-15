# Upsun (CLI) extension

Upsun is a fully-managed Platform as a Service (PaaS), which lets you deploy, scale web and API apps.
Use Upsun's extension for VS Code to quickly manage your project at Upsun.

Visit Upsun's [website](https://upsun.com/) for more information about the company.

## Features

- Open public URLs of defined routes
- Open Upsun console
- Open SSH session

## Requirements

1. To use this extensions you need to [install Upsun's CLI](https://docs.upsun.com/development/cli.html#1-install)
2. Install Upsun's CLI extension for Visual Studio Code
3. Configure binary path to Upsun's CLI

## Building locally

```
npm install
./scripts/package_make.sh
```

Which should output dist/upsun-cli-x.x.x.vsix that you can locally install


## Release Notes

### 0.2.0 - beta

Add views of Environment, Applications & Relationship.
- Activate / Deactivate environement
- Redeploy environement

### 0.1.0 - beta

Initial release of PSH-cli.
- Open web site URL
- Open Upsun console
- Open SSH terminal
