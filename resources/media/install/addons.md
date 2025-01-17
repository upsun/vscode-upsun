# Add addons for Upsun

Upsun Activation team has published a few tools that can be helpful in different context.

## ConvSun

If you have a running Platform.sh project and you want to test Upsun with it you may have noticed that you will need to modify your configuration files to a new format.
Upsun has merged all previous configuration files into one single yaml file.

To install it: click on the walkthrough button "Convert to Upsun".

The code repository is opened to contribution under our [Github organization](https://github.com/upsun/convsun).

## ClonSun

To push it a little bit further
, while ConvSun is great to make your project compatible to run on Upsun you 
will still have to create a new project, 
configure it (import your environment variable), add your users to it, import the database etc.

Here ClonSun will handle all this for you after converting your configuration files.

You have several parameters that you can use, to synchronize your data only for instance, or not import your users if it's not necessary.

This binary will clone your existing project to a new destination, which can be either a different region within Platform.sh or Upsun or from Platform.sh to Upsun. 

To install it: click on the walkthrough button "Clone Upsun project".

Just like ConvSun, its code repository is opened to contribution under our [Github organization](https://github.com/upsun/convsun).
