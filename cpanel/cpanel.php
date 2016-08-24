<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Energía Peñolite - Tienda</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/shop-homepage.css" rel="stylesheet">
    <link href="css/shop-item.css" rel="stylesheet">
    
    <!-- font awesome icons-->
    <link rel="stylesheet" href="font-awesome-4.6.3/css/font-awesome.min.css">
    <script src="js/jquery.js"></script>
    <script src="js/jquery-ui/jquery-ui.js"></script>
    
    <!-- Custom JSs -->
    
    <script src="js/control.js"></script>
    <script src="js/funciones.js"></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <!-- Navigation -->
    
    <nav class="main_nav navbar">
        <div class="user_area">

        </div>
        <div class="navigation" role="navigation">
            <ul class="topnav">
              <li><a href="#" onclick="control_navegarA('index.php')">Inicio</a></li>
              <li class="liDesplegable"><a href="#">Categorías/Artículos</a>
                  <ul class="despliegaCategorias">
                  
                </ul>
            </li>
                <li><a href="#">Noticias</a></li>
              <li><a href="#">Conócenos</a></li>
              <li class="icon">
                <a href="javascript:void(0);" onclick="control_toggleResponsiveNav()"><i class="fa fa-bars" aria-hidden="true"></i></a>
              </li>
            </ul>
        </div>

    </nav>

    <!-- Page Content -->
    <section class="bodyHeader row">
        <span class="col-md-12">
            <span class="bodyHeader_container col-md-9 col-md-push-2">
                <h2>Título Tienda</h2>
                <div class="search" role="search">
                    <form class="search_form">
                         <i class="fa fa-search fa-lg fa-flip-horizontal" aria-hidden="true"></i> <input type=search id="search_input" name="search_input">

                    </form>

                </div>
            </span>
        </span>
    </section>
    <div class="container main">

        <div class="row">

                
        </div>
        <div class="row">
            <div class="current_navigation_container">
                <nav class="current_navigation">
                           <ul class="current_navigation_ul">
                               <li class="current_navigation_ul_li"><a href="#home">Inicio</a></li>

                           </ul>
                </nav>
            </div>
        </div>
        <main id="main">
              

        </main>
        <div class='col-md-7 contenedor_compararArticulos display_none'>
            <i onclick="control_minimizar('compararArticulos')" class="minimizarCompararArticulos fa fa-minus fa-2x" aria-hidden="true"></i>
            <i onclick="control_cerrar('compararArticulos')" class="cerrarCompararArticulos fa fa-times fa-2x" aria-hidden="true"></i>
            <div class='col-md-12 contCompararArticulos'></div>
            <div class='col-md-12'><span class='col-md-2 col-md-push-5 contenedor_compararArticulosButton'><button onclick="control_compararArticulos();">Comparar</button></span></div>
        </div>
    </div>
    <!-- /.container -->

    <div class="container">
        

        <hr>

        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; Your Website 2014</p>
                </div>
            </div>
        </footer>

    </div>
    <!-- /.container -->

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>
</body>