# Movies List

Projeto desenvolvido a partir de um desafio na [DIO](https://digitalinnovation.one/). Esta aplicação permite a adição, remoção e atualização de filmes em um banco de dados relacional. As pastas `back` e `front` referem-se respecttivamente ao Backend e Frontend do projeto.

## Configuração do Projeto

Querys SQL de criação da tabela usada no projeto: 

```
CREATE DATABASE moviesControll;
```

```
USE moviesControll;
```

```
CREATE TABLE IF NOT EXISTS `filmes` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  genero varchar(255),
  visto BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

Na pasta `back`, execute:

```
npm init
npm install express mysql cors --save
node server.js
```
Na pasta `front`, execute:

```
npm install
npm start
```

Abra [http://localhost:5001](http://localhost:5001).

## 🛠 Tecnologias
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" /><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />

## Author
Jorge Magno

### Contato:
[<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/jorge-magno-l-moraes-381a19174/) 
[<img src = "https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white">](https://www.instagram.com/jorgepierrot/?hl=pt-br) 
[<img src = "https://img.shields.io/badge/facebook-%231877F2.svg?&style=for-the-badge&logo=facebook&logoColor=white">](https://www.facebook.com/jorge.magno.7)