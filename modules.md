/ model
	- Productos.php

/ DAO
	- productosDAO.php
		* add
		* delete
		* udpate
		* list

/ controller
	- indexController.php
		* delete [:id]
		* update [:id]
		* add    [:data]

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


::views::
http://www.dmv.com/admin/products          	[list]
http://www.dmv.com/admin/productos/edit/5   [edit]
http://www.dmv.com/admin/productos/new      [new]

::actions::
http://www.dmv.com/admin/products/delete/5 	[delete]
http://www.dmv.com/admin/products/update/5 	[update]
http://www.dmv.com/admin/products/add 			[add]





