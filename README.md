#Projet animation – Recherche et développement

##Problématique

*	Amélioration de la navigation entre les différentes sections
*	Changer l’aspect du logiciel traditionnel (Web-app) pour une sous-forme de système d’exploitation

##Contraintes et considérations

*	Compatibilité avec Spacebar (Meteor)
*	Utilisation des technologies HTML5, CSS3 et JavaScript
*	Navigation par url afin d’accéder à une partie de l’application est-elle possible
*	Utiliser des filtres/couches dans l’interface pour faire apparaître du contenu et l’animer dans la page

##Librairies d’animation 
###CreateJS
* Ressources :
 * Site officiel : http://www.createjs.com/
 * Package Meteor : https://github.com/charlesjshort/createjs-meteor
* Documentation : 
~~~
CreateJS est une librairie JavaScript séparée en quatre modules : EaselJS, TweenJS, SoundJS, et PreloadJS. 

EaseJS utilise **WebGL** pour fournir des API semblable à Flash et permet de créer un environnement interactif à l’aide des Canevas HTML5. 

TweenJS fournit des outils permettant d’utiliser CSS pour faire de l’animation de type **Tweening**.

SoundJS fournit des solutions aux problèmes relatifs aux fonctionnalités audio d’HTML5.

PreloadJS permet de charger préalablement le contenu à animation qu’il s’agisse d’images, d’extraits audio ou autre.

*	Hypothèses :
Les différents modules de CreateJS semblent être axés sur l’animation plus que la navigation. Ainsi, certaines fonctionnalités pourraient être utilisé à des fins utilitaires mais la librairie ne fournit pas les outils nécessaires au problème actuel. TweenJS semble permettre de manipuler des éléments du **DOM**, il pourrait être intéressant de l’explorer. Comme il existe un package pour Meteor, CreateJS pourrait être utilisé à travers les fichiers JavaScript du projet.

*	Tests :

*	Résultats :

*	Recommandations :

###Famo.us
*	Ressources :
 * Site officiel : https://famo.us/
 * Package Meteor : https://atmospherejs.com/package/famous-components
 * http://differential.io/blog/report-from-the-famous-private-beta
 * http://www.infoworld.com/t/web-applications/fast-and-flashy-famous-javascript-framework-revealed-232046
 * http://blog.percolatestudio.com/engineering/the-future-of-javascript-animation-with-famous/
 * http://famous-tutorial.meteor.com/
 * https://www.youtube.com/watch?v=bmd-cXSGQAA
*	Documentation : 

⋅⋅⋅ Comme les applications web sous HTML5 et JavaScript sont assez lentes, des librairies telles que Meteor ou Famo.us émergent afin de permettre aux développeurs de créer des applications temps réel. Famou.us remplace le moteur d’affichage des navigateurs par le sien et anime le contenu grâces aux fonctionnalités de CSS3. Famo.us fournit quatre moteurs : un pour le rendering, un autre pour les concepts physiques, un capteur d’évènements et  un dernier qui transforme ou envoie du contenu au **DOM**, à **WebGL** et même **Canvas**.

*	Hypothèses :

⋅⋅⋅  Famou.us manipule les éléments du **DOM** nommés surfaces. Ceux-ci sont en fait des balises div, il serait donc aisé de manipuler les templates de Meteor. Il est même possible d’intégrer directement un template de Meteor dans une surface. De plus, la communauté de Meteor semble emballée par le projet et plusieurs packages sont déjà disponibles. L’intégration devrait être relativement simple. Famo.us répondrait à la problématique énoncée puisqu’il offre les fonctionnalités mentionnées et s’inscrit dans la même perspective d’avancement technologique.

*	Tests :

*	Résultats :

*	Recommandations :

###jQuery
*	Ressources :

*	Hypothèses :

*	Tests :

*	Résultats :

*	Recommandations :

###GreenSock
*	Ressources :

*	Hypothèses :

*	Tests :

*	Résultats :

*	Recommandations :

##Glossaire

* **Canvas** : 
**Canvas** est une balise HTML5 permettant d’afficher, dessiner ou animer des formes dans une région donnée à l’aide de JavaScript.

* **Tweening** :
Génération d’images successives telles que dans les films d’animations. Celles-ci sont intégrées entre des images existantes de façon à augmenter la fluidité des transitions.

* **DOM** : 
Document Object Model. Un standard permettant de mettre à jour le contenu de programmes sous langage de balisage. Ces mises à jour peuvent être actionnées suite à ses évènements générés par l’utilisateur.

* **WebGL** :
Librairies permettant la programmation 3D sous navigateur web. 
