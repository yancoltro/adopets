# Adpoets Api

Este projeto encontra-se em  deploy no Heroku [aqui](https://yan-test-adopets-api.herokuapp.com/)

Este projeto foi desenvolvido em [Node](https://nodejs.dev/), utilizando o framework [AdonisJs](https://adonisjs.com/).

Caso queira realizar a implantação em sua estação, você necessita seguir o passo-a-passo abaixo:

Requisitos
```
NodeJS: v12.18.0
SQlite 2.8.17
```
##Os seguintes comandos deste arquivo foram testandos e executados em servidor Linux
```
$ sudo apt install nodejs
```
```
$ sudo apt install sqlite
```

Faça o clone do repositório
```
$ git clone https://github.com/yancoltro/adopets.git
```

Você irá baixar tanto a aplicação backend como a frontend
Navegue até a pasta da aplicação backend 
```
$ cd adopets/adopets-api
```
**_Este guia está sendo executado com SQlite, consulte a documentação do [Adonis](https://adonisjs.com/docs/4.0/database) para verificar como executá-lo com outro banco_**
Siga os passos: 

1. Instale todas as dependencias do node
```
S npm install
```

2. Renomeie o arquivo .env.example para .env 
```
$ mv .env.example .env
```

3. Execute os testes e vefique se o aplicativo está OK 
```
$ adonis test
```

4. Gere uma chave única para seu aplicativo 
```
$ adonis key:generate
```

5. Se os testes passaram, você está pronto para executar o aplicativo 
```
$adonis serve
```

6. Teste sua instancia local [aqui](http://localhost:3333)

Consulte todas as possibilidades didigtando _adonis_ em seu terminal
```
$ adonis
```

As rotas disponives são estas, podendo ser testadas em seu cliente de preferência

![Captura de tela de 2020-07-04 23-48-03](https://user-images.githubusercontent.com/31298655/86524432-11e3ed80-be51-11ea-8b00-e3137a5a4c93.png)
