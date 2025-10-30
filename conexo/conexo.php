<?php

$host = 'localhost';
$dbname = 'conexo';
$username = 'root';
$password = ''; 

try {
   $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   $query = "SELECT categories_json FROM json_conexo";
   $statement = $pdo->query($query);

   $results = [];

   while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
       $results[] = json_decode($row['categories_json'], true);
   }

   echo json_encode($results);
} catch (PDOException $e) {
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}
?>

