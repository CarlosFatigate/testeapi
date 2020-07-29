<?php
include './model/Vehicle.php';

class VehicleController{
	function insert($obj){
		$vehicle = new Vehicle();
		return $vehicle->insert($obj);
	}

	function update($obj,$id){
		$vehicle = new Vehicle();
		return $vehicle->update($obj,$id);
	}

	function delete($id){
		$vehicle = new Vehicle();
		return $vehicle->delete($id);
	}

	function find($id = null){
		$vehicle = new Vehicle();
		$result = $vehicle->find($id);	
        return $result;
	}

	function findAll($page = 1, $filter = null){
		$vehicle = new Vehicle();
		if(isset($filter['q']) && $filter['q'] != ''){
			return json_encode($vehicle->findAll($page, $filter['q']));
		}
		return json_encode($vehicle->findAll($page));
	}
}

?>