# TFMD

Sistema Front-end utilizando o Nextjs, React-Native com Expo para o Mobile, e Back-end utilizando Nodejs Express, Prisma e um Banco de dados em SQLite --
Ambos os sistemas são necessários instalar as dependências com os comandos *npm install* ou *yarn*

- Configurações do Font-end:

O front não necessita de configurações adicionais, apenas executar os comandos após a instalação das dependências.

*npm run dev* :  Inicia o sistema sem precisar compilar o sistema (Modo de desenvolvedor) --
*npm run build* :  Compila o sistema --
*npm run start* :  Inicio o sistema compilado --

- Configurações do Back:

Após instalar as dependências é preciso rodar o comando *npm run prisma*  --
Isso é preciso para criar a tipagem do banco de dados para o sistema --
Após esse processo é possível executar os seguintes comandos --

*npm run dev* :  Inicia o sistema sem precisar compilar o sistema (Modo de desenvolvedor) --
*npm run build* :  Compila o sistema --
*npm run start* :  Inicio o sistema compilado --

- Configuração do Mobile: 

Antes de iniciar o sistema, insira o IP local no objeto *BASE_URL* no arquivo "app.config.js",
isso permitirá que o app no celular acesse a api.
Ao iniciar o projeto a com o *npm run start*, aparecerá uma QR Code que pode ser lído com o app Expo Go

*npm run start* : inicia o projeto de forma padrão,
*npm run android* : inicia o projeto em um emaulador de android no computado ou um android conectado por USB,