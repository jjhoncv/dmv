<!DOCTYPE html>
<html>
  <head>
    <title>Demo</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="description" content="Demo project">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<?php echo _STATIC_ ?>/libs/dist/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="<?php echo _STATIC_ ?>/css/dist/fonts.css">
    <link rel="stylesheet" href="<?php echo _STATIC_ ?>/css/dist/index.css">
    <script type="text/javascript">
      var yOSON = {
        "module": "home",
        "controller": "index",
        "action": "index",
        "baseHost": "",
        "statHost": "",
        "eHost": "",
        "statVers": "",
        "AppCore": {},
        "AppSandbox": {},
        "AppSchema": {
          "modules": {},
            "requires": {}
        }
      };
    </script>
  </head>
  <body>
    <body>   
      <header>
        <nav class="navbar navbar-default">
          <div class="container">
            <ul class="nav navbar-nav">
              <li class="active"><a>Login</a></li>
            </ul>
          </div>
        </nav>
      </header>
      <main>
        <div class="container">
          <form>
            <input type="text" name="username" placeholder="username">
            <input type="text" name="password" placeholder="password">
            <input type="submit">
          </form>
        </div>
      </main>
      <footer>
        <div class="container">
          <div class="row">
            <div class="col-xs-6">
              <h5>footer</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p>
            </div>
            <div class="col-xs-6">
              <h5>Links</h5>
              <ul>
                <li class="active"><a>Login</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container">© 2014 Copyright Text<a href="#">More links</a></div>
        </div>
      </footer>
    </body>
  </body>
  <script src="<?php echo _STATIC_ ?>/libs/dist/jquery/dist/jquery.js" type="text/javascript"></script>
  <script src="<?php echo _STATIC_ ?>/libs/dist/yosonjs/dist/yoson.js" type="text/javascript"></script>
  <script src="<?php echo _STATIC_ ?>/js/dist/scripts/index.js" type="text/javascript"></script>
  <script src="<?php echo _STATIC_ ?>/js/dist/libs/yosonjs-utils.js" type="text/javascript"></script>
</html>