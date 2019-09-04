!/bin/bash

LOCAL="Downloads/San\ Francisco\ Font/"
cd Downloads/San\ Francisco\ Font/
DIR="~/.fonts"
LOCAL2="Downloads/San\ Francisco\ Font/*.ttf"
if [ -d "$DIR" ]; then
# Se o diretorio nao existe, eu crio e movo
	mkdir $DIR
	mv $LOCAL2 $DIR
else
# Se o diretorio existe, entao eu so movo
	mv *.ttf ~/.fonts
	echo "Movendo todas as fontes .ttf para ${DIR}"
fi

