<?php 
var_dump($_POST);
echo "<br>";
var_dump($_GET);
session_start();
$database=mysqli_connect("localhost","tfg_admin","","tfg");
$selectIdentUsuario="Select ident from usuarios where email='".$_SESSION["email"]."'";
$res=mysqli_query($database,$selectIdentUsuario);
if(!$res){
    die("Error en la query $selectIdentUsuario<br>");
}
$identUsuario=mysqli_fetch_object($res);
$idUsuario=$identUsuario->ident;

//creamos el pedido
$caracteres="abcdefgijklmnopqrstuvxyz01234567890";
$identPedido="";
for($it=0;$it<11;$it++){
 $identPedido.=$caracteres[rand(0,strlen($caracteres)-1)];    
}
$fecha=date("Y-m-d");
$sqlPedido="INSERT into pedidos (ident,ident_usuario,fecha,estado) values('".$identPedido."',".$idUsuario.",".$fecha.",0)";

$res=mysqli_query($database,$sqlPedido);
if(!$res){
    die("Error en la query $sqlPedido<br>"); 
}

for($l=0;$l<sizeof($_POST["articulos"]);$l++){
    $sqlLineasPedido="INSERT INTO lineasPedido(ident,identPedido,identArticulo,cantidad) values (0,'".$identPedido."',".$_POST["articulos"][$l][0].",".$_POST["articulos"][$l][7].")";
    $res=mysqli_query($database,$sqlLineasPedido);
    if(!$res){
        die("Error en la query $sqlLineasPedido");
    }
    
}


?>