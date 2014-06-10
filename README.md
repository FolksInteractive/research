#Projet mobile – Recherche et développement

##Problématique

* Utiliser meteor dans un context mobile à l'aire de Phonegap/Cordova.

##Contraintes et considérations

* L'application doit être native.
* Elle doit être codée en JavaScript/HTML/CSS.
* L'application doit être codée sous Meteor et envoyé aux packages/frameworks pour générer l'exécutable. Une application Meteor opérant sur un ordinateur doit manipuler le même contenu (MongoDB) mais avoir une interface plus détaillée.
* Phonegap/Cordova implique l'utilisation de Node.js (Npm) ainsi que des SDK des différentes plateformes mobiles.

##Packages Meteorite pour utiliser Phonegap/Cordova

* Ressources : 
 * Phonegap : http://phonegap.com/
 * Cordova : http://cordova.apache.org/
 * https://www.discovermeteor.com/blog/blonk-building-tinder-for-jobs-with-meteor-for-mobile/
 * http://zeroasterisk.com/2013/08/22/meteor-phonegapcordova-roundup-fall-2013/
 * MeteorRider : https://github.com/SpaceCapsule/MeteorRider
 * Packmeteor : https://github.com/SpaceCapsule/packmeteor
 * Cordova-phonegap : https://github.com/awatson1978/cordova-phonegap
 * Google group des développeurs des packages : https://groups.google.com/forum/#!topic/meteor-talk/vv6Rq8iGM0M
 * Dev talk de Percolate Studio : https://www.youtube.com/watch?v=eeY1mZhvDy4
 
###MeteorRider 
* Documentation :

   Permet de lier une application meteor déployé localement ou non à une application Phonegap via un URL. Ce package envoie le contenu de l'application web à l'application mobile.

*	Hypothèses :

   Les différents modules de CreateJS semblent être axés sur l’animation plus que la navigation. 
   Ainsi, certaines fonctionnalités pourraient être utilisé à des fins utilitaires mais la librairie ne fournit pas
   les outils nécessaires au problème actuel. TweenJS semble permettre de manipuler des éléments du DOM, il 
   pourrait être intéressant de l’explorer. Comme il existe un package pour Meteor, CreateJS pourrait être utilisé à 
   travers les fichiers JavaScript du projet.

*	Tests :
 * Liaison de l'application du Centch (c120.meteor.com)

*	Résultats :
 * L'application a été liée avec succès et simplicité. Comme le design de l'application n'est pas totalement responsive l'interface usager n'est pas utilisable facilement. Le côté réactif de Meteor est préservé, en ajoutant des éléments à MongoDB, ils apparaissent simultanément à l'ordinateur et sur l'application mobile.

*	Recommandations :
 * Utiliser cette méthode avec un design resposive (HTML5, CSS3 et Bootstrap).
 * Explorer l'utilisation de données hors-ligne et du package appcach pour utiliser l'application sans connexion internet.

###Packmeteor
* Documentation : 

   Package l'application Meteor active sous http://localhost:3000 via le CLI de Cordova (create, build, etc.
   
* Hypothèses : 

   Comme le processus est bien détaillé ce package devrait être utilisable facilement via cordova. Il devrait aussi permettre de faire une applicaiton mobile indépendante d'une application web, il faudra ainsi trouver un moyen pour les connecter à la même base de données.

* Tests :
 * Suivre la procédure de base décrite par la documentation du package. 

* Résultats :
 * La mise en place du projet s'avère plus difficile que prévue. En suivant les instructions des problèmes sont tout de même obtenus quant à la structure du projet et la syntaxe. Il n'est pas possible d'exécuter l'application à cause de require et de modules liés à Npm. 

* Recommandations :

###Cordova-phonegap
* Documentation : 
* Hypothèses :
* Tests :
* Résultats
* Recommandations :
##Glossaire

* **Native** :

   Une application dite native est développée dans un context mobile pour une plateform spécifique. Une application web se distingue par le fait de s'exécuter dans un navigateur tel que Chrome ou Firefox.
