$(document).ready(function () {
    paginaAtual();
    $(".alerta-delete").hide();
    $(".alerta-insert").delay(2000).slideUp(2000);
    $('#identificador').mask('Z',{translation: {'Z': {pattern: /[a-zA-Z ]/, recursive: true}}});
});

/**
 * função verificar em qual página estamos e mostrar na navbar
 */
function paginaAtual() {
    var urlAtual = $(location);
    $("ul.navbar-nav li.nav-item").each(function () {
        let $this = $(this);
        if ($this.hasClass("active")) {
            $this.removeClass("active");
        }
    });
    if (urlAtual.attr("href").includes("insertId")) {
        $(".cadastro").addClass("active");
    };
    if (urlAtual.attr("pathname") == "/") {
        $(".pesquisa").addClass("active");
    };
}

/**
 * Aguarda um evento do mouse e deleta um identificador usando AJAX
 */
$(".btn-delete").click(function () {
    let identificador = $(this).parent().parent();
    let botao = $(this)[0]
    if ($(this)[0].childElementCount == 1)
        $(this).append("  <span class='spinner-border spinner-border-sm'></span>");
    if (confirm("Deseja realmente deletar o Identificador: " + identificador[0].innerText)) {
        $.ajax({
            url: '/ajax/deleteId/',
            type: "GET",
            data: {
                'id_identificador': parseInt(identificador[0].children[0].innerText),
                'identificador': $.trim(identificador[0].innerText),
            },
            dataType: 'json',
            success: function (result) {
                if(result.resultado==true){
                    identificador.remove();
                    $("#mensagem").remove();
                    $(".alerta-delete").removeClass("alert-danger")
                    $(".alerta-delete").addClass("alert-success");
                    $(".alerta-delete").append("<strong id='mensagem'>Identificador deletado com sucesso</strong>");
                }else{
                    botao.children[1].remove();
                    $("#mensagem").remove();
                    $(".alerta-delete").removeClass("alert-success");
                    $(".alerta-delete").addClass("alert-danger");
                    $(".alerta-delete").append("<strong id='mensagem'>Ocorreu um erro na operação</strong>");
                }
            },
            error: function (xhr) {
                botao.children[1].remove();
            },
        });
        $(".alerta-delete").slideDown(300).delay(2000).slideUp(1000);
    }else{
        botao.children[1].remove();
    }
});