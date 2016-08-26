
function gestion_rellenarContKpis(){
    $.ajax({
        url:"json/getKpis.php",
        method:"POST",
        success: function(result){
            if(result!="sin resultados"){
                var n= JSON.parse(result);
                var activo=null;
                var grafica="";
                $.each(n,function(key,value){
                    
                    var span="<span class='kpis' id="+value["ident"]+" data-padre='"+value["ident_padre"]+"' data-nombre='"+value["nombre"]+"' onclick='gestion_rellenarDetallesKpi(this)'>"+value["nombre"]+"<span class='eliminarKpi pull-right'>&nbsp;<i class='fa fa-trash' onclick='gestion_eliminarKpi(this);' aria-hidden='true'></i></span></span>";                         
                    //&nbsp;<i class='fa fa-minus' onclick='eliminarKpi(this);' aria-hidden='true'></i>
                    if(activo==null){
                        activo=value["ident"];
                        grafica=value["nombre"];
                    }
                    if(value["ident_padre"]!=null){
                       
                        var cpadre=$("#padre"+value["ident_padre"]).length;
                       if(cpadre>0){
                           
                       }else{
                           $(".estadisticas_contKpi").append("<span class='kpis_cabezaGrupo' id='padre"+value["ident_padre"]+"'>"+value["padre"]+"<span class='eliminarKpi pull-right'>&nbsp;<i class='fa fa-trash' onclick='gestion_eliminarGrupoKpis(this);' aria-hidden='true'></i></span></span>");
                       }
                        
                        
                        
                        var nh=$("#padre"+value["ident_padre"]).find(".kpis_subMenu").length;
                       if(nh>0){
                           //tiene hijo -- introducimos en el hijo
                            $("#padre"+value["ident_padre"]).find(".kpis_subMenu").append(span);
                    
                       }else{
                           //creamos hijo y añadimos a el
                           $("#padre"+value["ident_padre"]).append("<div class='kpis_subMenu'></div>");                                         
                        $("#padre"+value["ident_padre"]).find(".kpis_subMenu").append(span);
                           
                       }
                                                
                    }else{

                        $(".estadisticas_contKpi").append(span);
                        
                    }
                    
                });
                
            }else{
                
            }
                var addKpi='<div onclick="abrir_nuevoKpi();" class="col-md-12 addKpi addNuevo"><i class="fa fa-plus fa-3x" aria-hidden="true"></i></div>';
                $(".estadisticas_contKpi").append(addKpi);
                $("#"+activo).addClass("graficaActiva");
                gestion_rellenarDetallesKpi($(".graficaActiva"));
                
        }
    });
    
}
function gestion_cargarGrafica(nombre){
    $(".estadisticas_grafica").find("img").remove();
    $(".estadisticas_grafica").append("<img src='graficos/"+nombre+".php'>");
    //$(".estadisticas_grafica").append("<img src='graficos/default.php'>");
}

function gestion_cargarParametrosGrafica(idGrafica){
    $.ajax({
        url:"json/getParametros.php",
        method:"POST",
        data:{id:idGrafica},
        success: function(result){
        }
    });
}

function gestion_eliminarKpi(kpi){
    
    var id=$(kpi).parent().parent().attr("id");
    console.log(id);
    $.ajax({
        url:"json/eliminarKpi.php",
        method:"POST",
        data:{id:id},
        success: function(result){
            if(result=="ok"){
                $(".estadisticas_contKpi").find(".kpis").remove();
                gestion_rellenarContKpis();
                
            }
        }
    });
}



function gestion_cargarParametrosTabla(nombreTabla){
    $.ajax({
        url:"json/getParametrosTabla.php",
        method:"POST",
        data:{tabla:nombreTabla},
        success: function(result){
            if(result!="sin resultados"){
                var n=JSON.parse(result);
                $("#paramX").empty();  
                $("#paramY").empty();  
                $.each(n,function(key,value){
                    
                    $("#paramX").append("<option value='"+value["campo"]+"' data-type='"+value["tipo"]+"'>"+value["campo"]+"</option>"); 
                    //console.log(value["tipo"]); 
                    var ints=value["tipo"].search("int");
                    var floats=value["tipo"].search("float");
                    if(ints!=-1 || floats!=-1){
                        $("#paramY").append("<option value='"+value["campo"]+"'>"+value["campo"]+"</option>");  
                    }
                });
            }
        }
    });
}

function gestion_nuevoKpi(event,form){
    event.preventDefault();
    var nombre=$("#input_nombre").val();
    var regexp=/[a-zA-Z][a-zA-Z ]{3,}/;
    if(nombre.match(regexp)){
        var array=[];
        array.push(nombre);
        var selects=$(form).find("select");
        for(var i=0;i<selects.length;i++){
            var params=[$(selects[i]).val(),$(selects[i]).find('option[value="'+$(selects[i]).val()+'"]').attr("data-type")];
            array.push(params);
        }
        var descripcion=$("#input_descripcion").val();
        array.push(descripcion);
       $.ajax({
        url:"json/nuevoArchivoKpi.php",
        method:"POST",
        data:{data:array},
        success: function(result){
            if(result=="ok"){
                //var n=JSON.parse(result);
                abrir_GraficasKpis();
            }
        }
    });
        
    }else{
     alert("Nombre: Mínimo 4 caracteres");
    }
}

function gestion_rellenarDetallesKpi(elemento){
    
    $(".graficaActiva").removeClass("graficaActiva");
    $(elemento).addClass("graficaActiva");
    $(".contParametros").load("includes/gestion_detallesKpi.php",{elemento:$(elemento).attr("id")});
}

function gestion_rellenarAvisos(categoria){
     $.ajax({
        url:"json/getAvisos.php",
        method:"POST",
        data:{categoria:categoria},
        success: function(result){
            if(result!="sin resultados"){
                var n=JSON.parse(result);
                $.each(n,function(key,value){
                    var leido='';
                    var clase='';
                    if(value["leido"]==0){
                        leido='<i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp; Nuevo!&nbsp;';
                        clase='noLeido';
                    }else{
                        leido='Visto';
                        clase='leido';
                    }
                    var row="<div id="+value["ident"]+" class='col-md-12 "+clase+" nAviso'><span class='datosAviso col-md-2'>"+leido+"</span><span class='datosAviso col-md-9'>"+value["titulo"]+"<span class='masInfoAviso'> <span class='masdatosAviso col-md-12'><span class='masDatosNombre col-md-4'>Descripcion: </span><span class='masDatosValor col-md-8'>"+value["descripcion"]+"</span></span><span class='masdatosAviso col-md-12'><span class='masDatosNombre col-md-4'>Categoria: </span><span class='masDatosValor col-md-8'>"+value["nombre"]+"</span></span></span></span></div>";
                    $(".rowsAvisos").append(row); 
                });
                $(".nAviso").on("click", function(e){
                        $(this).find(".masInfoAviso").toggleClass("nAvisoActivo");
                        if($(this).hasClass("noLeido")){
                            misc_marcarComoLeido($(this));
                        }
                });
            }else{
                
            }
        }
    });
}

function gestion_nuevoElementoPortada(){
    
     $.ajax({
        url:"json/getTipoElementosPortada.php",
        method:"POST",
        success: function(result){
            if(result!="sin resultados"){
                var select="<h3>Seleccione el tipo de elemento</h3><select id='tiposElementoPortada'></select></div>";
               $("#contTiposElementosPortada").empty(); $("#contTiposElementosPortada").append(select);
                var n=JSON.parse(result);
                console.log(n);
                $.each(n,function(key,value){
                    var option="<option value='"+value["url"]+"'>"+value["nombre"]+"</option>";
                    $("#tiposElementoPortada").append(option);
                });
                $("#parametrosElementoPortada").load($("#tiposElementoPortada").val(),{url:$("#tiposElementoPortada").val()});
                $("#tiposElementoPortada").change(function(){
                    $("#parametrosElementoPortada").load($("#tiposElementoPortada").val(),{url:$("#tiposElementoPortada").val()});
                });
            }else{
                
            }
        }
    });
    
}

function gestion_eliminarElemento(elemento){
    var id=$(elemento).attr("data-ident");
    $.ajax({
        url:"json/eliminarElemento.php",
        method:"POST",
        data:{id:id},
        success: function(result){
            if(result=="ok"){
                abrir_elementosPortada();
            }else{
                alert("Error al eliminar");
            }
        }
    });
}

function gestion_activarElemento(elemento){
    var id=$(elemento).attr("data-ident");
    var value=0;
    if($(elemento).hasClass("fa-check-square-o")){
        //desactivo
        $(elemento).removeClass("fa-check-square-o");
        $(elemento).addClass("fa-square-o");
        value=0;
    }else{
        //activo
        $(elemento).removeClass("fa-square-o");
        $(elemento).addClass("fa-check-square-o");
        value=1;
    }
    var send=[id,value];
    $.ajax({
        url:"json/activarElemento.php",
        method:"POST",
        data:{params:send},
        success: function(result){
            if(result=="ok"){
                
            }else{
                alert("Error al eliminar");
            }
        }
    });
}

function gestion_seleccionarElemento(elemento){

        $(".elementoActivo").removeClass("elementoActivo");
        $(elemento).addClass("elementoActivo");
        $(".previewElemento").load($(elemento).attr("data-url"));

}

function gestion_rellenarModulos(){
     $.ajax({
        url:"json/getModulos.php",
        method:"POST",
        success: function(result){
            if(result!="sin resultados"){
                var n=JSON.parse(result);
                $.each(n,function(key,value){
                   console.log(value);
                     var span="<span class='rowContent' id="+value["ident"]+" data-url='"+value["url"]+"'>"+value["nombre"]+"<span class='eliminarModulo pull-right'>&nbsp;<i class='fa fa-trash' onclick='gestion_eliminarModulo(this);' aria-hidden='true'></i></span></span>";         
                    $(".rowsModulos").append(span); 
                });
               
            }else{
                
            }
        }
    });
}

function gestion_rellenarCategorias(){
     $.ajax({
        url:"json/getCategorias.php",
        method:"POST",
        success: function(result){
            if(result!="sin resultados"){
                var n=JSON.parse(result);
                $.each(n,function(key,value){
                   console.log(value);
                    var clase="";
                    var target="";
                    if(value["raiz"]==null || value["raiz"]=="null"){ 
                        target=".rowsCategorias";
                        clase="superSpan";
                    }else{
                        target="#"+value["raiz"];
                        clase="subSpan";
                    }
                    var span="<span class='rowContent "+clase+"' id="+value["ident"]+" data-raiz='"+value["raiz"]+"'>"+value["nombre"]+"<span class='eliminarCategoria pull-right'>&nbsp;<i class='fa fa-trash' onclick='gestion_eliminarCategoria(this);' aria-hidden='true'></i></span><span class='vaciarCategoria pull-right'>&nbsp;<i class='fa fa-times-circle' onclick='gestion_vaciarCategoria(this);' aria-hidden='true'></i></span><span class='editarCategoria pull-left'>&nbsp;<i class='fa fa-pencil-square-o' onclick='gestion_editarCategoria(this);' aria-hidden='true'></i></span></span></span>";
                    
                    $(target).append(span);
                });
               
            }else{
                
            }
        }
    });
}

function gestion_rellenarProveedores(){
     $.ajax({
        url:"json/getProveedores.php",
        method:"POST",
        success: function(result){
            if(result!="sin resultados"){
                var n=JSON.parse(result);
                $.each(n,function(key,value){
                   
                    var clase="";
                    var target="";
                    var span="";
                    console.log($("#proveedor-"+value["ident_proveedor"]).length);
                   if($("#proveedor-"+value["ident_proveedor"]).length<=0){ 
                        target=".rowsProveedoresArticulos";
                        clase="superSpan";
                        var span="<span class='rowContent superSpan' id='proveedor-"+value["ident_proveedor"]+"' data-email='"+value["email"]+"' data-telefono='"+value["telefono"]+"'>"+value["nombre"]+"<span class='eliminarCategoria pull-right'>&nbsp;<i class='fa fa-trash' onclick='gestion_eliminarCategoria(this);' aria-hidden='true'></i></span><span class='vaciarCategoria pull-right'>&nbsp;<i class='fa fa-times-circle' onclick='gestion_vaciarCategoria(this);' aria-hidden='true'></i></span><span class='editarCategoria pull-left'>&nbsp;<i class='fa fa-pencil-square-o' onclick='gestion_editarCategoria(this);' aria-hidden='true'></i></span></span></span>";
                       $(target).append(span);
                    }else{
                       
                        target="#proveedor-"+value["ident_proveedor"];
                        clase="subSpan";
                        var span="<span class='rowContent subSpan' id='"+value["ident_articulo"]+">"+value["articulo"]+"</span>";
                        $(target).append(span);
                    }

                });
               
            }else{
                
            }
        }
    });
}


function gestion_rellenarArticulos(){
     $.ajax({
        url:"json/getArticulos.php",
        method:"POST",
        success: function(result){
            if(result!="sin resultados"){
                var n=JSON.parse(result);
                $.each(n,function(key,value){
                  
                    var span="<span class='rowContent' id="+value["ident"]+" data-precio='"+value["precio"]+"' data-descripcion='"+value["descripcion"]+"' data-categoria='"+value["categoria"]+"' data-url_Img='"+value["url_Img"]+"' data-url_Img_Display='"+value["url_Img_Display"]+"' data-url_video='"+value["url_video"]+"' data-veces_visitado='"+value["veces_visitado"]+"' data-veces_vendido='"+value["veces_vendido"]+"'     >"+value["nombre"]+"<span class='eliminarArticulo pull-right'>&nbsp;<i class='fa fa-trash' onclick='gestion_eliminarArticulo(this);' aria-hidden='true'></i></span><span class='editarArticulo pull-left'>&nbsp;<i class='fa fa-pencil-square-o' onclick='gestion_editarArticulo(this);' aria-hidden='true'></i></span></span></span>";

                    $(".rowsArticulos").append(span);
                });
               
            }else{
                
            }
        }
    });
}