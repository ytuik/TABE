# Script em python para adicionar
# uma resolucao personalizada ao menu
# de resolucoes de distros Linux

import os
from subprocess import call

#--------------------
# Pegando a resolucao
#--------------------

print("Digite a largura, em pixels: ")
eixoX = input()
print("Digite a altura, em pixels: ")
eixoY = input()

#-----------------------------------
# Chamando o cvt e salvando o output
#-----------------------------------

parametros = ["cvt", eixoX, eixoY, "> output_adc_Resolucao.txt"]
separador = " "

# print(separador.join(parametros))

os.system(separador.join(parametros))

#-------------------------------------------
# Pegando o output que preciso para o XRandr
#-------------------------------------------

with open ("output_adc_Resolucao.txt") as arquivo:
	linha = arquivo.readline()
	contador = 1
	while (contador != 2):
		linha = arquivo.readline()
		contador = contador + 1

splittado = linha.split()

linha = linha[9:len(linha)]
# Removendo o "Modeline "
novoModo = "sudo xrandr --newmode"+linha
os.system(novoModo)

adcModo = "sudo xrandr --addmode (conector do XRandr) "+"splittado[1]
os.system(adcModo)

#---------------------------------------------------
# Continuar aqui para descobrir o conector do XRandr


