<?php

class ArrayFunctions {
    static function join($count, $el) {
        $str = "";
        for($i=0; $i<$count; $i++) {
            $str .= $el;
            if($i+1 < $count)
                $str .= ", ";
        }
        return $str;
    }
}