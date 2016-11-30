cada modulo trabajar por separado

Modulo::Productos

/ model
	- Productos.php

/ DAO
	- productosDAO.php

/ controller
	- indexController.php

/ views
	- new.phtml
	- edit.phtml
	- list.phtml

/ admin
	/ public
		- index.php
		
		/ static
			/ js
			/ css
			/ img

/- frontend
	/- source

		/- views
			- new.pug
			- edit.pug
			- list.pug

		/- js
			- new.es6
			- edit.es6
			- list.es6

		/- css
			- new.styl
			- edit.styl
			- list.styl

/- frontend
	- layout.pug
	/- _partials
		- header.pug
		- footer.pug