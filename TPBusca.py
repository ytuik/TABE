import os
from subprocess import call
print('Digite sua busca e depois -a para abrir o link (FFox) -p para printar o link: ')
busca = input()
parametro = ''

if(busca.endswith('p')):
	parametro = 'p'

busca = busca[0:len(busca) - 2]
busca = busca.replace(' ', '+')
cabeca = 'proxtpb.art/s/?q='
cauda = '&page=0&orderby=99'
output = cabeca+busca+cauda

if(parametro == 'p'):
	print(output)
elif(parametro == 'a'):
	## jeito errado: os.system('firefox output')
	## jeito certo:
	call(["firefox", output])
else:
	print('O programa não recebeu parâmetros, encerrando!')
	exit
