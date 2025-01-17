# Install the Upsun CLI

The Upsun CLI, and Console are both relying on the underlying Upsun API [learn more](https://api.upsun.com/docs/).

Thanks to the CLI you will be able to manage your Upsun projects directly from your terminal. Anything you can do within the Console can be done with the CLI.
The VSCode extension that you are using here, will be leveraing the CLI in order to work.


The CLI uses the git interface and the [Upsun REST API](https://api.platform.sh/docs/) to accomplish tasks.
Its source code is hosted on [GitHub](https://github.com/platformsh/cli).


## On click install

Look at the left panel where to click on the "Install Upsun CLI" button to automatically complete the CLI installation.


## Manual install

Installation script:
```
curl -fsSL https://raw.githubusercontent.com/platformsh/cli/main/installer.sh | VENDOR=upsun bash
```


Homebrew: 

```
brew install platformsh/tap/upsun-cli
```

Scoop:

```
scoop bucket add platformsh https://github.com/platformsh/homebrew-tap.git
scoop install upsun
```


## Documentation reference

[Learn more](https://docs.upsun.com/administration/cli.html#1-install)



