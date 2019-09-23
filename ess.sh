mkdir ESS
cd ESS
npm install @angular/cli
caminho="$(pwd)/node_modules/@angular/cli/bin"
PATH=$PATH:$(caminho)

git clone https://github.com/pauloborba/teachingassistant
cd teachingassistant/

git checkout -b SaaS1 e670da4c7dda011225d4a6942149cfdcde6e8667
git reset --hard e670da4c7dda011225d4a6942149cfdcde6e8667
