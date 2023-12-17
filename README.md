# Microservice for navigation data simulator

Ce microservice permet de calculer et transmettre via websocket des informations de position entre deux coordonées GPS.

### Données de sortie

Le serveur 

```
Obj {
  "date": string,
  "mobiles":[{
    "position":[number, number],
    "name":"mobile name"
  }]
}
```

Pour lancer l'envoi des positions via websocket, soumettre la requête: http://localhost:3000/api/socket?status=1
Pour stopper l'envoi des positions via websocket, soumettre la requête: http://localhost:3000/api/socket?status=0

### Deployer

docker build --tag navigation-data-simulator-microservice .
docker run -dp 127.0.0.1:3000:3000 navigation-data-simulator-microservice:latest

## TESTS



### Améliorations
- Améliorer le système de calcul de distance en tenant compte de la courbure de la terre
- Utiliser un system de lecture de fichier en streming pour des fichiers de plus gros volume
- Ajouter un system de verification d'ointégrite du fichier d'input