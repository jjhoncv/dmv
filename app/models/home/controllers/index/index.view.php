<?php 
class IndexController{
	
	public function indexAction(){        
		
		$menu = array(
			array(
				"label" => "Artistas",
				"attr" => array(
					"class"   => "active",
					"data-id" => 12
				),
			),	
			array(
				"label" => "Albunes"
			),
			array(
				"label" => "Letras"
			)
		);

		$this->view->foreachMenu = array(
			"statement" => "$menu as $key => $val",
			
		)
		$this->view->foreachMenuOption = "$menu as $key => $val";
  }
}