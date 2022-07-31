# zwt-api

## install and run

 ``` npm install ``` & ``` npm start ```


## APIs 

### GET 

[horarios](https://zwt-api.herokuapp.com/)  |    ```/``` -> health check

[horarios](https://zwt-api.herokuapp.com/horarios)  |    ```/horarios```  Listagem de Horários de Navios - Listagem Principal

[horarios](https://zwt-api.herokuapp.com/horarios/:duv)  |    ```/horarios/:duv``` Horário de Navio 

[horarios](https://zwt-api.herokuapp.com/ocorrencias)  |    ```/ocorrencias```  Listagem de Ocorrências 

[horarios](https://zwt-api.herokuapp.com/navios)  |    ```/navios```  Listagem de Navios

### POST 

[horarios](https://zwt-api.herokuapp.com/ocorrencias)  |   ```/ocorrencias``` Cadastro de ocorrências por Navio
```
  {
      "idOcorrencia": 1,
      "idDuv": 12011
  }
```


[horarios](https://zwt-api.herokuapp.com/pcs/status)  |   ```/pcs/status```  API para conexão entre portos 

```
  {
      "status": "ATRACADO PORTO",
      "idDuv": 12010
  }
```

Foi desenvolvido conexão via planilhas nas 'APIs' de PSP e Marine Traffic pois as APIs não estavam disponíveis para consulta 

 - Marine Traffic: Consulta limitada - Apenas Export;
 - PSP: Sem acesso as APIs - Planilha disponibilizada no e-mail;


