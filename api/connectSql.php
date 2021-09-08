<?php
    header("Content-Type:text/html; charset=utf-8");

	$host = 'localhost';
	$dbuser ='stockuser';
	$dbpassword = 'stockuser123';
	$dbname = 'stock';
	$link = mysqli_connect($host,$dbuser,$dbpassword,$dbname);

	if($link){
        mysqli_query($link,'SET NAMES utf8');
        mysqli_query($link,"SET CHARACTER SET UTF8");
        mysqli_query( $link, "SET NAMES 'utf8'");
        // echo "正確連接資料庫";
	}
	else {
        echo "不正確連接資料庫</br>" . mysqli_connect_error();
	}
?>