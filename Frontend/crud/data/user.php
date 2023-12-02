<?php

class User extends Base {
    static function getTableName() {
        return "users";
    }

    // all props except id
    static function getProps() {
        return ["username", "firstname", "lastname"];
    }
}