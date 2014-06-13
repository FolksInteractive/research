#Projet mobile – Recherche et développement

##Problématique

* Utiliser Meteor dans un context mobile avec Cordova/Phonegap.

##Contraintes et considérations

* L'application doit être native.
* Elle doit être codée en JavaScript/HTML/CSS.
* L'application doit être codée sous Meteor et envoyé aux packages/frameworks pour générer l'exécutable. Une application Meteor opérant sur un ordinateur doit manipuler le même contenu (MongoDB) mais avoir une interface plus détaillée.
* Phonegap/Cordova implique l'utilisation de Node.js (Npm) ainsi que des SDK des différentes plateformes mobiles.
* Il semblerait qu'à moyen terme une solution combinant famo.us et phonegap soit mise en place par la communauté. Il n'y a pas encore de solution stable/optimale pour les application mobiles avec Meteor. Percolate Studio et le rassemblement SpaceCapsule mettent ou vont mettre en place des packages visant à accomplir le tout.

##Phase 1 - Ressources permettant d'utiliser Meteor avec Cordova/Phonegap

* Sources : 
 * Phonegap : http://phonegap.com/
 * Cordova : http://cordova.apache.org/
 * https://www.discovermeteor.com/blog/blonk-building-tinder-for-jobs-with-meteor-for-mobile/
 * http://zeroasterisk.com/2013/08/22/meteor-phonegapcordova-roundup-fall-2013/
 * MeteorRider : https://github.com/SpaceCapsule/MeteorRider
  * Boiler-plate : https://github.com/AdamBrodzinski/meteor-cordova-shell
 * Packmeteor : https://github.com/SpaceCapsule/packmeteor
 * Cordova-phonegap : https://github.com/awatson1978/cordova-phonegap
 * Google group des développeurs des packages : https://groups.google.com/forum/#!topic/meteor-talk/vv6Rq8iGM0M
 * Dev talk de Percolate Studio : https://www.youtube.com/watch?v=eeY1mZhvDy4
 
###MeteorRider 
* Documentation :

   Permet de lier une application meteor déployé localement ou non à une application Phonegap via un URL. Ce package envoie le contenu de l'application web à l'application mobile.

* Hypothèses :

   Cette méthode semble simple. Une limitation pouvant être rencontrée semble être au niveau des mises à jour de l'application mobile. Il faut vérifier s'il faut générer un exécutable pour chaque version de l'application Meteor.

* Tests :
 * Liaison à l'application du Centch (c120.meteor.com)
 * Liaison à l'application créé pour packmeteor (tc-pack.meteor.com) sous le boiler-plate spécifié en source.

* Résultats :
 * L'application a été liée avec succès et simplicité. Comme le design de l'application n'est pas totalement responsive l'interface usager n'est pas utilisable facilement. Le côté réactif de Meteor est préservé, en ajoutant des éléments à MongoDB, ils apparaissent simultanément à l'ordinateur et sur l'application mobile. Elle fonctionne aussi bien sous émulateur que téléphone. Un aspect intéressant est le fait que lorsqu'une nouvelle version de l'application Meteor est déployée, l'application mobile se met à jour. 

* Considérations :
 * Utiliser cette méthode avec un design resposive (HTML5, CSS3 et Bootstrap) ou encore une solution proposée par la Phase 2 du projet.
 * Explorer l'utilisation de données hors-ligne et du package appcach pour utiliser l'application sans connexion internet.
 * Cette approche peux être interessante puisque le contenu provient à tout coup du serveur.

###Packmeteor
* Documentation : 

   Package l'application Meteor active sous http://localhost:3000 via le CLI de Cordova (create, build, etc.
   
* Hypothèses : 

   Comme le processus est bien détaillé ce package devrait être utilisable facilement via cordova. Il devrait aussi permettre de faire une applicaiton mobile indépendante d'une application web, il faudra ainsi trouver un moyen pour les connecter à la même base de données. Selon les groupes de discutions, il supporterais l'utilisation de famono/Famo.us.

* Tests :
 * Suivre la procédure de base décrite par la documentation du package. 
 * En suivant les recommandations trouvées sur https://github.com/josmas/UCapp/blob/master/Readme.md

* Résultats :
 * La mise en place du projet s'avère plus difficile que prévue. En suivant les instructions des problèmes sont tout de même obtenus quant à la structure du projet et la syntaxe. Il n'est pas possible d'exécuter l'application à cause de require et de modules liés à Npm. 
 * Les problèmes rencontrés à l'étape précédante étaient dûs au fait que l'app phonegap se retrouvaient dans l'app Meteor. Il fallait donc les séparer.
 * L'application fonctionne avec l'applicaion de test fournit par cordova (téléchargeable sous AppStore ou PlayStore).
 * Il a été possible de créer un exécutable de l'application lié à une application Meteor déployée. Le tout est réactif.

* Considérations :
 * Cette méthode fonctionne mais certains problèmes sont actuellement présent au niveau du package.
 * Il faut faire attention à refaire un package de l'application mobile lorsqu'une nouvelle version de l'application web est déployée.
 * Il faut explorer les possibilités d'envoyer du contenu différent selon le type de média (mobile, desktop, etc.) et non modifier le css. La réactivité n'est pas suffisante dans un context ou l'application mobile désiré étends l'interractivité de l'utilisateur.
 * Cette méthode implique d'utiliser à la fois Meteor, Cordova, Packmeteor sous Npm et Packmeteor en tant que package Meteor, ce qui complexifie le bundling de l'application mobile.

###Conclusion 

   L'approche choisie pour la Phase 1 est d'utiliser le boiler-plate fournit qui utilise MeteorRider. Cette façon de faire est très simple est propose un système de mise à jour centralisé via Meteor. Elle permet d'utiliser Meteor et Cordova de façon indépendante, sans applications/package agissant comme interface.

##Phase 2 - Gestion du média dans l'application Meteor (Routage, Templates et Collections)

* Sources : 
 *Package meteor : https://github.com/Mystor/meteor-device-detection
 *Groupe de discution avec la communauté : https://groups.google.com/forum/#!topic/meteor-talk/QuXYPwSjli0


###Gestion des templates et du routage
* Hypothèses :
   En utilisant un package qui permet de détecter le type de media, le contenu envoyé à l'utilisateur peut-être adapté directement dans le code JavaScript. Cette méthode permettrait de créer différent templates selon le type de média et de gérer le router à utiliser.
* Tests : 
 * Création de templates différents selon le type de media utilisé.

* Résultats :
  
  Cette approche fonctionne mais implique d'envoyer tout le contenu de l'application. Ainsi, côté mobile, l'application est surchargée par le contenu de l'application régulière.

* Considérations :
 * Il faudrait trouver un moyen d'empêcher l'envoie du contenu approprié à l'application. Cette mesure s'avère être une solution complexe qui n'est pas la responsabilité du front-end, mais bien du framework.

###Design responsive (CSS)
* Hypothèses :
   En utilisant CSS et Bootstrap le contenu peut être géré avec des classes. Il peut être facile de modifier le contenu de cette façon, mais elle ne permet pas la gestion des Collections (publish/subscribe).
* Tests : 
 * Détection du format avec CSS et Bootstrap permettant de changer le style de l'application et de cacher/montrer du contenu.
* Résultats : 

  Cette approche fonctionne mais implique d'envoyer tout le contenu de l'application. Ainsi, côté mobile, l'application est surchargée par le contenu de l'application régulière.

* Considérations :
 * Cette approche n'est pas suffisante dans un context de performance.

###Applications Meteor dédiées connectées à l'aide de DDP.connect()
* Hypothèses :

  Cette méthode permettrait d'abstraire/séparer les portions de code relatives à chaque média. Elle permettrait donc le développement en simultané de deux applications utilisant la même base de données et de le faire sans avoir à gérer le type de média. Chaque application peut utiliser une technologie/approche différente pour le front-end (Famo.us?). 

* Tests : 
 * Création d'une application mobile avec Meteor déployée sous tc-packmobile.meteor.com 

* Résultats : 

  Les deux applications ont pu être connectées via la base de données. Il a été possible d'insérer des éléments à une collections via les deux applications. Le tout était réactif.

* Considérations :
 * Bien adapter l'approche une fois que les packages insecure et autopublish seront enlevés.
 * S'assurer de respecter les règles d'affaires établie sous l'application web.

###Conclusion

  La dernière approche sera celle utilisée dans un contexte mobile. Elle respecte la segmentation de code et le respect des responsabilités, il n'y aura pas de gestion de média à faire dans le front-end. Aussi, elle permet de développer en simultané les deux applications sans interférence.

##Phase 3 - Réactivité des application mobiles Meteor utilisant Famo.us

* Description : 

* Hypothèses / Situation initiale :

* Tests : 

* Résultats : 
 
##Glossaire

* **Native** :

   Une application dite native est développée dans un context mobile pour une plateform spécifique. Une application web se distingue par le fait de s'exécuter dans un navigateur tel que Chrome ou Firefox.
