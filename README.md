# Vitals Device Tracker for SFT

Ce serveur local permet d'accéder aux informations machines necessaires à l'execution de SFT et de les envoyer via websocket

### Paramètres d'entrée

```PORT```

### Données de sortie

```
Batterie : {
  hasBattery: [boolean] - Le serveur est-il connecté au réseau éléctrique ou fonctionne t-il sur batterie
  percent: [number] - Pourcentage de batterie si ```hasBattery``` est à [true]
  isCharging: [boolean] - Si l'appareil est en cours de chargement
}

Connection : {
  interface: [string] - Revoie le nom de l'interface utilisé par défaut. Renvoie les valeurs ['Wi-Fi','ethX','wlanX']
  connectionRate: [number] - Renvoie le niveau de connection au réseau Wifi si l'interface est [Wi-Fi]
}
```

### Deploy

docker build --tag vitals-device-tracker .
docker run -dp 127.0.0.1:3000:3000 vitals-device-tracker:latest

## TESTS

A tester : Récupérationa avec plusieurs réseaxu wifi connectés
Récupération réseau avec une puce 4g (Emulateur de 4G)

## Spéficiations à clarifier
Comment réagir sur l'interface en cas d'appareil sans batterie (Icone prise electrique ? Rien ?)
Comment réagir sur l'interface en cas d'appareil en cours de chargement ?
Qu'afficher en cas de connection Ethernet, en cas de connection WiFi, en cas de connexion 4G

Quels sont les données de réseaux à récupérer ?

Fournir une fonction utils pour convertir les degres decimaux en degres 


____________________

Améliorer le système de calcul de distance en tenant compte de la courbure de la terre
Utiliser un system de lecture de fichier en streming pour des fichiers de plus gros volume
Ajouter un system de verification d'ointégrite du fichier d'input