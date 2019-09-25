# Tem que rodar como . ./ess.sh

mkdir ESS
cd ESS
npm install @angular/cli
caminho="$(pwd)/node_modules/@angular/cli/bin"
PATH=$PATH:$(caminho)

git clone https://github.com/pauloborba/teachingassistant
cd teachingassistant/

git checkout -b SaaS1 e670da4c7dda011225d4a6942149cfdcde6e8667
git reset --hard e670da4c7dda011225d4a6942149cfdcde6e8667

# Tenho que ajustar o PATH (olhar parte comentada)

ng new BibPET-gui
cd BibPET-gui
npm start


##################################################
#caminho="${PWD}/node_modules/@angular/cli/bin"

##PATH=$PATH:$caminho
##echo "Path atualizado:$PATH"
#tempPATH=$PATH:$caminho
#echo $tempPATH
#PATH=""
##echo $"export PATH=$PATH:$tempPATH" >> ~/.bashrc
#source ~/.bashrc
