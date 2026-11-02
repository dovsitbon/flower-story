# Flower Story Boutique – contenu du site

Généré par `npm run contenu` à partir de `locales/*.json` et `data/products.json`. Pour modifier un texte, éditer ces fichiers (pas ce document).

Contact affiché : WhatsApp 050-894-4771 · Instagram @flowerstory_boutique

## Informations à demander à Shir

1. Prix réels de chaque création, des options (taille, nombre de roses…) et des suppléments → `data/products.json`, puis passer `pricesConfirmed` à `true`.
2. Adresse du studio (retrait) et horaires d'ouverture précis → `data/site.json` (`address`, `hours`).
3. Zones de livraison réelles et frais par zone → `data/products.json` › `delivery.zones`.
4. Délai minimum de commande (24 h par défaut), créneaux de livraison, livraison le jour même ou non.
5. Jours fériés bloqués (veilles de fête comprises ?) → `delivery.blockedDates` (liste 2027 à vérifier).
6. Solution de paiement en ligne choisie : Cardcom, Tranzila, Grow (Meshulam) ou Stripe, avec ses clés.
7. Numéro d'entreprise (ח.פ / עוסק מורשה) et mentions légales, conditions de vente et de remboursement.
8. E-mail de Shir pour les notifications de commande + compte Resend (domaine d'envoi vérifié).
9. Vrais avis clients (avec accord) → `data/reviews.json` (la section reste masquée tant qu'elle est vide).
10. Logo officiel en vectoriel : le portrait montre un logo au mur du studio (« Flower Story Boutique · Premium Flowers »). Le logo typographique actuel (`public/logo.svg`, `public/logo-he.svg`) est provisoire.
11. Stock réel des éditions limitées (`stock` dans `products.json`, mis à jour à la main).
12. Photos manquantes : gâteaux en fleurs (עוגת פרחים), coffrets naissance (une seule photo), événements et ateliers (aucune), desserts en gros plan.
13. Nom de domaine souhaité (ex. flowerstory.co.il) pour remplacer l'adresse Vercel.
14. Validation des textes en hébreu par Shir (ton, formulations) et accord sur l'usage de son portrait.

## Textes du site (4 langues)

### meta

**meta.homeTitle**

- HE : משלוח פרחים בראשון לציון | פלאוור סטורי בוטיק
- EN : Flower Story Boutique | Premium flower delivery in Rishon LeZion, Israel
- FR : Flower Story Boutique | Livraison de fleurs premium à Rishon LeZion, Israël
- ES : Flower Story Boutique | Envío de flores premium en Rishon LeZion, Israel

**meta.homeDescription**

- HE : פלאוור סטורי – בוטיק פרחים פרימיום בראשון לציון: זרי ורדים, זרי בלונים, מארזי קינוחים ולבבות פרחים בהתאמה אישית, עם משלוח עד הבית. הזמנה בוואטסאפ.
- EN : Flower Story is a premium flower boutique in Rishon LeZion: rose bouquets, balloon bouquets, dessert hearts and flower arrangements made to order and delivered across Israel. Order on WhatsApp.
- FR : Flower Story, boutique florale premium à Rishon LeZion : bouquets de roses, bouquets ballons, cœurs de desserts et compositions sur mesure, livrés en Israël. Commande sur WhatsApp.
- ES : Flower Story es una floristería premium en Rishon LeZion: ramos de rosas, ramos con globos, corazones de postres y arreglos florales a medida, con envío en Israel. Pedidos por WhatsApp.

**meta.shopTitle**

- HE : החנות | זרים, בלונים ומארזים – פלאוור סטורי
- EN : Shop | Bouquets, balloons & gift boxes – Flower Story
- FR : Boutique | Bouquets, ballons et coffrets – Flower Story
- ES : Tienda | Ramos, globos y cajas regalo – Flower Story

**meta.shopDescription**

- HE : כל הזרים, זרי הבלונים, המארזים והקינוחים של פלאוור סטורי בוטיק. בחירת גודל, צבע והקדשה אישית, משלוח בראשון לציון והסביבה.
- EN : All Flower Story bouquets, balloon bouquets, gift boxes and desserts. Choose size, colours and a personal message, delivered in Rishon LeZion and central Israel.
- FR : Tous les bouquets, bouquets ballons, coffrets et desserts de Flower Story. Choisissez la taille, les couleurs et un mot personnel, livraison à Rishon LeZion et dans le centre d’Israël.
- ES : Todos los ramos, ramos con globos, cajas regalo y postres de Flower Story. Elige tamaño, colores y una dedicatoria, con envío en Rishon LeZion y el centro de Israel.

**meta.checkoutTitle**

- HE : סיום הזמנה – פלאוור סטורי
- EN : Checkout – Flower Story
- FR : Finaliser la commande – Flower Story
- ES : Finalizar pedido – Flower Story

**meta.productSuffix**

- HE : פלאוור סטורי בוטיק
- EN : Flower Story Boutique
- FR : Flower Story Boutique
- ES : Flower Story Boutique

### nav

**nav.shop**

- HE : חנות
- EN : Shop
- FR : Boutique
- ES : Tienda

**nav.collections**

- HE : קולקציות
- EN : Collections
- FR : Collections
- ES : Colecciones

**nav.events**

- HE : אירועים וסדנאות
- EN : Events & workshops
- FR : Événements et ateliers
- ES : Eventos y talleres

**nav.story**

- HE : הסיפור שלנו
- EN : Our story
- FR : Notre histoire
- ES : Nuestra historia

**nav.contact**

- HE : צור קשר
- EN : Contact
- FR : Contact
- ES : Contacto

**nav.eventsShort**

- HE : אירועים
- EN : Events
- FR : Événements
- ES : Eventos

**nav.storyShort**

- HE : הסיפור
- EN : Story
- FR : Histoire
- ES : Historia

**nav.cart**

- HE : סל
- EN : Bag
- FR : Panier
- ES : Cesta

**nav.menu**

- HE : תפריט
- EN : Menu
- FR : Menu
- ES : Menú

**nav.close**

- HE : סגירה
- EN : Close
- FR : Fermer
- ES : Cerrar

**nav.skip**

- HE : דלג לתוכן
- EN : Skip to content
- FR : Aller au contenu
- ES : Ir al contenido

**nav.home**

- HE : דף הבית
- EN : Home
- FR : Accueil
- ES : Inicio

**nav.language**

- HE : שפה
- EN : Language
- FR : Langue
- ES : Idioma

### intro

**intro.skip**

- HE : דלג / Skip
- EN : Skip
- FR : Passer
- ES : Saltar

### banner

**banner.default**

- HE : משלוחי פרחים בראשון לציון והסביבה · ימים א׳–ו׳
- EN : Send flowers to the people you love in Israel · Sunday to Friday
- FR : Envoyez des fleurs à vos proches en Israël · du dimanche au vendredi
- ES : Envía flores a tus seres queridos en Israel · de domingo a viernes

**banner.cta**

- HE : לקולקציה
- EN : See the collection
- FR : Voir la collection
- ES : Ver la colección

**banner.collections.valentine.name**

- HE : קולקציית ולנטיין
- EN : Valentine’s collection
- FR : Collection Saint-Valentin
- ES : Colección San Valentín

**banner.collections.valentine.line**

- HE : ורדים אדומים, בלוני נשיקה ומארזי לב – בכמות מוגבלת
- EN : Red roses, kiss balloons and heart boxes, in limited numbers
- FR : Roses rouges, ballons bisous et coffrets cœur, en quantité limitée
- ES : Rosas rojas, globos beso y cajas corazón, en cantidad limitada

**banner.collections.tu-beav.name**

- HE : ט״ו באב
- EN : Tu B’Av
- FR : Tou Beav
- ES : Tu BeAv

**banner.collections.tu-beav.line**

- HE : חג האהבה שלנו – זרים ומארזים במהדורה מיוחדת
- EN : Israel’s day of love: special-edition bouquets and boxes
- FR : La fête de l’amour en Israël : bouquets et coffrets en édition spéciale
- ES : El día del amor en Israel: ramos y cajas en edición especial

**banner.collections.rosh-hashana.name**

- HE : ראש השנה
- EN : Rosh Hashanah
- FR : Roch Hachana
- ES : Rosh Hashaná

**banner.collections.rosh-hashana.line**

- HE : מתנות לשנה מתוקה – פרחים, קינוחים ומארזים
- EN : Gifts for a sweet new year: flowers, desserts and boxes
- FR : Des cadeaux pour une année douce : fleurs, desserts et coffrets
- ES : Regalos para un año dulce: flores, postres y cajas

**banner.collections.pesach.name**

- HE : פסח
- EN : Passover
- FR : Pessah
- ES : Pésaj

**banner.collections.pesach.line**

- HE : פרחים לשולחן החג ומתנות למארחים
- EN : Flowers for the holiday table and gifts for your hosts
- FR : Des fleurs pour la table de fête et des cadeaux pour vos hôtes
- ES : Flores para la mesa de fiesta y regalos para los anfitriones

**banner.collections.shavuot.name**

- HE : שבועות
- EN : Shavuot
- FR : Chavouot
- ES : Shavuot

**banner.collections.shavuot.line**

- HE : זרים לבנים ופסטליים לחג
- EN : White and pastel bouquets for the holiday
- FR : Bouquets blancs et pastel pour la fête
- ES : Ramos blancos y pastel para la fiesta

**banner.collections.womens-day.name**

- HE : יום האישה
- EN : Women’s Day
- FR : Journée de la femme
- ES : Día de la Mujer

**banner.collections.womens-day.line**

- HE : פרחים לנשים שאתם אוהבים
- EN : Flowers for the women you love
- FR : Des fleurs pour les femmes que vous aimez
- ES : Flores para las mujeres que quieres

### hero

**hero.eyebrow**

- HE : PREMIUM FLOWER BOUTIQUE · RISHON LEZION
- EN : PREMIUM FLOWER BOUTIQUE · RISHON LEZION
- FR : PREMIUM FLOWER BOUTIQUE · RISHON LEZION
- ES : PREMIUM FLOWER BOUTIQUE · RISHON LEZION

**hero.title**

- HE : זרים שמספרים סיפור
- EN : Flowers that tell your story
- FR : Des fleurs qui racontent votre histoire
- ES : Flores que cuentan tu historia

**hero.cta**

- HE : לחנות
- EN : Shop now
- FR : La boutique
- ES : Ir a la tienda

**hero.whatsapp**

- HE : הזמנה בוואטסאפ
- EN : Order on WhatsApp
- FR : Commander sur WhatsApp
- ES : Pedir por WhatsApp

**hero.alt**

- HE : זר ענק של ורדים אדומים בעטיפת שמנת
- EN : A giant bouquet of red roses wrapped in cream paper
- FR : Un immense bouquet de roses rouges dans un emballage crème
- ES : Un ramo gigante de rosas rojas envuelto en papel crema

### manifesto

**manifesto.eyebrow**

- HE : פלאוור סטורי
- EN : Flower Story
- FR : Flower Story
- ES : Flower Story

**manifesto.title**

- HE : בוטיק פרחים פרימיום לחיבור קסום ומרגש בין אנשים
- EN : A premium flower boutique, for a magical and moving bond between people
- FR : Une boutique florale premium, pour un lien magique et émouvant entre les gens
- ES : Una floristería premium, para un vínculo mágico y emocionante entre las personas

**manifesto.body**

- HE : כל הזמנה נבנית סביב מי שמקבל אותה: הצבעים, הגודל, המילים. זרי ורדים, זרי בלונים, קינוחים ולבבות פרחים – מעוצבים אצלנו בראשון לציון ונשלחים ברחבי הארץ, ולאירועים גם בחו״ל.
- EN : Every order is built around the person receiving it: the colours, the size, the words. Rose bouquets, balloon bouquets, desserts and flower hearts, designed in our Rishon LeZion studio and delivered in Israel, with event work abroad too.
- FR : Chaque commande se construit autour de la personne qui la reçoit : les couleurs, la taille, les mots. Bouquets de roses, bouquets ballons, desserts et cœurs fleuris, créés dans notre studio de Rishon LeZion et livrés en Israël, et pour les événements, jusqu’à l’étranger.
- ES : Cada pedido se crea alrededor de quien lo recibe: los colores, el tamaño, las palabras. Ramos de rosas, ramos con globos, postres y corazones de flores, diseñados en nuestro estudio de Rishon LeZion y enviados en Israel, y para eventos, también al extranjero.

### signature

**signature.eyebrow**

- HE : הקולקציות שלנו
- EN : Our collections
- FR : Nos collections
- ES : Nuestras colecciones

**signature.title**

- HE : שלוש חתימות
- EN : Three signatures
- FR : Trois signatures
- ES : Tres firmas

**signature.viewAll**

- HE : לכל החנות
- EN : Shop everything
- FR : Toute la boutique
- ES : Ver toda la tienda

**signature.items.0.title**

- HE : זרי ורדים
- EN : Rose bouquets
- FR : Bouquets de roses
- ES : Ramos de rosas

**signature.items.0.text**

- HE : עשרות ומאות ורדים בזר אחד, עטופים בשכבות רכות. מחווה שאי אפשר לשכוח.
- EN : Dozens, even hundreds of roses in a single bouquet, wrapped in soft layers. A gesture no one forgets.
- FR : Des dizaines, voire des centaines de roses en un seul bouquet, enveloppées de voiles. Un geste qu’on n’oublie pas.
- ES : Decenas, incluso cientos de rosas en un solo ramo, envueltas en capas suaves. Un gesto que no se olvida.

**signature.items.0.category**

- HE : roses
- EN : roses
- FR : roses
- ES : roses

**signature.items.0.image**

- HE : /media/roses/roses-027.jpg
- EN : /media/roses/roses-027.jpg
- FR : /media/roses/roses-027.jpg
- ES : /media/roses/roses-027.jpg

**signature.items.1.title**

- HE : זרי בלונים
- EN : Balloon bouquets
- FR : Bouquets ballons
- ES : Ramos con globos

**signature.items.1.text**

- HE : בוחרים צבע בלון, עיטוף וגודל, ומוסיפים מילה אישית שתודפס על הבלון.
- EN : Choose the balloon colour, the wrap and the size, then add a personal word printed on the balloon.
- FR : Choisissez la couleur du ballon, l’emballage et la taille, puis ajoutez un mot imprimé sur le ballon.
- ES : Elige el color del globo, el envoltorio y el tamaño, y añade una palabra impresa en el globo.

**signature.items.1.category**

- HE : balloon-bouquets
- EN : balloon-bouquets
- FR : balloon-bouquets
- ES : balloon-bouquets

**signature.items.1.image**

- HE : /media/bouquets-ballons/bouquets-ballons-001.jpg
- EN : /media/bouquets-ballons/bouquets-ballons-001.jpg
- FR : /media/bouquets-ballons/bouquets-ballons-001.jpg
- ES : /media/bouquets-ballons/bouquets-ballons-001.jpg

**signature.items.2.title**

- HE : מארזי קינוחים ופרחים
- EN : Dessert & flower boxes
- FR : Coffrets desserts et fleurs
- ES : Cajas de postres y flores

**signature.items.2.text**

- HE : לבבות מלאים קינוחים, מעוטרים בפרחים חיים. מתוק, יפה וחגיגי.
- EN : Hearts filled with desserts and dressed with fresh flowers. Sweet, beautiful and festive.
- FR : Des cœurs garnis de desserts et habillés de fleurs fraîches. Doux, beau et festif.
- ES : Corazones llenos de postres y vestidos con flores naturales. Dulce, bonito y festivo.

**signature.items.2.category**

- HE : desserts
- EN : desserts
- FR : desserts
- ES : desserts

**signature.items.2.image**

- HE : /media/desserts/desserts-012.jpg
- EN : /media/desserts/desserts-012.jpg
- FR : /media/desserts/desserts-012.jpg
- ES : /media/desserts/desserts-012.jpg

### shop

**shop.eyebrow**

- HE : החנות
- EN : The shop
- FR : La boutique
- ES : La tienda

**shop.title**

- HE : בחרו את הרגע
- EN : Choose the moment
- FR : Choisissez le moment
- ES : Elige el momento

**shop.intro**

- HE : כל זר מורכב ביום המשלוח. בוחרים גודל, צבעים והקדשה – והשאר עלינו.
- EN : Every bouquet is made on the day of delivery. Pick the size, the colours and the message; we take care of the rest.
- FR : Chaque bouquet est composé le jour de la livraison. Vous choisissez la taille, les couleurs et le mot ; on s’occupe du reste.
- ES : Cada ramo se prepara el día del envío. Tú eliges el tamaño, los colores y la dedicatoria; nosotros, el resto.

**shop.all**

- HE : הכול
- EN : All
- FR : Tout
- ES : Todo

**shop.categories**

- HE : קטגוריה
- EN : Category
- FR : Catégorie
- ES : Categoría

**shop.occasions**

- HE : לאיזה רגע
- EN : Occasion
- FR : Occasion
- ES : Ocasión

**shop.from**

- HE : החל מ־
- EN : From 
- FR : À partir de 
- ES : Desde 

**shop.onRequest**

- HE : המחיר יאושר בוואטסאפ
- EN : Price confirmed on WhatsApp
- FR : Prix confirmé sur WhatsApp
- ES : Precio confirmado por WhatsApp

**shop.soldOut**

- HE : אזל מהמלאי
- EN : Sold out
- FR : Épuisé
- ES : Agotado

**shop.left**

- HE : נותרו {n}
- EN : {n} left
- FR : Plus que {n}
- ES : Quedan {n}

**shop.limited**

- HE : מהדורה מוגבלת
- EN : Limited edition
- FR : Édition limitée
- ES : Edición limitada

**shop.empty**

- HE : אין כרגע פריטים בבחירה הזו.
- EN : Nothing here for this selection yet.
- FR : Rien pour cette sélection pour le moment.
- ES : Todavía no hay nada en esta selección.

**shop.viewAll**

- HE : לכל החנות
- EN : Shop everything
- FR : Toute la boutique
- ES : Ver toda la tienda

**shop.count**

- HE : {n} פריטים
- EN : {n} pieces
- FR : {n} créations
- ES : {n} piezas

**shop.view**

- HE : לפרטים
- EN : View
- FR : Voir
- ES : Ver

### product

**product.back**

- HE : חזרה לחנות
- EN : Back to the shop
- FR : Retour à la boutique
- ES : Volver a la tienda

**product.options**

- HE : התאמה אישית
- EN : Make it yours
- FR : Personnaliser
- ES : Personalizar

**product.word**

- HE : הקדשה אישית
- EN : Personal message
- FR : Mot personnel
- ES : Dedicatoria

**product.wordPlaceholder**

- HE : מזל טוב נועה · אוהבים אותך
- EN : Happy birthday Noa · Love you
- FR : Joyeux anniversaire Noa · Je t’aime
- ES : Feliz cumpleaños Noa · Te quiero

**product.wordHint**

- HE : עד 40 תווים. תודפס על הבלון או על הכרטיס.
- EN : Up to 40 characters, printed on the balloon or the card.
- FR : 40 caractères maximum, imprimés sur le ballon ou la carte.
- ES : Hasta 40 caracteres, impresos en el globo o en la tarjeta.

**product.date**

- HE : תאריך משלוח
- EN : Delivery date
- FR : Date de livraison
- ES : Fecha de entrega

**product.slot**

- HE : חלון זמנים
- EN : Time slot
- FR : Créneau
- ES : Franja horaria

**product.chooseSlot**

- HE : בחרו חלון זמנים
- EN : Choose a time slot
- FR : Choisir un créneau
- ES : Elige una franja

**product.addToCart**

- HE : הוספה לסל
- EN : Add to bag
- FR : Ajouter au panier
- ES : Añadir a la cesta

**product.added**

- HE : נוסף לסל
- EN : Added to your bag
- FR : Ajouté au panier
- ES : Añadido a la cesta

**product.orderWhatsapp**

- HE : שאלה על המוצר בוואטסאפ
- EN : Ask about this piece on WhatsApp
- FR : Une question sur WhatsApp
- ES : Preguntar por WhatsApp

**product.suggestions**

- HE : להשלמת המתנה
- EN : Complete the gift
- FR : Pour compléter le cadeau
- ES : Para completar el regalo

**product.add**

- HE : הוספה
- EN : Add
- FR : Ajouter
- ES : Añadir

**product.related**

- HE : עוד מאותה קולקציה
- EN : More from this collection
- FR : Dans la même collection
- ES : De la misma colección

**product.freshNote**

- HE : כל זר מורכב מפרחים טריים ביום המשלוח. הגוונים עשויים להשתנות מעט לפי עונה.
- EN : Every bouquet is made with fresh flowers on the day of delivery. Shades may vary slightly with the season.
- FR : Chaque bouquet est composé de fleurs fraîches le jour de la livraison. Les teintes peuvent légèrement varier selon la saison.
- ES : Cada ramo se prepara con flores frescas el día de la entrega. Los tonos pueden variar ligeramente según la temporada.

**product.required**

- HE : בחרו {field}
- EN : Please choose {field}
- FR : Choisissez {field}
- ES : Elige {field}

**product.gallery**

- HE : תמונה {n} מתוך {total}
- EN : Image {n} of {total}
- FR : Image {n} sur {total}
- ES : Imagen {n} de {total}

### options

**options.size**

- HE : גודל
- EN : Size
- FR : Taille
- ES : Tamaño

**options.roses**

- HE : מספר ורדים
- EN : Number of roses
- FR : Nombre de roses
- ES : Número de rosas

**options.roseColor**

- HE : צבע הוורדים
- EN : Rose colour
- FR : Couleur des roses
- ES : Color de las rosas

**options.balloonColor**

- HE : צבע הבלון
- EN : Balloon colour
- FR : Couleur du ballon
- ES : Color del globo

**options.wrapColor**

- HE : צבע העטיפה
- EN : Wrap colour
- FR : Couleur de l’emballage
- ES : Color del envoltorio

**options.palette**

- HE : גוונים
- EN : Palette
- FR : Teintes
- ES : Tonos

**options.hearts**

- HE : מספר לבבות
- EN : Number of hearts
- FR : Nombre de cœurs
- ES : Número de corazones

### choices

**choices.hearts.1**

- HE : לב אחד
- EN : One heart
- FR : Un cœur
- ES : Un corazón

**choices.hearts.2**

- HE : שני לבבות
- EN : Two hearts
- FR : Deux cœurs
- ES : Dos corazones

**choices.roses**

- HE : {n} ורדים
- EN : {n} roses
- FR : {n} roses
- ES : {n} rosas

### colors

**colors.red**

- HE : אדום
- EN : Red
- FR : Rouge
- ES : Rojo

**colors.white**

- HE : לבן
- EN : White
- FR : Blanc
- ES : Blanco

**colors.pink**

- HE : ורוד
- EN : Pink
- FR : Rose
- ES : Rosa

**colors.cream**

- HE : שמנת
- EN : Cream
- FR : Crème
- ES : Crema

**colors.nude**

- HE : ניוד
- EN : Nude
- FR : Nude
- ES : Nude

**colors.black**

- HE : שחור
- EN : Black
- FR : Noir
- ES : Negro

**colors.clear**

- HE : שקוף
- EN : Clear
- FR : Transparent
- ES : Transparente

**colors.blue**

- HE : תכלת
- EN : Baby blue
- FR : Bleu ciel
- ES : Celeste

**colors.mixed**

- HE : מעורב
- EN : Mixed
- FR : Mélange
- ES : Mezcla

### cart

**cart.title**

- HE : הסל שלך
- EN : Your bag
- FR : Votre panier
- ES : Tu cesta

**cart.empty**

- HE : הסל ריק – בואו נמלא אותו בפרחים.
- EN : Your bag is empty. Let’s fill it with flowers.
- FR : Votre panier est vide. Remplissons-le de fleurs.
- ES : Tu cesta está vacía. Llenémosla de flores.

**cart.continue**

- HE : להמשך קנייה
- EN : Keep shopping
- FR : Continuer mes achats
- ES : Seguir comprando

**cart.checkout**

- HE : להמשך הזמנה
- EN : Checkout
- FR : Commander
- ES : Finalizar pedido

**cart.remove**

- HE : הסרה
- EN : Remove
- FR : Retirer
- ES : Quitar

**cart.qty**

- HE : כמות
- EN : Quantity
- FR : Quantité
- ES : Cantidad

**cart.subtotal**

- HE : סכום ביניים
- EN : Subtotal
- FR : Sous-total
- ES : Subtotal

**cart.pricesNote**

- HE : המחיר הסופי יאושר בוואטסאפ לפני התשלום.
- EN : The final price is confirmed on WhatsApp before payment.
- FR : Le prix final est confirmé sur WhatsApp avant le paiement.
- ES : El precio final se confirma por WhatsApp antes del pago.

**cart.word**

- HE : הקדשה
- EN : Message
- FR : Mot
- ES : Dedicatoria

**cart.addons**

- HE : תוספות
- EN : Extras
- FR : Suppléments
- ES : Extras

**cart.open**

- HE : פתיחת הסל
- EN : Open bag
- FR : Ouvrir le panier
- ES : Abrir la cesta

**cart.items**

- HE : {n} פריטים בסל
- EN : {n} items in your bag
- FR : {n} articles dans le panier
- ES : {n} artículos en la cesta

### checkout

**checkout.title**

- HE : סיום הזמנה
- EN : Checkout
- FR : Finaliser la commande
- ES : Finalizar pedido

**checkout.summary**

- HE : ההזמנה שלך
- EN : Your order
- FR : Votre commande
- ES : Tu pedido

**checkout.you**

- HE : הפרטים שלך
- EN : Your details
- FR : Vos coordonnées
- ES : Tus datos

**checkout.name**

- HE : שם מלא
- EN : Full name
- FR : Nom complet
- ES : Nombre completo

**checkout.phone**

- HE : טלפון
- EN : Phone
- FR : Téléphone
- ES : Teléfono

**checkout.email**

- HE : אימייל (לאישור הזמנה)
- EN : Email (for your confirmation)
- FR : E-mail (pour la confirmation)
- ES : Correo (para la confirmación)

**checkout.delivery**

- HE : משלוח או איסוף
- EN : Delivery or pick-up
- FR : Livraison ou retrait
- ES : Envío o recogida

**checkout.modeDelivery**

- HE : משלוח
- EN : Delivery
- FR : Livraison
- ES : Envío

**checkout.modePickup**

- HE : איסוף מהסטודיו
- EN : Pick-up at the studio
- FR : Retrait au studio
- ES : Recogida en el estudio

**checkout.pickupNote**

- HE : כתובת הסטודיו בראשון לציון תישלח בוואטסאפ.
- EN : The studio address in Rishon LeZion will be sent on WhatsApp.
- FR : L’adresse du studio à Rishon LeZion vous sera envoyée sur WhatsApp.
- ES : La dirección del estudio en Rishon LeZion se enviará por WhatsApp.

**checkout.zone**

- HE : אזור משלוח
- EN : Delivery area
- FR : Zone de livraison
- ES : Zona de envío

**checkout.address**

- HE : כתובת למשלוח
- EN : Delivery address
- FR : Adresse de livraison
- ES : Dirección de entrega

**checkout.city**

- HE : עיר
- EN : City
- FR : Ville
- ES : Ciudad

**checkout.date**

- HE : תאריך
- EN : Date
- FR : Date
- ES : Fecha

**checkout.slot**

- HE : חלון זמנים
- EN : Time slot
- FR : Créneau
- ES : Franja horaria

**checkout.gift**

- HE : זו מתנה
- EN : This is a gift
- FR : C’est un cadeau
- ES : Es un regalo

**checkout.recipientName**

- HE : שם המקבל/ת
- EN : Recipient’s name
- FR : Nom du destinataire
- ES : Nombre de quien lo recibe

**checkout.recipientPhone**

- HE : טלפון של המקבל/ת
- EN : Recipient’s phone
- FR : Téléphone du destinataire
- ES : Teléfono de quien lo recibe

**checkout.card**

- HE : ברכה לכרטיס
- EN : Card message
- FR : Mot sur la carte
- ES : Mensaje para la tarjeta

**checkout.notes**

- HE : הערות
- EN : Notes
- FR : Remarques
- ES : Notas

**checkout.payment**

- HE : תשלום
- EN : Payment
- FR : Paiement
- ES : Pago

**checkout.payWhatsapp**

- HE : שליחת ההזמנה בוואטסאפ
- EN : Send my order on WhatsApp
- FR : Envoyer ma commande sur WhatsApp
- ES : Enviar mi pedido por WhatsApp

**checkout.payWhatsappNote**

- HE : ההזמנה נשלחת לשיר בוואטסאפ עם כל הפרטים. התשלום מתבצע לאחר אישור.
- EN : Your order goes to Shir on WhatsApp with every detail. Payment happens once it is confirmed.
- FR : Votre commande part chez Shir sur WhatsApp avec tous les détails. Le paiement se fait après confirmation.
- ES : Tu pedido llega a Shir por WhatsApp con todos los detalles. El pago se hace después de la confirmación.

**checkout.payCard**

- HE : תשלום בכרטיס אשראי
- EN : Pay by card
- FR : Payer par carte
- ES : Pagar con tarjeta

**checkout.submit**

- HE : שליחת ההזמנה
- EN : Send my order
- FR : Envoyer ma commande
- ES : Enviar mi pedido

**checkout.submitCard**

- HE : למעבר לתשלום
- EN : Continue to payment
- FR : Passer au paiement
- ES : Ir al pago

**checkout.sending**

- HE : שולחים…
- EN : Sending…
- FR : Envoi…
- ES : Enviando…

**checkout.fee**

- HE : משלוח
- EN : Delivery
- FR : Livraison
- ES : Envío

**checkout.feeOnRequest**

- HE : יאושר בוואטסאפ
- EN : Confirmed on WhatsApp
- FR : Confirmé sur WhatsApp
- ES : Confirmado por WhatsApp

**checkout.total**

- HE : סה״כ
- EN : Total
- FR : Total
- ES : Total

**checkout.errors.required**

- HE : שדה חובה
- EN : Required
- FR : Champ obligatoire
- ES : Campo obligatorio

**checkout.errors.phone**

- HE : מספר טלפון לא תקין
- EN : Please check the phone number
- FR : Vérifiez le numéro de téléphone
- ES : Revisa el número de teléfono

**checkout.errors.email**

- HE : כתובת אימייל לא תקינה
- EN : Please check the email address
- FR : Vérifiez l’adresse e-mail
- ES : Revisa el correo electrónico

**checkout.errors.closed**

- HE : אין משלוחים ביום הזה
- EN : No deliveries on this day
- FR : Pas de livraison ce jour-là
- ES : No hay entregas ese día

**checkout.errors.lead**

- HE : יש להזמין לפחות {h} שעות מראש
- EN : Please order at least {h} hours ahead
- FR : Merci de commander au moins {h} heures à l’avance
- ES : Pide con al menos {h} horas de antelación

**checkout.errors.generic**

- HE : משהו השתבש. אפשר לשלוח את ההזמנה ישירות בוואטסאפ.
- EN : Something went wrong. You can send your order directly on WhatsApp.
- FR : Un problème est survenu. Vous pouvez envoyer votre commande directement sur WhatsApp.
- ES : Algo salió mal. Puedes enviar tu pedido directamente por WhatsApp.

**checkout.done**

- HE : ההזמנה נשלחה
- EN : Order sent
- FR : Commande envoyée
- ES : Pedido enviado

**checkout.doneText**

- HE : תודה! שיר תחזור אליך בוואטסאפ לאישור ההזמנה והתשלום.
- EN : Thank you! Shir will get back to you on WhatsApp to confirm the order and payment.
- FR : Merci ! Shir vous répond sur WhatsApp pour confirmer la commande et le paiement.
- ES : ¡Gracias! Shir te responderá por WhatsApp para confirmar el pedido y el pago.

**checkout.emptyCart**

- HE : הסל ריק.
- EN : Your bag is empty.
- FR : Votre panier est vide.
- ES : Tu cesta está vacía.

### statement

**statement.title**

- HE : אין יפה כזה
- EN : Nothing quite like it
- FR : Rien d’aussi beau
- ES : No hay nada igual

**statement.text**

- HE : הלב פרחים החדש שלנו – חגיגי, אלגנטי, ומושלם לכל רגע גדול.
- EN : Our new flower heart: festive, elegant and made for life’s big moments.
- FR : Notre nouveau cœur fleuri : festif, élégant, parfait pour les grands moments.
- ES : Nuestro nuevo corazón de flores: festivo, elegante y perfecto para los grandes momentos.

**statement.cta**

- HE : ללבבות הפרחים
- EN : See the flower hearts
- FR : Voir les cœurs fleuris
- ES : Ver los corazones de flores

**statement.alt**

- HE : לב של פרחים ורודים בסל עם ידית לב
- EN : A heart of pink flowers in a basket with a heart-shaped handle
- FR : Un cœur de fleurs roses dans un panier à anse en cœur
- ES : Un corazón de flores rosas en una cesta con asa de corazón

### story

**story.eyebrow**

- HE : הסיפור שלנו
- EN : Our story
- FR : Notre histoire
- ES : Nuestra historia

**story.title**

- HE : מאחורי כל זר יש את שיר
- EN : Behind every bouquet, there is Shir
- FR : Derrière chaque bouquet, il y a Shir
- ES : Detrás de cada ramo está Shir

**story.body**

- HE : פלאוור סטורי נולדה מתוך אהבה לרגעים שבהם מישהו מקבל פרחים ולא מאמין. בסטודיו בראשון לציון שיר מעצבת כל הזמנה לפי האדם שמקבל אותה – מזר ורדים ענק ועד לב קינוחים קטן עם הקדשה.
- EN : Flower Story was born from a love of that moment when someone receives flowers and can’t quite believe it. In her Rishon LeZion studio, Shir designs every order around the person receiving it, from a giant rose bouquet to a small dessert heart with a message.
- FR : Flower Story est née de l’amour de ce moment où quelqu’un reçoit des fleurs et n’en revient pas. Dans son studio de Rishon LeZion, Shir imagine chaque commande pour la personne qui la reçoit, du bouquet géant de roses au petit cœur de desserts avec un mot.
- ES : Flower Story nació del amor por ese momento en que alguien recibe flores y no se lo puede creer. En su estudio de Rishon LeZion, Shir diseña cada pedido pensando en quien lo recibe, desde un ramo gigante de rosas hasta un pequeño corazón de postres con dedicatoria.

**story.alt**

- HE : שיר, מייסדת פלאוור סטורי, עם לב פרחים ורוד
- EN : Shir, founder of Flower Story, holding a pink flower heart
- FR : Shir, fondatrice de Flower Story, avec un cœur de fleurs rose
- ES : Shir, fundadora de Flower Story, con un corazón de flores rosa

### events

**events.eyebrow**

- HE : אירועים וסדנאות
- EN : Events & workshops
- FR : Événements et ateliers
- ES : Eventos y talleres

**events.title**

- HE : עיצוב פרחים לרגעים הגדולים
- EN : Flowers for the big moments
- FR : Des fleurs pour les grands moments
- ES : Flores para los grandes momentos

**events.text**

- HE : פרחים ובלונים לאירועים בארץ ובחו״ל, וסדנאות פרחים לקבוצות. ספרו לנו על האירוע ונחזור עם הצעה.
- EN : Flowers and balloons for events in Israel and abroad, and flower workshops for groups. Tell us about your event and we’ll come back with a proposal.
- FR : Fleurs et ballons pour vos événements en Israël et à l’étranger, et ateliers floraux pour les groupes. Parlez-nous de votre événement, nous revenons vers vous avec une proposition.
- ES : Flores y globos para eventos en Israel y en el extranjero, y talleres florales para grupos. Cuéntanos tu evento y te enviaremos una propuesta.

**events.items.0**

- HE : אירועים פרטיים וימי הולדת
- EN : Private events & birthdays
- FR : Événements privés et anniversaires
- ES : Eventos privados y cumpleaños

**events.items.1**

- HE : לידות ובריתות
- EN : Births & brit milah
- FR : Naissances et brit mila
- ES : Nacimientos y brit milá

**events.items.2**

- HE : אירועי חברה
- EN : Corporate events
- FR : Événements d’entreprise
- ES : Eventos de empresa

**events.items.3**

- HE : סדנאות פרחים
- EN : Flower workshops
- FR : Ateliers floraux
- ES : Talleres florales

**events.form.name**

- HE : שם
- EN : Name
- FR : Nom
- ES : Nombre

**events.form.phone**

- HE : טלפון
- EN : Phone
- FR : Téléphone
- ES : Teléfono

**events.form.type**

- HE : סוג האירוע
- EN : Type of event
- FR : Type d’événement
- ES : Tipo de evento

**events.form.types.0**

- HE : אירוע פרטי
- EN : Private event
- FR : Événement privé
- ES : Evento privado

**events.form.types.1**

- HE : יום הולדת
- EN : Birthday
- FR : Anniversaire
- ES : Cumpleaños

**events.form.types.2**

- HE : לידה / ברית
- EN : Birth / brit
- FR : Naissance / brit
- ES : Nacimiento / brit

**events.form.types.3**

- HE : אירוע חברה
- EN : Corporate event
- FR : Événement d’entreprise
- ES : Evento de empresa

**events.form.types.4**

- HE : סדנה
- EN : Workshop
- FR : Atelier
- ES : Taller

**events.form.types.5**

- HE : אחר
- EN : Other
- FR : Autre
- ES : Otro

**events.form.date**

- HE : תאריך משוער
- EN : Approximate date
- FR : Date approximative
- ES : Fecha aproximada

**events.form.guests**

- HE : מספר אורחים
- EN : Number of guests
- FR : Nombre d’invités
- ES : Número de invitados

**events.form.message**

- HE : ספרו לנו עוד
- EN : Tell us more
- FR : Dites-nous en plus
- ES : Cuéntanos más

**events.form.submit**

- HE : שליחה בוואטסאפ
- EN : Send on WhatsApp
- FR : Envoyer sur WhatsApp
- ES : Enviar por WhatsApp

**events.form.quote**

- HE : בהצעת מחיר
- EN : On quotation
- FR : Sur devis
- ES : Bajo presupuesto

### upclose

**upclose.eyebrow**

- HE : מקרוב
- EN : Up close
- FR : De près
- ES : De cerca

**upclose.title**

- HE : הפרטים הקטנים
- EN : The small details
- FR : Les petits détails
- ES : Los pequeños detalles

**upclose.text**

- HE : פנינים בין הוורדים, אורגנזה בשכבות, סרטים בקשירה ידנית. הדברים שרואים רק מקרוב.
- EN : Pearls among the roses, layered organza, ribbons tied by hand. The things you only see up close.
- FR : Des perles entre les roses, de l’organza en couches, des rubans noués à la main. Ce qu’on ne voit que de près.
- ES : Perlas entre las rosas, organza en capas, cintas atadas a mano. Lo que solo se ve de cerca.

**upclose.alt**

- HE : פרט מקרוב של זר
- EN : A close-up detail of a bouquet
- FR : Détail en gros plan d’un bouquet
- ES : Detalle de cerca de un ramo

### reviews

**reviews.eyebrow**

- HE : מילים חמות
- EN : Kind words
- FR : Mots doux
- ES : Palabras bonitas

**reviews.title**

- HE : מה הלקוחות אומרים
- EN : What our clients say
- FR : Ce que disent nos clients
- ES : Lo que dicen nuestros clientes

### info

**info.eyebrow**

- HE : משלוחים ומידע
- EN : Delivery & information
- FR : Livraison et infos
- ES : Envíos e información

**info.title**

- HE : איך זה עובד
- EN : How it works
- FR : Comment ça marche
- ES : Cómo funciona

**info.items.0.title**

- HE : משלוחים
- EN : Delivery
- FR : Livraison
- ES : Envíos

**info.items.0.text**

- HE : משלוחים בראשון לציון והסביבה, ובתיאום לשאר הארץ.
- EN : We deliver in Rishon LeZion and the surrounding area, and across Israel on request.
- FR : Nous livrons à Rishon LeZion et dans les environs, et dans tout Israël sur demande.
- ES : Entregamos en Rishon LeZion y alrededores, y en todo Israel a consultar.

**info.items.1.title**

- HE : ימי פעילות
- EN : Opening days
- FR : Jours d’ouverture
- ES : Días de apertura

**info.items.1.text**

- HE : ימים א׳–ו׳. אין משלוחים בשבת ובחגים.
- EN : Sunday to Friday. No deliveries on Shabbat or Jewish holidays.
- FR : Du dimanche au vendredi. Pas de livraison le chabbat ni les jours de fête.
- ES : De domingo a viernes. Sin entregas en Shabat ni en fiestas judías.

**info.items.2.title**

- HE : הזמנה מראש
- EN : Order ahead
- FR : Commander à l’avance
- ES : Pide con antelación

**info.items.2.text**

- HE : מומלץ להזמין יום לפני. לחגים ולמהדורות מוגבלות – מוקדם ככל האפשר.
- EN : We recommend ordering a day ahead. For holidays and limited editions, as early as you can.
- FR : Nous conseillons de commander la veille. Pour les fêtes et les éditions limitées, le plus tôt possible.
- ES : Recomendamos pedir el día anterior. Para fiestas y ediciones limitadas, lo antes posible.

**info.items.3.title**

- HE : איסוף עצמי
- EN : Pick-up
- FR : Retrait
- ES : Recogida

**info.items.3.text**

- HE : אפשר לאסוף מהסטודיו בראשון לציון בתיאום מראש.
- EN : You can collect your order at our Rishon LeZion studio by appointment.
- FR : Vous pouvez retirer votre commande au studio de Rishon LeZion, sur rendez-vous.
- ES : Puedes recoger tu pedido en nuestro estudio de Rishon LeZion con cita previa.

### contact

**contact.eyebrow**

- HE : צור קשר
- EN : Contact
- FR : Contact
- ES : Contacto

**contact.title**

- HE : בואו נדבר פרחים
- EN : Let’s talk flowers
- FR : Parlons fleurs
- ES : Hablemos de flores

**contact.text**

- HE : הדרך המהירה ביותר אלינו היא וואטסאפ. שיר עונה בימים א׳–ו׳.
- EN : WhatsApp is the fastest way to reach us. Shir replies Sunday to Friday.
- FR : WhatsApp est le moyen le plus rapide de nous joindre. Shir répond du dimanche au vendredi.
- ES : WhatsApp es la forma más rápida de contactarnos. Shir responde de domingo a viernes.

**contact.whatsapp**

- HE : וואטסאפ
- EN : WhatsApp
- FR : WhatsApp
- ES : WhatsApp

**contact.instagram**

- HE : אינסטגרם
- EN : Instagram
- FR : Instagram
- ES : Instagram

**contact.area**

- HE : ראשון לציון, ישראל
- EN : Rishon LeZion, Israel
- FR : Rishon LeZion, Israël
- ES : Rishon LeZion, Israel

### footer

**footer.tagline**

- HE : בוטיק פרחים פרימיום לחיבור קסום ומרגש בין אנשים
- EN : A premium flower boutique, for a magical and moving bond between people
- FR : Une boutique florale premium, pour un lien magique et émouvant entre les gens
- ES : Una floristería premium, para un vínculo mágico y emocionante entre las personas

**footer.shop**

- HE : חנות
- EN : Shop
- FR : Boutique
- ES : Tienda

**footer.info**

- HE : מידע
- EN : Information
- FR : Informations
- ES : Información

**footer.follow**

- HE : עקבו אחרינו
- EN : Follow us
- FR : Suivez-nous
- ES : Síguenos

**footer.rights**

- HE : כל הזכויות שמורות
- EN : All rights reserved
- FR : Tous droits réservés
- ES : Todos los derechos reservados

**footer.photos**

- HE : כל הצילומים: פלאוור סטורי
- EN : All photography: Flower Story
- FR : Toutes les photos : Flower Story
- ES : Todas las fotos: Flower Story

### whatsapp

**whatsapp.float**

- HE : שיחה בוואטסאפ
- EN : Chat on WhatsApp
- FR : Écrire sur WhatsApp
- ES : Escribir por WhatsApp

**whatsapp.hello**

- HE : היי שיר, הגעתי מהאתר של פלאוור סטורי
- EN : Hi Shir, I found you through the Flower Story website.
- FR : Bonjour Shir, je vous écris depuis le site Flower Story.
- ES : Hola Shir, te escribo desde la web de Flower Story.

**whatsapp.product**

- HE : היי שיר, יש לי שאלה על: {name}
- EN : Hi Shir, I have a question about: {name}
- FR : Bonjour Shir, j’ai une question sur : {name}
- ES : Hola Shir, tengo una pregunta sobre: {name}

**whatsapp.orderTitle**

- HE : הזמנה חדשה מהאתר
- EN : New order from the website
- FR : Nouvelle commande depuis le site
- ES : Nuevo pedido desde la web

**whatsapp.eventTitle**

- HE : פנייה לאירוע / סדנה
- EN : Event / workshop enquiry
- FR : Demande événement / atelier
- ES : Consulta de evento / taller

### abroad

**abroad**

- HE : _(vide)_
- EN : Living abroad? Send flowers to the people you love in Israel.
- FR : Vous vivez à l’étranger ? Envoyez des fleurs à vos proches en Israël.
- ES : ¿Vives fuera? Envía flores a tus seres queridos en Israel.

### email

**email.subjectClient**

- HE : קיבלנו את ההזמנה שלך – פלאוור סטורי
- EN : We received your order – Flower Story
- FR : Nous avons bien reçu votre commande – Flower Story
- ES : Hemos recibido tu pedido – Flower Story

**email.subjectShop**

- HE : הזמנה חדשה מהאתר
- EN : New order from the website
- FR : Nouvelle commande depuis le site
- ES : Nuevo pedido desde la web

**email.intro**

- HE : תודה על ההזמנה! שיר תחזור אליך בוואטסאפ לאישור.
- EN : Thank you for your order! Shir will get back to you on WhatsApp to confirm it.
- FR : Merci pour votre commande ! Shir vous répond sur WhatsApp pour la confirmer.
- ES : ¡Gracias por tu pedido! Shir te responderá por WhatsApp para confirmarlo.

**email.eventSubject**

- HE : פנייה חדשה לאירוע / סדנה
- EN : New event / workshop enquiry
- FR : Nouvelle demande événement / atelier
- ES : Nueva consulta de evento / taller

## Catalogue

> Prix d'exemple, à remplir (`pricesConfirmed: false` : les prix ne sont pas affichés sur le site).

### זרי ורדים · Bouquets de roses

#### זר ורדים אדומים סיגנצ׳ר / Signature red roses / Roses rouges signature / Rosas rojas signature

- Identifiant : `red-roses-signature` · à partir de 590 ₪ (À REMPLIR)
- Occasions : Amour, Anniversaire, Félicitations
- Options : roses, roseColor, wrapColor
- Photos : `/media/roses/roses-027.jpg`, `/media/roses/roses-021.jpg`, `/media/roses/roses-029.jpg`, `/media/roses/roses-022.jpg`, `/media/roses/roses-030.jpg`, `/media/roses/roses-028.jpg`
- HE : עשרות ומאות ורדים אדומים בזר אחד, עטופים בשכבות נייר שמנת רכות. המחווה הגדולה ביותר שלנו.
- EN : Dozens, even hundreds of red roses in a single bouquet, wrapped in soft layers of cream paper. Our grandest gesture.
- FR : Des dizaines, voire des centaines de roses rouges en un seul bouquet, enveloppées de voiles crème. Notre geste le plus grand.
- ES : Decenas, incluso cientos de rosas rojas en un solo ramo, envueltas en capas suaves de papel crema. Nuestro gesto más grande.

#### זר ורדים ורודים ופנינים / Powder roses & pearls / Roses poudrées et perles / Rosas empolvadas y perlas

- Identifiant : `powder-roses-pearls` · à partir de 390 ₪ (À REMPLIR)
- Occasions : Anniversaire, Amour, Merci
- Options : roses, roseColor, wrapColor · mot personnalisé
- Photos : `/media/roses/roses-075.jpg`, `/media/roses/roses-057.jpg`, `/media/roses/roses-077.jpg`, `/media/roses/roses-061.jpg`, `/media/roses/roses-072.jpg`, `/media/roses/roses-078.jpg`, `/media/roses/roses-085.jpg`
- HE : ורדים בגווני ורוד ושמנת, שרשרת פנינים עדינה ועטיפת אורגנזה ורודה. אפשר להוסיף שם על כרטיס השקוף.
- EN : Pink and cream roses, a delicate string of pearls and blush organza wrapping. A name can be added on the clear card.
- FR : Roses roses et crème, un fil de perles délicat et un voile d’organza rose. Un prénom peut être ajouté sur la carte transparente.
- ES : Rosas rosa y crema, un delicado hilo de perlas y envoltorio de organza rosa. Se puede añadir un nombre en la tarjeta transparente.

### זרי פרחים · Bouquets de fleurs

#### הזר החלומי / The dream bouquet / Le bouquet rêvé / El ramo soñado

- Identifiant : `dream-bouquet` · à partir de 250 ₪ (À REMPLIR)
- Occasions : Anniversaire, Merci, Félicitations, Fêtes
- Options : size, palette, wrapColor
- Photos : `/media/bouquets/bouquets-009.jpg`, `/media/bouquets/bouquets-005.jpg`, `/media/bouquets/bouquets-007.jpg`, `/media/bouquets/bouquets-008.jpg`
- HE : ליזיאנתוס, ורדים, אלסטרומריה וגיבסנית, עטופים באורגנזה ורודה. כל זר מורכב מחדש לפי הפרחים הכי יפים של היום.
- EN : Lisianthus, roses, alstroemeria and gypsophila wrapped in blush organza. Each bouquet is composed with the most beautiful flowers of the day.
- FR : Lisianthus, roses, alstroemères et gypsophile dans un voile d’organza rose. Chaque bouquet est composé avec les plus belles fleurs du jour.
- ES : Lisianthus, rosas, alstroemerias y paniculata en organza rosa. Cada ramo se compone con las flores más bonitas del día.

### זרי בלונים · Bouquets ballons

#### זר בלון חלומי / Dream balloon bouquet / Bouquet ballon rêvé / Ramo de globos soñado

- Identifiant : `dream-balloon-bouquet` · à partir de 690 ₪ (À REMPLIR)
- Occasions : Anniversaire, Amour, Félicitations
- Options : balloonColor, wrapColor, size · mot personnalisé
- Photos : `/media/bouquets-ballons/bouquets-ballons-001.jpg`, `/media/bouquets-ballons/bouquets-ballons-002.jpg`, `/media/bouquets-ballons/bouquets-ballons-003.jpg`, `/media/bouquets-ballons/bouquets-ballons-004.jpg`, `/media/bouquets-ballons/bouquets-ballons-006.jpg`
- HE : ענן של גיבסנית ורודה, בלוני לב ובלוני כרום, עטיפה בשכבות. בוחרים צבע בלון, עיטוף וגודל, ומוסיפים הקדשה אישית.
- EN : A cloud of pink gypsophila, heart and chrome balloons, layered wrapping. Choose the balloon colour, wrap and size, then add a personal word.
- FR : Un nuage de gypsophile rose, des ballons cœur et chromés, un emballage en couches. Choisissez la couleur du ballon, l’emballage, la taille, et ajoutez un mot personnel.
- ES : Una nube de paniculata rosa, globos de corazón y cromados, envoltorio en capas. Elige color de globo, envoltorio y tamaño, y añade una dedicatoria.

#### זר ורדים עם בלון פפיון / Roses with a bow balloon / Roses et ballon nœud / Rosas con globo lazo

- Identifiant : `bow-balloon-bouquet` · à partir de 590 ₪ (À REMPLIR)
- Occasions : Anniversaire, Naissance, Félicitations
- Options : balloonColor, size · mot personnalisé
- Photos : `/media/bouquets-ballons/bouquets-ballons-047.jpg`, `/media/bouquets-ballons/bouquets-ballons-043.jpg`, `/media/bouquets-ballons/bouquets-ballons-049.jpg`, `/media/bouquets-ballons/bouquets-ballons-050.jpg`, `/media/bouquets-ballons/bouquets-ballons-046.jpg`
- HE : ורדים ורודים בעטיפת אורגנזה נפוחה, בלון פפיון ובלון שקוף עם הקדשה בכתב יד.
- EN : Pink roses in billowing organza, a bow-shaped balloon and a clear balloon with a handwritten message.
- FR : Roses roses dans un organza bouffant, un ballon en forme de nœud et une bulle transparente avec un message manuscrit.
- ES : Rosas rosas en organza voluminosa, un globo con forma de lazo y un globo transparente con mensaje escrito a mano.

#### זר פרחים עם בלון לב / Bouquet with heart balloon / Bouquet et ballon cœur / Ramo con globo de corazón

- Identifiant : `heart-balloon-bouquet` · à partir de 490 ₪ (À REMPLIR)
- Occasions : Anniversaire, Amour
- Options : balloonColor, size · mot personnalisé
- Photos : `/media/bouquets-ballons/bouquets-ballons-066.jpg`, `/media/bouquets-ballons/bouquets-ballons-064.jpg`, `/media/bouquets-ballons/bouquets-ballons-068.jpg`
- HE : ליזיאנתוס ואלסטרומריה ורודים, בלון לב פנינה וזר בלונים קטן מעל. מגיע עם כרטיס ברכה.
- EN : Pink lisianthus and alstroemeria, a pearl heart balloon and a small balloon cluster above. Comes with a greeting card.
- FR : Lisianthus et alstroemères roses, un ballon cœur nacré et une petite grappe de ballons. Livré avec une carte.
- ES : Lisianthus y alstroemerias rosas, un globo corazón nacarado y un pequeño racimo de globos. Incluye tarjeta.

#### זר לב לבן ובלונים / White heart & balloons / Cœur blanc et ballons / Corazón blanco y globos

- Identifiant : `white-balloon-bouquet` · à partir de 520 ₪ (À REMPLIR)
- Occasions : Anniversaire, Naissance
- Options : size · mot personnalisé
- Photos : `/media/bouquets-ballons/bouquets-ballons-037.jpg`, `/media/bouquets-ballons/bouquets-ballons-033.jpg`
- HE : לב של גיבסנית לבנה עם מכסה לב בהקדשה אישית, בלונים לבנים ושקופים עם סרטים.
- EN : A heart of white gypsophila with a personalised heart lid, white and clear balloons with ribbons.
- FR : Un cœur de gypsophile blanche avec un couvercle cœur personnalisé, des ballons blancs et transparents à rubans.
- ES : Un corazón de paniculata blanca con tapa personalizada, globos blancos y transparentes con cintas.

#### קופסת פרחים עם בלון לב / Flower hatbox with heart balloon / Boîte à chapeau fleurie et ballon cœur / Sombrerera de flores con globo corazón

- Identifiant : `hatbox-heart-balloon` · à partir de 690 ₪ (À REMPLIR)
- Occasions : Anniversaire, Amour, Félicitations
- Options : balloonColor, size · mot personnalisé
- Photos : `/media/bouquets-ballons/bouquets-ballons-096.jpg`, `/media/bouquets-ballons/bouquets-ballons-091.jpg`, `/media/bouquets-ballons/bouquets-ballons-093.jpg`, `/media/bouquets-ballons/bouquets-ballons-089.jpg`, `/media/bouquets-ballons/bouquets-ballons-090.jpg`
- HE : קופסה עגולה ורודה שופעת ליזיאנתוס, ורדים וג׳רברה, ובלון לב עם הקדשה מודפסת.
- EN : A round pink box overflowing with lisianthus, roses and gerbera, crowned by a heart balloon with a printed message.
- FR : Une boîte ronde rose débordant de lisianthus, roses et gerberas, surmontée d’un ballon cœur imprimé.
- ES : Una caja redonda rosa rebosante de lisianthus, rosas y gerberas, con un globo corazón con mensaje impreso.

### מארזים · Coffrets

#### מארז תיק לבן / White bag box / Coffret sac blanc / Caja bolso blanco

- Identifiant : `white-bag-box` · à partir de 450 ₪ (À REMPLIR)
- Occasions : Naissance, Merci, Anniversaire
- Options : palette
- Photos : `/media/coffrets/coffrets-039.jpg`, `/media/coffrets/coffrets-042.jpg`
- HE : תיק מרופד לבן עם שרשרת זהב, מלא סחלבים, ליזיאנתוס ואלסטרומריה לבנים.
- EN : A quilted white bag with a gold chain, filled with white orchids, lisianthus and alstroemeria.
- FR : Un sac matelassé blanc à chaîne dorée, rempli d’orchidées, lisianthus et alstroemères blancs.
- ES : Un bolso acolchado blanco con cadena dorada, lleno de orquídeas, lisianthus y alstroemerias blancas.

#### מארז לב, כתר ודובי / Heart, crown & teddy box / Coffret cœur, couronne et ourson / Caja corazón, corona y osito

- Identifiant : `crown-teddy-box` · à partir de 790 ₪ (À REMPLIR) · stock : 5 (À REMPLIR)
- Occasions : Anniversaire, Amour
- Options : aucune · mot personnalisé
- Photos : `/media/coffrets/coffrets-087.jpg`, `/media/coffrets/coffrets-080.jpg`
- HE : קופסת לב ורודה עם פרחים, כתר, פינוקים ודובי לבן גדול. מהדורה מוגבלת.
- EN : A pink heart box with flowers, a crown, sweet treats and a large white teddy. Limited edition.
- FR : Une boîte cœur rose avec fleurs, couronne, douceurs et grand ourson blanc. Édition limitée.
- ES : Una caja corazón rosa con flores, corona, dulces y un gran osito blanco. Edición limitada.

### קינוחים · Desserts

#### מארז לב קינוחים ופרחים / Dessert heart with flowers / Cœur de desserts fleuri / Corazón de postres con flores

- Identifiant : `dessert-hearts` · à partir de 390 ₪ (À REMPLIR)
- Occasions : Anniversaire, Amour, Félicitations
- Options : hearts, palette · mot personnalisé
- Photos : `/media/desserts/desserts-012.jpg`, `/media/desserts/desserts-011.jpg`, `/media/desserts/desserts-018.jpg`, `/media/desserts/desserts-014.jpg`, `/media/desserts/desserts-017.jpg`
- HE : לב מלא קינוחים, מעוטר בפרחים חיים ובגיבסנית, עם כרטיס לב בהקדשה. אפשר להוסיף בלון לב.
- EN : A heart filled with desserts, decorated with fresh flowers and gypsophila, with a personalised heart card. Add a heart balloon if you like.
- FR : Un cœur garni de desserts, décoré de fleurs fraîches et de gypsophile, avec une carte cœur personnalisée. Ballon cœur en option.
- ES : Un corazón lleno de postres, decorado con flores naturales y paniculata, con tarjeta corazón personalizada. Globo corazón opcional.

### לבבות פרחים וסידורים · Cœurs fleuris et compositions

#### לב פרחים לבן וסחלב / White flower heart & orchid / Cœur blanc et orchidée / Corazón blanco y orquídea

- Identifiant : `white-orchid-heart` · à partir de 590 ₪ (À REMPLIR)
- Occasions : Amour, Naissance, Merci
- Options : size
- Photos : `/media/coeurs-compositions/coeurs-compositions-040.jpg`, `/media/coeurs-compositions/coeurs-compositions-038.jpg`, `/media/coeurs-compositions/coeurs-compositions-041.jpg`
- HE : לב של ליזיאנתוס לבן עם סחלבים במרכז, בעטיפת אורגנזה שקופה וסרט סאטן.
- EN : A heart of white lisianthus with orchids at its centre, in clear organza with a satin ribbon.
- FR : Un cœur de lisianthus blanc et d’orchidées, dans un voile d’organza transparent noué de satin.
- ES : Un corazón de lisianthus blanco con orquídeas en el centro, en organza transparente con lazo de satén.

#### קופסת לב יום הולדת / Birthday heart box / Boîte cœur anniversaire / Caja corazón de cumpleaños

- Identifiant : `happy-birthday-heart` · à partir de 520 ₪ (À REMPLIR)
- Occasions : Anniversaire
- Options : palette · mot personnalisé
- Photos : `/media/coeurs-compositions/coeurs-compositions-070.jpg`, `/media/coeurs-compositions/coeurs-compositions-069.jpg`, `/media/coeurs-compositions/coeurs-compositions-071.jpg`
- HE : קופסת לב פתוחה, שופעת ליזיאנתוס ורוד ולבן, עם מכסה מודפס בשם של מי שחוגג.
- EN : An open heart box overflowing with pink and white lisianthus, with a lid printed with the name of the person celebrating.
- FR : Une boîte cœur ouverte débordant de lisianthus rose et blanc, au couvercle imprimé du prénom à fêter.
- ES : Una caja corazón abierta llena de lisianthus rosa y blanco, con la tapa impresa con el nombre de quien celebra.

#### סל לב פרחים / Heart flower basket / Panier cœur fleuri / Cesta corazón de flores

- Identifiant : `heart-basket` · à partir de 750 ₪ (À REMPLIR)
- Occasions : Anniversaire, Amour, Félicitations
- Options : palette
- Photos : `/media/coeurs-compositions/coeurs-compositions-082.jpg`, `/media/coeurs-compositions/coeurs-compositions-081.jpg`, `/media/coeurs-compositions/coeurs-compositions-084.jpg`
- HE : סל עם ידית לב, שופע ליזיאנתוס וציפורנים ורודים, סרטים ופפיונים.
- EN : A basket with a heart-shaped handle, overflowing with pink lisianthus and carnations, ribbons and bows.
- FR : Un panier à anse en cœur, débordant de lisianthus et d’œillets roses, de rubans et de nœuds.
- ES : Una cesta con asa de corazón, llena de lisianthus y claveles rosas, cintas y lazos.

#### בלון לב פנינים עם כתר / Pearl heart balloon with crown / Ballon cœur perlé et couronne / Globo corazón perlado con corona

- Identifiant : `pearl-heart-crown` · à partir de 650 ₪ (À REMPLIR)
- Occasions : Anniversaire, Naissance
- Options : aucune · mot personnalisé
- Photos : `/media/coeurs-compositions/coeurs-compositions-088.jpg`
- HE : בלון לב שקוף משובץ פנינים, כתר, ופרחים לבנים בקופסה מרופדת.
- EN : A clear heart balloon studded with pearls, a crown, and white flowers in a quilted box.
- FR : Un ballon cœur transparent perlé, une couronne et des fleurs blanches dans une boîte matelassée.
- ES : Un globo corazón transparente con perlas, una corona y flores blancas en una caja acolchada.

### בלונים מיוחדים · Ballons

#### ענן בלונים ורוד / Pink balloon cloud / Nuage de ballons roses / Nube de globos rosa

- Identifiant : `pink-balloon-cloud` · à partir de 290 ₪ (À REMPLIR)
- Occasions : Anniversaire, Naissance, Félicitations
- Options : balloonColor, size · mot personnalisé
- Photos : `/media/ballons/ballons-019.jpg`, `/media/ballons/ballons-020.jpg`, `/media/ballons/ballons-016.jpg`, `/media/ballons/ballons-015.jpg`
- HE : בלונים ורודים, לבנים ושקופים עם פפיונים קטנים, ובלון לב עם הקדשה.
- EN : Pink, white and clear balloons with tiny bows, and a heart balloon with your message.
- FR : Ballons roses, blancs et transparents ornés de petits nœuds, et un ballon cœur avec votre message.
- ES : Globos rosas, blancos y transparentes con pequeños lazos, y un globo corazón con tu mensaje.

#### בלוני נשיקה אדומים / Red kiss balloons / Ballons bisous rouges / Globos beso rojos

- Identifiant : `red-kiss-balloons` · à partir de 390 ₪ (À REMPLIR) · stock : 20 (À REMPLIR)
- Occasions : Amour
- Options : size
- Photos : `/media/ballons/ballons-025.jpg`, `/media/ballons/ballons-026.jpg`
- HE : בלוני לב ושפתיים אדומים מבריקים. מושלם לצד זר ורדים אדומים. מהדורה מוגבלת.
- EN : Glossy red heart and lip balloons. Perfect next to a bouquet of red roses. Limited edition.
- FR : Ballons cœurs et lèvres rouges brillants. Parfaits à côté d’un bouquet de roses rouges. Édition limitée.
- ES : Globos de corazón y labios rojos brillantes. Perfectos junto a un ramo de rosas rojas. Edición limitada.

### לידה · Naissance

#### סל לידה / New baby basket / Panier naissance / Cesta de nacimiento

- Identifiant : `baby-basket` · à partir de 590 ₪ (À REMPLIR)
- Occasions : Naissance
- Options : balloonColor · mot personnalisé
- Photos : `/media/baby/baby-031.jpg`
- HE : סל נצרים עם פרחים לבנים, ארנב פרווה רך ובלון בועה עם שם התינוק.
- EN : A wicker basket with white flowers, a soft plush bunny and a bubble balloon with the baby’s name.
- FR : Un panier en osier, des fleurs blanches, un lapin tout doux et un ballon bulle au prénom du bébé.
- ES : Una cesta de mimbre con flores blancas, un conejito de peluche y un globo burbuja con el nombre del bebé.

### Suppléments

- בלון הליום עם שם / Ballon hélium prénom : 45 ₪ (À REMPLIR)
- לב קינוחים קטן / Petit cœur de desserts : 120 ₪ (À REMPLIR)
- דובי פרווה / Ourson en peluche : 90 ₪ (À REMPLIR)

### Livraison

- ראשון לציון / Rishon LeZion : 40 ₪ (À REMPLIR)
- נס ציונה, רחובות, חולון, בת ים / Ness Ziona, Rehovot, Holon, Bat Yam : 60 ₪ (À REMPLIR)
- תל אביב וגוש דן / Tel Aviv et Gush Dan : 80 ₪ (À REMPLIR)
- אזור אחר (בתיאום) / Autre zone (sur demande) : sur demande ₪ (À REMPLIR)
- Délai minimum : 24 h · fermé : samedi · créneaux : 09:00–12:00, 12:00–15:00, 15:00–18:00 (vendredi : 09:00–11:00, 11:00–13:00)
