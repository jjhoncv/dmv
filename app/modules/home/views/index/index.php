<?php
require '../app/modules/facebook/facebook.php';
$facebook = new Facebook(array(
  'appId'  => '231693037252894',
  'secret' => '311585a9a89d00da75d86784f525f1fc'
));
// See if there is a user from a cookie
$user = $facebook->getUser();
if ($user) {
  try {
    // Proceed knowing you have a logged in user who's authenticated.
    $user_profile = $facebook->api('/me');
  } catch (FacebookApiException $e) {
    echo '<pre>'.htmlspecialchars(print_r($e, true)).'</pre>';
    $user = null;
  }
}
?>

<!DOCTYPE html>
<html xmlns:fb="http://www.facebook.com/2008/fbml">
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
  
        <?php if ($user) { ?>
          Your user profile is
          <pre>
            <?php print htmlspecialchars(print_r($user_profile, true)) ?>
          </pre>
        <?php } else { ?>
          <fb:login-button scope="offline_access,publish_stream,sms,email,user_birthday,user_photos,user_photo_video_tags,user_checkins,friends_checkins"></fb:login-button>
        <?php } ?>
        <div id="fb-root"></div>

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

    <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId: '<?php echo $facebook->getAppID() ?>',
          cookie: true,
          xfbml: true,
          oauth: true
        });
        FB.Event.subscribe('auth.login', function(response) {
          window.location.reload();
        });
        FB.Event.subscribe('auth.logout', function(response) {
          window.location.reload();
        });
      };

      (function() {
      var e = document.createElement('script'); e.async = true;
      e.src = document.location.protocol +
        '//connect.facebook.net/en_US/all.js';
      document.getElementById('fb-root').appendChild(e);
      }());
    </script>
    
  </body>
  <script src="<?php echo _STATIC_ ?>/libs/dist/jquery/dist/jquery.js" type="text/javascript"></script>
  <script src="<?php echo _STATIC_ ?>/libs/dist/yosonjs/dist/yoson.js" type="text/javascript"></script>
  <script src="<?php echo _STATIC_ ?>/js/dist/scripts/index.js" type="text/javascript"></script>
  <script src="<?php echo _STATIC_ ?>/js/dist/libs/yosonjs-utils.js" type="text/javascript"></script>
</html>