<?php

if($_SERVER['REQUEST_METHOD'] == 'GET') {
    if(isset($_SERVER["PATH_INFO"])) {
        $id = ltrim($_SERVER["PATH_INFO"], '/');
        echo json_encode($className::get($id));
    }
    else {
        echo json_encode($className::getAll());
    }
}

else if($_SERVER["REQUEST_METHOD"] == 'POST') {
    $data = json_decode(file_get_contents('php://input'));
    $className::create($data);
}

else if($_SERVER["REQUEST_METHOD"] == 'PATCH') {
    $data = json_decode(file_get_contents('php://input'));
    $id = ltrim($_SERVER["PATH_INFO"], '/');
    $className::update($id, $data);
}

else if($_SERVER["REQUEST_METHOD"] == 'DELETE') {
    $id = ltrim($_SERVER["PATH_INFO"], '/');
    $className::delete($id);
}