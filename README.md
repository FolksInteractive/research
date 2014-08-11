#Projet animation – Recherche et développement

##Problématique

* Amélioration de la navigation entre les différentes sections
* Changer l’aspect du logiciel traditionnel (Web-app) pour une sous-forme de système d’exploitation

##Contraintes et considérations

* Compatibilité avec Spacebar (Meteor)
* Utilisation des technologies HTML5, CSS3 et JavaScript
* Navigation par url afin d’accéder à une partie de l’application est-elle possible?
* Utiliser des filtres/couches dans l’interface pour faire apparaître du contenu et l’animer dans la page

##Librairies d’animation 
###CreateJS
* Ressources :
 * Site officiel : http://www.createjs.com/
 * Package Meteor : https://github.com/charlesjshort/createjs-meteor
 * Tutoriel : http://small-codes.com/?p=563&preview=true&lang=en 
* Documentation :

   CreateJS est une librairie JavaScript séparée en quatre modules : EaselJS, TweenJS, SoundJS, et PreloadJS. 
   
   EaseJS utilise WebGL pour fournir des API semblable à Flash et permet de créer un environnement interactif à
   l’aide des Canevas HTML5. 
   
   TweenJS fournit des outils permettant d’utiliser CSS pour faire de l’animation de type Tweening.
   
   SoundJS fournit des solutions aux problèmes relatifs aux fonctionnalités audio d’HTML5.
   PreloadJS permet de charger préalablement le contenu à animation qu’il s’agisse d’images, d’extraits audio ou
   autre.

* Hypothèses :

   Les différents modules de CreateJS semblent être axés sur l’animation plus que la navigation. 
   Ainsi, certaines fonctionnalités pourraient être utilisé à des fins utilitaires mais la librairie ne fournit pas
   les outils nécessaires au problème actuel. TweenJS semble permettre de manipuler des éléments du DOM, il 
   pourrait être intéressant de l’explorer. Comme il existe un package pour Meteor, CreateJS pourrait être utilisé à 
   travers les fichiers JavaScript du projet.

* Tests :

    Un tutoriel concenant la manipulation d'objets du DOM avec TweenJs a été suivi. Celui-ci peremettait d'animer un element form du code html et de l'animer vers à travers le Canvas.

* Résultats :

    En suivant le tutoriel en mode statique, il a été possible d'animer des éléments de l'interface. Il n'a toutefois pas été possible de faire fonctionner la librairie dans Meteor pour l'instant. Utiliser cette technologie implique de positionner chaque élément du DOM dans le Canvas de façon précise et d'en tenir compte lors des animations. Les positions des éléments ne dépendent pas du format du navigateur mais bien de la position qui leur est assignée. Les écouteurs d'événements représentent quelques lignes de plus. Il a toutefois été possible de combiner le tout avec jQuery pour animer en fonction d'événements.

* Recommandations :

    Bien que cette librairie puisse offrir des possibilité d'animation intéressante son intégration pose un changement important quant à la façon de positionner les éléments d'une application web.

###Famo.us
* Ressources :
 * Site officiel : https://famo.us/
 * Package Meteor : https://github.com/raix/Meteor-famono
 * http://differential.io/blog/report-from-the-famous-private-beta
 * http://www.infoworld.com/t/web-applications/fast-and-flashy-famous-javascript-framework-revealed-232046
 * http://blog.percolatestudio.com/engineering/the-future-of-javascript-animation-with-famous/
 * http://famous-tutorial.meteor.com/
 * https://www.youtube.com/watch?v=bmd-cXSGQAAç
 * https://www.youtube.com/watch?v=8OnIlN8DYsQ
 
* Documentation : 

   Comme les applications web sous HTML5 et JavaScript sont assez lentes, des librairies telles que Meteor ou Famo.us
   émergent afin de permettre aux développeurs de créer des applications temps réel. Famou.us remplace le moteur
   d’affichage des navigateurs par le sien et anime le contenu grâces aux fonctionnalités de CSS3. Famo.us fournit
   quatre moteurs : un pour le rendering, un autre pour les concepts physiques, un capteur d’évènements et  un dernier
   qui transforme ou envoie du contenu au DOM, à WebGL et même Canvas.

* Hypothèses :

   Famou.us manipule les éléments du DOM nommés surfaces. Ceux-ci sont en fait des balises div, il serait donc
   aisé de manipuler les templates de Meteor. Il est même possible d’intégrer directement un template de Meteor dans
   une surface. De plus, la communauté de Meteor semble emballée par le projet et plusieurs packages sont déjà
   disponibles. L’intégration devrait être relativement simple. Famo.us répondrait à la problématique énoncée
   puisqu’il offre les fonctionnalités mentionnées et s’inscrit dans la même perspective d’avancement technologique. Comme il s'agit d'une nouvelle technologie, la courbe d'apprentissage peut être plus importante que pour une librairie comme jQuery.

* Tests :
 * Conception d'une interface d'application web traditionnelle avec le format header-footer layout
 * Conception d'une interface alternative disposant dans des carrés flottant quatre vues qui s'aggrandissent lorsque sélectionnées
 * Conception d'une interface style desktop avec des éléments modulaires (fichiers ou vues)

* Résultats :
 * Il a été possible de créer plusieurs types d'interface avec Meteor.js et Famo.us. Toutefois, l'utilisation de cette librairie comporte un plus grand temps de conception de l'interface utilisateur et donc une plus grande complexité. Famo.us offre de développer le UI en orienté objet, 100% en JavaScript. Cette librairie offre le même genre d'expérience que Java avec Swing. Un problème rencontré se situe au niveau de la Reactivity de Meteor. En effet, les surfaces de Famo.us ne sont pas réactives puique le code est indépendant du système de UI inclus à Meteor. Ce problème est rencontré si les éléments de l'interface dépendent de variables réactives de Meteor ou d'éléments des collections MongoDB. Un façon de le contourner a été d'inclure ces portions de code dans des boucles Deps.autorun. Ainsi si les variables changeaint le code créant l'interface était exécuté à nouveau. Une autre façon d'avoir du contenu réactif était d'insérer les templates dans des balises div et de les inclure en contenu dans une surface Famo.us. Dans un Hangout Meetup, un employé de Percolate Studios a avancé le fait que le package Famono intégrais maintenant une façon plus simple de faire cette tâche, c'est à dire que les surfaces ont été étendues à l'aide d'un champ Template où l'on peut préciser quelle surface insérer. Le design de celui-ci repose dans ce cas sur le code CSS. Il a aussi mentionné une façon de générer du contenu réactivement, c'est à dire, d'utiliser les observeteurs sur les curseurs de collection (cursor.observe). Il est donc aisé d'ajouté du contenu en fonction des transactions avec la base de donnés. 

* Recommandations :
  
  Famo.us peut largement augmenter l'interactivité d'une application, les possibilités d'animation et la performance de celles-ci. Toutefois, cette librairie implique une courbe d'apprentissage plus importante que d'autre, orientées web, et aussi un plus grand effort de conception. Contrairement à la jonction avec html et css, il est difficile avec ce framework de bâtir en parallèle l'application et l'interface, d'y ajouter aisément des éléments ou d'en revoir rapidement le design. Son utilisation dépends donc du temps et du budget disponible. Il pourrait être intéressant de l'utiliser à basse complexité, pour la navigation entre la pages et bénificier des classes de layout.
  
###jQuery
* Ressources :
 * Site officiel: http://jquery.com/
 * UI package: http://jqueryui.com/
 * http://docs.meteor.com/
 * https://github.com/TimHeckel/meteor-jquery-ui/
 * Argument contre: http://frozeman.de/blog/2013/10/meteor-template-animation-helper/

* Documentation : 

    jQuery offre des outils permettant de manipuler les éléments du DOM, le code CSS ainsi que d'intégrer des animations.

* Hypothèses :

    La courbe d'apprentissage pour cette librairie est faible considérant qu'elle est déjà inclue à Meteor et qu'elle est l'une des plus utilisée en JavaScript. Plusieurs fonctions d'animations peuvent permettre de répondre à la problématique, il faut les utiliser de façon non-traditionnelle afin d'étendre les possibilités offertes. Celles ajoutées par jQueryUI peuvent être intéressantes. Toutefois, comme l'article en référence le mentionne, ces animations posent un problème de rafraichissement avec Meteor. La méthode de contournement décrite peut potentiellement règler le problème. Les problèmes de performances au niveau du navigateur peuvent toutefois subsiter.

* Tests :
 * Conception d'un player video avec Popcorn.js et les animations de jQuery
 * Conception d'un système de listes sortable en drag and drop avec jQuery-UI

* Résultats :
 * Il est possible d'utiliser facilement jQuery et ses librairies associées. jQuery est d'ailleurs intégré comme package de base avec Meteor. Elle est toutefois indiscociable de HTML et CSS, combinés. Ses fonctions se retrouvent alors un peu partout dans les helpers Meteor. Il est aisé de vouloir les inclure dans les rendered des templates, mais parfois celà engendre des problèmes ou une inconsistance au niveau des fonctionnalités. Il faut donc les inclures aux bons events listeners. Cela a toutefois pour effet d'allonger considérablement les algorithmes et le code. Concernant les problèmes de refarîchissement, ils ont été rencontrés au niveau des submit de formulaires. Il est possible de controurner ces comportements à l'aide de event.preventDefault() et de return false dans les event listeners. 

* Recommandations :
 * Bien que jQuery soit facile d'utilisation, il s'agit aussi d'un de ses défaut. Sa facilité d'implémentation peut pousser le développeur à étaler le code et mal le structurer, le rendant ainsi, illisible. En structurant mieux son code et utlisant des patrons de conception (Singleton), il est possible de séparer les fonctions jQuery utilisées selon le contenu qu'elles manipules. 

###GreenSock
* Ressources :
 * Site officiel: http://www.greensock.com/
 * Package Meteor: https://github.com/RoyalMist/meteor-gsap
 * Argument contre: http://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=5&ved=0CFsQFjAE&url=http%3A%2F%2Fwww.designerstalk.com%2Fforums%2Fgeneral-discussion%2F72397-greensock-js-animation.html&ei=BumEU9PyDdahyASGxoHgDQ&usg=AFQjCNGi1-Lzt8jrdA95KsiSZuRLP1X2nQ&sig2=ldKNgZHzuFx277XI-C3cdQ

* Documentation : 

    GreenSock permet d'animer du contenu sous HTML5 en JavaScript.

* Hypothèses :
    
    Cette librairie peut répondre à la problématique. Toutefois, il semble y avoir un problème de performance ce qui réduirait la perspective real-time. Il faut voir si la reactivity de Meteor persiste lors des animations.

* Tests :

* Résultats :

* Recommandations :

##Glossaire

* **Canvas** :

   Canvas est une balise HTML5 permettant d’afficher, dessiner ou animer des formes dans une région donnée à
   l’aide de JavaScript.

* **Tweening** :

   Génération d’images successives telles que dans les films d’animations. Celles-ci sont intégrées entre des images     existantes de façon à augmenter la fluidité des transitions. 

* **DOM** :

   Document Object Model. Un standard permettant de mettre à jour le contenu de programmes sous langage de balisage.     Ces mises à jour peuvent être actionnées suite à ses évènements générés par l’utilisateur.

* **WebGL** :

   Librairie permettant la programmation 3D sous navigateur web.
   
## À explorer

* https://atmospherejs.com/package/iron-transitioner
* http://bouncejs.com/
