<?php

abstract class Base {

    #region [ Connection to database ]
    protected static function connection() {
        try {
            $conn = new PDO("mysql:host=".SERVER.";dbname=".DATABASE.";charset=utf8", USERNAME, PASSWORD);
            $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch(PDOException $ex) {
            echo "Connection error!";
        }
    }
    #endregion


    #region [ Abstract functions ]
    static abstract function getTableName();
    static abstract function getProps();
    #endregion


    #region [ CRUD ]
    static function getAll() {
        $conn = self::connection();
        $table = static::getTableName();
        $query = "SELECT * FROM $table";
        return $conn->query($query)->fetchAll();
    }

    static function get($id) {
        $conn = self::connection();
        $table = static::getTableName();
        $query = "SELECT * FROM $table WHERE id = :id";
        $result = $conn->prepare($query);
        $result->execute(array(":id" => $id));
        return $result->fetch();
    }

    static function create($item) {
        $conn = self::connection();
        $table = static::getTableName();
        $props = static::getProps();
        $query = "INSERT INTO $table VALUES(null, " . ArrayFunctions::join(count($props), "?") . ")";
        $result = $conn->prepare($query);
        $execArr = self::getValues($item);
    
        return $result->execute($execArr);
    }

    static function update($id, $item) {
        $conn = self::connection();
        $table = static::getTableName();
        $setPartOfQuery = self::getStrForUpdate($id, $item);
        
        $query = "UPDATE $table SET $setPartOfQuery WHERE id = ?";
        $result = $conn->prepare($query);
        $execArr = self::getValues($item);
        array_push($execArr, $id);
    
        return $result->execute($execArr);
    }

    static function delete($id) {
        $conn = self::connection();
        $table = static::getTableName();
        $query = "DELETE FROM $table WHERE id = :id";
        $result = $conn->prepare($query);
        return $result->execute(array(":id" => $id));
    }
    #endregion


    #region [ Helpers ]
    static function getValues($item) {
        $arr = [];
        foreach(static::getProps() as $prop) {
            $value = $item->{$prop};
            array_push($arr, $value);
        }
        return $arr;
    }

    static function getStrForUpdate($id, $item) {
        $str = "";
        foreach(static::getProps() as $prop) {
            $str .= $prop . " = ?, ";
        }
        $str = substr($str, 0, -2);
        return $str;
    }
    #endregion

}