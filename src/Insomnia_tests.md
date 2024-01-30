## Testes no Insomnia

1. POST request (8080/login/:{id}):
   ```
     {
     "login": "email@provedor.com",
     "pass": "123"
     }
   ```
   ```
   API ativa na porta 8080.
   id: 21
   login: email@provedor.com
   pass: 123
   ```
2. GET response (8080/login):
   ```
    {
	     "login": "login_message"
    }
   ```