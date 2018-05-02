<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>

</head>
<body <?php body_class();?>>
	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content' ); ?></a>
	<header id="masthead" class="site-header" role="banner">
		<h1>
			<polylith-site-name></polylith-site-name>
		</h1>
	</header>

	<div class="site-content-contain">
		<div id="content" class="site-content">
			<polylith-contents></polylith-contents>
		</div>
	</div>


<?php wp_footer(); ?>
</body>
</html>
