"""
Imports
"""
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.http import HttpResponseRedirect
from django.contrib import messages
from IFPRAcessoMain.models import Identificador



@login_required
def pesquisa(request):
    """
    Tela pesquisa
    """
    return render(request, "IFPRAcessoMain/pesquisa.html")

@login_required
def insertId(request):
    """
    Tela inserir Identificador
    """
    if request.method == 'POST':
        id=Identificador(nome_id=request.POST.get('identificador'))
        id.nome_id=id.nome_id.upper()
        if not id.nome_id or id.nome_id == None:
            messages.error(request, 'Não foi digitado nenhum Identificador')
        else:
            try:
                id.save()
                messages.success(request, 'Cadastro inserido com sucesso')
            except Exception as e:
                messages.error(request, 'Ocorreu um problema no cadastro do Identificador')
        return HttpResponseRedirect("/insertId/")
    else:
        todos_id = Identificador.objects.all().order_by('nome_id')
        return render(request, "IFPRAcessoMain/insertId.html", {'todos_id':todos_id})

@login_required
def deleteId(request):
    """
    Função Ajax que deleta um identificador do banco
    """
    id_identificador = request.GET.get('id_identificador', None)
    identificador = request.GET.get('identificador', None)
    temp_id = Identificador.objects.filter(id=id_identificador, nome_id=identificador)
    resultado = False
    if temp_id:
        try:
            temp_id.delete()
            resultado = True
        except Exception as e:
            resultado = False
    else:
        resultado = False
    data = {
        'resultado': resultado
    }
    return JsonResponse(data)
