<?php
include './config/Connection.php';

class Vehicle extends Connection{
	private $vehicle;
    private $brand;
    private $year;
    private $description;
    private $sold;
    private $created;
    private $updated;

    function getVehicle() {
        return $this->vehicle;
    }

    function getBrand() {
        return $this->brand;
    }

    function getYear() {
        return $this->year;
    }

    function getDescription() {
        return $this->description;
    }

    function getSold() {
        return $this->sold;
    }

    function getCreated() {
        return $this->created;
    }

    function getUpdated() {
        return $this->updated;
    }

    function setVehicle($vehicle) {
        $this->vehicle = $vehicle;
    }

    function setBrand($brand) {
        $this->brand = $brand;
    }

    function setYear($year) {
        $this->year = $year;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setSold($sold) {
        $this->sold = $sold;
    }

    public function insert($obj){
        try {
            $sold = isset($obj["sold"]) ? true: false;
            $sql = "INSERT INTO vehicles(`vehicle` ,`brand`,`year`,`description`,`sold`) VALUES ('".$obj["name"]."','".$obj["brand"]."','".intval($obj["year"])."','".$obj["description"]."','".$sold."')";
            $query = Connection::prepare($sql);
            return $query->execute();
        } catch (PDOException $e) {
            return $e->getMessage();
        }

	}

	public function update($obj,$id = null){
        try {
            $sql = "UPDATE vehicles SET `vehicle` =  '".$obj["name"]."', `brand` = '".$obj["brand"]."',`year` = '".intval($obj["year"])."', `description` = '".$obj["description"]."',`sold` = '".$obj["sold"]."' WHERE `id_vehicle` = ".$id;
            $query = Connection::prepare($sql);
            return $query->execute();
        } catch (PDOException $e) {
            return $e->getMessage();
        }
	}

	public function delete($id){
        try {
            $sql =  "DELETE FROM vehicles WHERE id_vehicle = :id";
            $query = Connection::prepare($sql);
            $query->execute(array('id' => $id));
            $query->execute();
        } catch (PDOException $e) {
            return $e->getMessage();
        }
	}

	public function find($id = null){
        try {
            $sql = "SELECT * FROM vehicles WHERE id_vehicle = :id";
            $query = Connection::prepare($sql);
            $query->execute(array('id' => $id));
            $result = json_encode($query->fetch());
            return $result;
        } catch (PDOException $e) {
            return $e->getMessage();
        }
	}

	public function findAll($page,$filter = null){
        $limit = 5;

        $sqlCount = "SELECT * FROM vehicles";
        if($filter){
            $sqlCount .= " WHERE vehicle LIKE '%$filter%'";
        } 
        $queryCount = Connection::prepare($sqlCount);
        $queryCount->execute();
        $count = $queryCount->rowCount();
        $lastPage = ceil($count/$limit);

        $sql = "SELECT * FROM vehicles";
        if($filter){
            $sql .= " WHERE vehicle LIKE '%$filter%'";
        } 
        $offset = ($page-1) * $limit;
        $sql .= " LIMIT $limit OFFSET $offset";

        $query = Connection::prepare($sql);
        $query->execute();
		return ['data' => $query->fetchAll(), 'page' => $page, 'lastPage' => $lastPage];
	}

}
