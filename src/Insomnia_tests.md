# Testes no Insomnia

Porta: http://localhost/3000.

![](../static/img.png)

#### Teste 1

| Ordem | Método HTTP | Rota       | Tipo de corpo | Conteúdo do corpo                                                                                                                 | Código de resposta | Status BD                                                                                     |
|-------|-------------|------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------|-----------------------------------------------------------------------------------------------|
| 1     | GET         | `/login`   | -             | -                                                                                                                                 | 200                | -                                                                                             |
| 2     | POST        | `/login`   | JSON          | { <br> "username": "username1", <br> "password": 12345678 <br> }                                                                  | 404                | OK                                                                                            |
| 3     | POST        | `/signin`  | JSON          | { <br> "username": "username1", <br> "password": 12345678 <br> }                                                                  | 200                | OK                                                                                            |
| 4     | DELETE      | `/account` | JSON          | { <br> "username": "username1", <br> "password": 12345678 <br> }                                                                  | 401                | Erro - TypeError                                                                              |
| 5     | PUT         | `/account` | JSON          | { <br> "username": "username1", <br> "password": 12345678, <br> "newUsername": "username2", <br> "newPassword": "abcdefgh" <br> } | 200                | Erro - MongoInvalidArgumentError: <br> Replacement document must not contain atomic operators |
| 6     |             |            |               |                                                                                                                                   |                    |                                                                                               |
| 7     |             |            |               |                                                                                                                                   |                    |                                                                                               |
| 8     |             |            |               |                                                                                                                                   |                    |                                                                                               |
| 9     |             |            |               |                                                                                                                                   |                    |                                                                                               |
