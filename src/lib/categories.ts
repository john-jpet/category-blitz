// =====================================================================
// US STATES
// =====================================================================
const US_STATES_LIST: string[] = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california',
  'colorado', 'connecticut', 'delaware', 'florida', 'georgia',
  'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
  'kansas', 'kentucky', 'louisiana', 'maine', 'maryland',
  'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri',
  'montana', 'nebraska', 'nevada', 'new hampshire', 'new jersey',
  'new mexico', 'new york', 'north carolina', 'north dakota', 'ohio',
  'oklahoma', 'oregon', 'pennsylvania', 'rhode island', 'south carolina',
  'south dakota', 'tennessee', 'texas', 'utah', 'vermont',
  'virginia', 'washington', 'west virginia', 'wisconsin', 'wyoming',
];

export const US_STATES = new Set(US_STATES_LIST);

// 2-letter abbreviations → canonical state name
export const US_STATE_ALIASES: Record<string, string> = {
  al: 'alabama', ak: 'alaska', az: 'arizona', ar: 'arkansas', ca: 'california',
  co: 'colorado', ct: 'connecticut', de: 'delaware', fl: 'florida', ga: 'georgia',
  hi: 'hawaii', id: 'idaho', il: 'illinois', in: 'indiana', ia: 'iowa',
  ks: 'kansas', ky: 'kentucky', la: 'louisiana', me: 'maine', md: 'maryland',
  ma: 'massachusetts', mi: 'michigan', mn: 'minnesota', ms: 'mississippi', mo: 'missouri',
  mt: 'montana', ne: 'nebraska', nv: 'nevada', nh: 'new hampshire', nj: 'new jersey',
  nm: 'new mexico', ny: 'new york', nc: 'north carolina', nd: 'north dakota', oh: 'ohio',
  ok: 'oklahoma', or: 'oregon', pa: 'pennsylvania', ri: 'rhode island', sc: 'south carolina',
  sd: 'south dakota', tn: 'tennessee', tx: 'texas', ut: 'utah', vt: 'vermont',
  va: 'virginia', wa: 'washington', wv: 'west virginia', wi: 'wisconsin', wy: 'wyoming',
};

/** How many times each student name appears (lowercase key → count). */
export const SE_STUDENTS_COUNT = new Map<string, number>();

export const SE_STUDENTS_LIST: string[] = [
  'Meryam',
  'Hamza',
  'Paras',
  'Charles',
  'Harpuneet',
  'Yasen',
  'William',
  'Leon',
  'Jim',
  'Patrick',
  'Sam',
  'Terry',
  'Mohan',
  'Ava',
  'David',
  'Gabriel',
  'Paloma',
  'Ethan',
  'Gavin',
  'Monellie',
  'Jaiteshwar',
  'Derek',
  'Yanzi',
  'Kaavvy',
  'Alexandre',
  'Shiming',
  'Kaibo',
  'Ali',
  'Yash',
  'Dylan',
  'Aidan',
  'Kenny',
  'Ruhani',
  'Yash',
  'Adam',
  'Thenuwara',
  'Pouya',
  'Aayan',
  'Liron',
  'Karaneh',
  'Abdullah',
  'Moosa',
  'Mohammad',
  'Gianne',
  'Julian',
  'Aadesh',
  'Tanish',
  'Nate',
  'Angus',
  'Eugene',
  'Jongbin',
  'Neng',
  'Qinkai',
  'Richard',
  'Wilson',
  'Aubree',
  'Bryan',
  'Sheehan',
  'Jalen',
  'William',
  'Sam',
  'Pranav',
  'Ethan',
  'Aruhant',
  'Cole',
  'Carol',
  'Abbas',
  'Grace',
  'Kiana',
  'Girish',
  'Arulini',
  'Amir',
  'Ramneek',
  'Mo',
  'Samgar',
  'Ario',
  'Sicheng',
  'Harsh',
  'Samrath',
  'John',
  'Shaoyu',
  'Homey',
  'Anna',
  'Maya',
  'Krish',
  'Emily',
  'Qian',
  'Jeff',
  'Nirvan',
  'Abdullah',
  'Mark',
  'Oriel',
  'Akishai',
  'Sendalan',
  'Jamie',
  'Edward',
  'Abhik',
  'Shrey',
  'Jashan',
  'Angus',
  'Edward',
  'Aaron',
  'Ricky',
  'Suri',
  'Ty',
  'Andrew',
  'Victoria',
  'Inaara',
  'Arjun',
  'Ashhal',
  'Josh',
  'Quinn',
  'Hanson',
  'Patrick',
  'Jonathan',
  'Alvin',
  'Yi',
  'Aaron',
  'Eric',
  'Kevin',
  'Kevin',
  'Andrew',
  'Matthew',
  'Sean',
  'William',
  'Olivia',
  'Sarah',
  'Gabriel',
  'Gordon',
  'Daniel',
  'Kai',
  'Thomas',
  'Alex',
  'Elaine',
  'Franklin',
  'Shiman',
  'Steven'
];

// Populate count map (must come after the list is defined)
for (const name of SE_STUDENTS_LIST) {
  const key = name.toLowerCase().trim();
  SE_STUDENTS_COUNT.set(key, (SE_STUDENTS_COUNT.get(key) ?? 0) + 1);
}

// =====================================================================
// COUNTRIES OF THE WORLD  (~195 entries)
// =====================================================================
const COUNTRIES_LIST: string[] = [
  'afghanistan', 'albania', 'algeria', 'andorra', 'angola',
  'antigua and barbuda', 'argentina', 'armenia', 'australia', 'austria',
  'azerbaijan', 'bahamas', 'bahrain', 'bangladesh', 'barbados',
  'belarus', 'belgium', 'belize', 'benin', 'bhutan',
  'bolivia', 'bosnia and herzegovina', 'botswana', 'brazil', 'brunei',
  'bulgaria', 'burkina faso', 'burundi', 'cabo verde', 'cambodia',
  'cameroon', 'canada', 'central african republic', 'chad', 'chile',
  'china', 'colombia', 'comoros', 'costa rica', 'croatia',
  'cuba', 'cyprus', 'czech republic', 'democratic republic of the congo',
  'denmark', 'djibouti', 'dominica', 'dominican republic', 'ecuador',
  'egypt', 'el salvador', 'equatorial guinea', 'eritrea', 'estonia',
  'eswatini', 'ethiopia', 'fiji', 'finland', 'france',
  'gabon', 'gambia', 'georgia', 'germany', 'ghana',
  'greece', 'grenada', 'guatemala', 'guinea', 'guinea-bissau',
  'guyana', 'haiti', 'honduras', 'hungary', 'iceland',
  'india', 'indonesia', 'iran', 'iraq', 'ireland',
  'israel', 'italy', 'ivory coast', 'jamaica', 'japan',
  'jordan', 'kazakhstan', 'kenya', 'kiribati', 'kuwait',
  'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho',
  'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg',
  'madagascar', 'malawi', 'malaysia', 'maldives', 'mali',
  'malta', 'marshall islands', 'mauritania', 'mauritius', 'mexico',
  'micronesia', 'moldova', 'monaco', 'mongolia', 'montenegro',
  'morocco', 'mozambique', 'myanmar', 'namibia', 'nauru',
  'nepal', 'netherlands', 'new zealand', 'nicaragua', 'niger',
  'nigeria', 'north korea', 'north macedonia', 'norway', 'oman',
  'pakistan', 'palau', 'panama', 'papua new guinea', 'paraguay',
  'peru', 'philippines', 'poland', 'portugal', 'qatar',
  'republic of the congo', 'romania', 'russia', 'rwanda',
  'saint kitts and nevis', 'saint lucia', 'saint vincent and the grenadines',
  'samoa', 'san marino', 'sao tome and principe', 'saudi arabia', 'senegal',
  'serbia', 'seychelles', 'sierra leone', 'singapore', 'slovakia',
  'slovenia', 'solomon islands', 'somalia', 'south africa', 'south korea',
  'south sudan', 'spain', 'sri lanka', 'sudan', 'suriname',
  'sweden', 'switzerland', 'syria', 'tajikistan', 'tanzania',
  'thailand', 'timor-leste', 'togo', 'tonga', 'trinidad and tobago',
  'tunisia', 'turkey', 'turkmenistan', 'tuvalu', 'uganda',
  'ukraine', 'united arab emirates', 'united kingdom', 'united states',
  'uruguay', 'uzbekistan', 'vanuatu', 'venezuela', 'vietnam',
  'yemen', 'zambia', 'zimbabwe',
  // Widely recognized / observer states
  'kosovo', 'palestine', 'taiwan', 'vatican city',
];

export const COUNTRIES = new Set(COUNTRIES_LIST);

// Alternative names / abbreviations → canonical name
export const COUNTRY_ALIASES: Record<string, string> = {
  // United States
  'usa': 'united states',
  'us': 'united states',
  'america': 'united states',
  'united states of america': 'united states',
  'u.s.': 'united states',
  'u.s.a.': 'united states',
  // United Kingdom
  'uk': 'united kingdom',
  'great britain': 'united kingdom',
  'britain': 'united kingdom',
  'england': 'united kingdom',
  'u.k.': 'united kingdom',
  // United Arab Emirates
  'uae': 'united arab emirates',
  'u.a.e.': 'united arab emirates',
  // Russia
  'russian federation': 'russia',
  // China
  'prc': 'china',
  "people's republic of china": 'china',
  // South Korea
  'republic of korea': 'south korea',
  'korea': 'south korea',
  // North Korea
  "democratic people's republic of korea": 'north korea',
  "dprk": 'north korea',
  // Congo
  'congo': 'republic of the congo',
  'drc': 'democratic republic of the congo',
  'congo-kinshasa': 'democratic republic of the congo',
  'congo-brazzaville': 'republic of the congo',
  'dr congo': 'democratic republic of the congo',
  // Ivory Coast
  "cote d'ivoire": 'ivory coast',
  'côte d\'ivoire': 'ivory coast',
  // Czech Republic
  'czechia': 'czech republic',
  // Turkey
  'türkiye': 'turkey',
  'turkiye': 'turkey',
  // Eswatini (formerly Swaziland)
  'swaziland': 'eswatini',
  // Myanmar (formerly Burma)
  'burma': 'myanmar',
  // Cabo Verde
  'cape verde': 'cabo verde',
  // Timor-Leste
  'east timor': 'timor-leste',
  // North Macedonia
  'macedonia': 'north macedonia',
  // Laos
  "lao people's democratic republic": 'laos',
  'lao pdr': 'laos',
  // Brunei
  'brunei darussalam': 'brunei',
  // Micronesia
  'federated states of micronesia': 'micronesia',
  'fsm': 'micronesia',
  // Moldova
  'republic of moldova': 'moldova',
  // Vatican
  'holy see': 'vatican city',
  'vatican': 'vatican city',
  // Palestine
  'state of palestine': 'palestine',
  'west bank': 'palestine',
  // Iran
  'islamic republic of iran': 'iran',
  'persia': 'iran',
  // Bolivia
  'plurinational state of bolivia': 'bolivia',
  // Venezuela
  'bolivarian republic of venezuela': 'venezuela',
  // Tanzania
  'united republic of tanzania': 'tanzania',
  // Syria
  'syrian arab republic': 'syria',
  // Sao Tome and Principe
  'são tomé and príncipe': 'sao tome and principe',
  'são tomé': 'sao tome and principe',
  // Samoa
  'western samoa': 'samoa',
};

// =====================================================================
// AI CATEGORY CACHES  (lowercase → display name)
// Pre-seeded with known-valid entries so common answers skip the API.
// New valid entries discovered at runtime are added to the Map.
// =====================================================================

const FRUITS_SEED: string[] = [
  // Common western
  'Apple', 'Banana', 'Pear', 'Peach', 'Plum', 'Cherry', 'Apricot', 'Nectarine',
  'Grape', 'Strawberry', 'Blueberry', 'Raspberry', 'Blackberry', 'Cranberry',
  'Gooseberry', 'Currant', 'Red Currant', 'Black Currant', 'White Currant',
  'Boysenberry', 'Loganberry', 'Marionberry', 'Tayberry', 'Wineberry',
  'Huckleberry', 'Lingonberry', 'Cloudberry', 'Dewberry', 'Serviceberry',
  'Salmonberry', 'Thimbleberry', 'Elderberry', 'Bilberry', 'Mulberry',
  'Pomegranate', 'Fig', 'Date', 'Persimmon', 'Quince', 'Medlar',
  'Sloe', 'Damson', 'Greengage', 'Mirabelle', 'Crabapple',
  // Citrus
  'Orange', 'Lemon', 'Lime', 'Grapefruit', 'Mandarin', 'Tangerine',
  'Clementine', 'Pomelo', 'Blood Orange', 'Cara Cara Orange', 'Yuzu',
  'Kumquat', 'Calamansi', 'Ugli Fruit', 'Citron', 'Bergamot',
  // Melons
  'Watermelon', 'Cantaloupe', 'Honeydew', 'Casaba Melon', 'Crenshaw Melon',
  'Galia Melon', 'Canary Melon', 'Persian Melon', 'Santa Claus Melon', 'Sprite Melon',
  // Tropical
  'Mango', 'Pineapple', 'Papaya', 'Guava', 'Coconut', 'Avocado',
  'Lychee', 'Rambutan', 'Mangosteen', 'Longan', 'Jackfruit', 'Durian',
  'Star Fruit', 'Dragon Fruit', 'Passion Fruit', 'Soursop', 'Cherimoya',
  'Tamarind', 'Breadfruit', 'Langsat', 'Salak', 'Ackee', 'Acai',
  'Pitaya', 'Carambola', 'Feijoa', 'Tamarillo', 'Naranjilla', 'Babaco',
  'Rollinia', 'Marang', 'Cempedak', 'Guanabana',
  // Other notable
  'Kiwi', 'Cape Gooseberry', 'Physalis', 'Jujube', 'Loquat',
  'Sea Buckthorn', 'Aronia', 'Chokeberry', 'Goumi', 'Cornelian Cherry',
  'Hackberry', 'Goji Berry', 'Wolfberry', 'Prickly Pear', 'Horned Melon',
  'Kiwano', 'Finger Lime', 'Surinam Cherry', 'Natal Plum', 'Santol',
  'Rose Apple', 'Java Plum', 'Paw Paw', 'Sapodilla', 'Lucuma',
  'Jaboticaba', 'Noni', 'Mamey Sapote', 'Black Sapote', 'White Sapote',
  'Canistel', 'Wampee', 'Plantain', 'Tomato',
];

export const FRUITS_CACHE = new Map<string, string>(
  FRUITS_SEED.map(f => [f.toLowerCase(), f]),
);

const SPORTS_SEED: string[] = [
  // Ball sports
  'Soccer', 'Football', 'Basketball', 'Baseball', 'Softball', 'Volleyball',
  'Cricket', 'Rugby', 'Rugby Union', 'Rugby League', 'American Football',
  'Australian Rules Football', 'Gaelic Football', 'Hurling', 'Camogie',
  'Lacrosse', 'Field Hockey', 'Ice Hockey', 'Roller Hockey', 'Floorball',
  'Handball', 'Water Polo', 'Polo', 'Netball', 'Sepak Takraw',
  'Dodgeball', 'Kickball', 'Tetherball', 'Futsal',
  // Racket sports
  'Tennis', 'Badminton', 'Table Tennis', 'Squash', 'Racquetball',
  'Pickleball', 'Paddle Tennis', 'Platform Tennis', 'Real Tennis',
  // Combat
  'Boxing', 'Wrestling', 'Judo', 'Karate', 'Taekwondo', 'Fencing',
  'Brazilian Jiu-Jitsu', 'Muay Thai', 'Kickboxing', 'MMA',
  'Mixed Martial Arts', 'Sambo', 'Sumo', 'Arm Wrestling',
  'Capoeira', 'Krav Maga', 'Hapkido', 'Aikido', 'Kung Fu',
  'Wushu', 'Savate', 'Greco-Roman Wrestling', 'Freestyle Wrestling',
  // Athletics / Track & Field
  'Running', 'Marathon', 'Half Marathon', 'Sprinting', 'Hurdles',
  'Steeplechase', 'Long Jump', 'High Jump', 'Triple Jump', 'Pole Vault',
  'Shot Put', 'Javelin', 'Discus', 'Hammer Throw', 'Race Walking',
  'Decathlon', 'Heptathlon', 'Pentathlon', 'Triathlon', 'Duathlon',
  'Cross-Country Running', 'Trail Running', 'Ultramarathon', 'Orienteering',
  // Aquatic
  'Swimming', 'Diving', 'Synchronized Swimming', 'Artistic Swimming',
  'Open Water Swimming', 'Surfing', 'Windsurfing', 'Kitesurfing',
  'Wakeboarding', 'Waterskiing', 'Rowing', 'Canoeing', 'Kayaking', 'Sailing',
  'Freediving', 'Underwater Hockey', 'Dragon Boat Racing',
  // Winter
  'Skiing', 'Alpine Skiing', 'Cross-Country Skiing', 'Ski Jumping',
  'Biathlon', 'Snowboarding', 'Freestyle Skiing', 'Nordic Combined',
  'Speed Skating', 'Figure Skating', 'Short Track Speed Skating',
  'Ice Dancing', 'Bobsled', 'Bobsleigh', 'Luge', 'Skeleton', 'Curling', 'Bandy',
  // Gymnastics
  'Gymnastics', 'Artistic Gymnastics', 'Rhythmic Gymnastics',
  'Trampoline', 'Acrobatic Gymnastics', 'Parkour', 'Tumbling',
  // Cycling
  'Cycling', 'Road Cycling', 'Mountain Biking', 'BMX', 'Track Cycling',
  'Cyclocross', 'Downhill Mountain Biking', 'Longboarding',
  // Equestrian
  'Show Jumping', 'Dressage', 'Eventing', 'Horse Racing',
  'Barrel Racing', 'Rodeo', 'Polo',
  // Target / Aim
  'Archery', 'Shooting', 'Darts', 'Bocce', 'Petanque', 'Bowling',
  'Golf', 'Mini Golf', 'Disc Golf', 'Croquet', 'Shuffleboard', 'Cornhole',
  // Extreme / Action
  'Rock Climbing', 'Bouldering', 'Speed Climbing', 'Skateboarding',
  'Inline Skating', 'Roller Derby', 'Skydiving', 'Base Jumping',
  'Hang Gliding', 'Paragliding', 'Bungee Jumping',
  'Motocross', 'Supercross', 'Superbike Racing', 'Karting',
  'Motor Racing', 'Formula One', 'NASCAR', 'Rally Racing',
  'Paddleboarding', 'Kiteboarding',
  // Strength / Fitness
  'Weightlifting', 'Olympic Weightlifting', 'Powerlifting', 'Strongman',
  'Bodybuilding', 'CrossFit',
  // Strategy / Table
  'Chess', 'Billiards', 'Pool', 'Snooker',
  // Other
  'Ultimate Frisbee', 'Flag Football', 'Touch Football', 'Beach Volleyball',
  'Beach Soccer', 'Beach Handball', 'Footvolley',
  'Kabaddi', 'Korfball', 'Jai Alai', 'Tug of War',
  'Wheelchair Basketball', 'Wheelchair Tennis', 'Boccia', 'Goalball',
  'Modern Pentathlon', 'Canoe Polo',
];

export const SPORTS_CACHE = new Map<string, string>(
  [...new Set(SPORTS_SEED)].map(s => [s.toLowerCase(), s]),
);

const ANIMALS_SEED: string[] = [
  // Domestic
  'Dog', 'Cat', 'Horse', 'Cow', 'Pig', 'Sheep', 'Goat', 'Rabbit', 'Chicken', 'Duck',
  'Turkey', 'Goose', 'Donkey', 'Mule', 'Llama', 'Alpaca', 'Vicuna', 'Guanaco',
  // Big cats
  'Lion', 'Tiger', 'Leopard', 'Cheetah', 'Jaguar', 'Cougar', 'Puma', 'Snow Leopard',
  'Clouded Leopard', 'Lynx', 'Bobcat', 'Ocelot', 'Serval', 'Caracal', 'Wildcat',
  // Bears
  'Brown Bear', 'Black Bear', 'Polar Bear', 'Grizzly Bear', 'Sun Bear', 'Sloth Bear',
  'Spectacled Bear', 'Giant Panda', 'Red Panda',
  // Canids
  'Wolf', 'Red Fox', 'Arctic Fox', 'Fennec Fox', 'Coyote', 'Dingo', 'Jackal',
  'African Wild Dog', 'Hyena', 'Spotted Hyena', 'Striped Hyena', 'Aardwolf',
  // Primates
  'Gorilla', 'Chimpanzee', 'Bonobo', 'Orangutan', 'Gibbon', 'Siamang', 'Baboon',
  'Mandrill', 'Macaque', 'Capuchin', 'Spider Monkey', 'Howler Monkey', 'Lemur',
  'Marmoset', 'Tamarin', 'Proboscis Monkey', 'Gelada', 'Colobus Monkey', 'Tarsier',
  // Elephants
  'Elephant', 'African Elephant', 'Asian Elephant',
  // Large herbivores
  'Giraffe', 'Okapi', 'Zebra', 'Hippo', 'Rhinoceros', 'White Rhinoceros',
  'Black Rhinoceros', 'Tapir', 'Warthog', 'Peccary',
  // Deer & bovids
  'Moose', 'Elk', 'Caribou', 'Reindeer', 'Deer', 'White-tailed Deer', 'Red Deer',
  'Fallow Deer', 'Roe Deer', 'Bison', 'Buffalo', 'Yak', 'Water Buffalo',
  'Gaur', 'Camel', 'Dromedary', 'Bactrian Camel',
  // Antelope family
  'Impala', 'Gazelle', 'Springbok', 'Wildebeest', 'Gnu', 'Oryx', 'Gemsbok',
  'Eland', 'Kudu', 'Nyala', 'Waterbuck', 'Hartebeest', 'Sable Antelope',
  // Marine mammals
  'Whale', 'Blue Whale', 'Humpback Whale', 'Orca', 'Sperm Whale', 'Beluga',
  'Narwhal', 'Bowhead Whale', 'Fin Whale', 'Minke Whale', 'Gray Whale', 'Sei Whale',
  'Dolphin', 'Bottlenose Dolphin', 'Common Dolphin', 'Spinner Dolphin', 'Porpoise',
  'Seal', 'Harbor Seal', 'Elephant Seal', 'Leopard Seal', 'Fur Seal',
  'Sea Lion', 'Walrus', 'Manatee', 'Dugong', 'Sea Otter',
  // Rodents
  'Squirrel', 'Red Squirrel', 'Gray Squirrel', 'Flying Squirrel', 'Beaver',
  'Capybara', 'Porcupine', 'Hamster', 'Gerbil', 'Rat', 'Mouse', 'Vole',
  'Marmot', 'Prairie Dog', 'Groundhog', 'Chinchilla', 'Guinea Pig', 'Chipmunk',
  'Muskrat', 'Nutria', 'Naked Mole Rat',
  // Mustelids & small carnivores
  'Otter', 'River Otter', 'Weasel', 'Stoat', 'Ermine', 'Mink', 'Ferret',
  'Polecat', 'Pine Marten', 'Fisher', 'Wolverine', 'Badger', 'Honey Badger',
  'Skunk', 'Mongoose', 'Meerkat', 'Civet', 'Genet', 'Binturong', 'Fossa',
  // Insectivores & odd mammals
  'Hedgehog', 'Mole', 'Shrew', 'Bat', 'Fruit Bat', 'Vampire Bat',
  'Pangolin', 'Armadillo', 'Sloth', 'Two-toed Sloth', 'Three-toed Sloth',
  'Anteater', 'Giant Anteater', 'Aardvark', 'Hare', 'Pika',
  // Marsupials & monotremes
  'Kangaroo', 'Red Kangaroo', 'Wallaby', 'Wombat', 'Koala', 'Platypus', 'Echidna',
  'Possum', 'Opossum', 'Quoll', 'Tasmanian Devil', 'Quokka', 'Numbat',
  'Bandicoot', 'Sugar Glider',
  // Raptors
  'Eagle', 'Bald Eagle', 'Golden Eagle', 'Harpy Eagle', 'Hawk', 'Red-tailed Hawk',
  'Falcon', 'Peregrine Falcon', 'Kestrel', 'Gyrfalcon', 'Merlin',
  'Owl', 'Barn Owl', 'Great Horned Owl', 'Snowy Owl', 'Barred Owl', 'Tawny Owl',
  'Osprey', 'Vulture', 'Turkey Vulture', 'Condor', 'California Condor', 'Andean Condor',
  'Harrier', 'Kite', 'Red Kite', 'Buzzard', 'Secretary Bird',
  // Wading & water birds
  'Pelican', 'Flamingo', 'Heron', 'Great Blue Heron', 'Egret', 'Stork', 'White Stork',
  'Crane', 'Whooping Crane', 'Ibis', 'Spoonbill', 'Cormorant', 'Gannet',
  'Frigatebird', 'Albatross', 'Petrel', 'Booby', 'Blue-footed Booby',
  'Swan', 'Mute Swan', 'Mallard', 'Teal', 'Wood Duck', 'Eider', 'Canada Goose',
  // Penguins & seabirds
  'Penguin', 'Emperor Penguin', 'Gentoo Penguin', 'Puffin', 'Seagull', 'Tern',
  'Arctic Tern', 'Skua',
  // Parrots & tropical
  'Parrot', 'African Grey Parrot', 'Macaw', 'Blue-and-yellow Macaw', 'Scarlet Macaw',
  'Cockatoo', 'Cockatiel', 'Budgerigar', 'Parakeet', 'Lorikeet', 'Lovebird',
  'Kea', 'Kakapo', 'Toucan', 'Hornbill', 'Kingfisher', 'Bee-eater', 'Hoopoe',
  // Flightless & gamebirds
  'Ostrich', 'Emu', 'Cassowary', 'Rhea', 'Kiwi',
  'Peacock', 'Pheasant', 'Partridge', 'Quail', 'Grouse',
  // Pigeons & cuckoos
  'Pigeon', 'Dove', 'Mourning Dove', 'Turtledove', 'Cuckoo', 'Roadrunner',
  // Woodpeckers & others
  'Woodpecker', 'Pileated Woodpecker',
  // Songbirds
  'Robin', 'American Robin', 'Sparrow', 'House Sparrow', 'Finch', 'Goldfinch',
  'Wren', 'Swallow', 'Barn Swallow', 'Swift', 'Martin', 'Warbler', 'Blackbird',
  'Thrush', 'Song Thrush', 'Bluebird', 'Starling', 'Cardinal', 'Northern Cardinal',
  'Blue Jay', 'Jay', 'Crow', 'Raven', 'Magpie', 'Jackdaw', 'Rook',
  'Hummingbird', 'Sunbird', 'Nuthatch', 'Chickadee', 'Blue Tit', 'Great Tit',
  'Canary', 'Nightingale', 'Lyrebird', 'Bird of Paradise',
  // Lizards
  'Iguana', 'Green Iguana', 'Gecko', 'Leopard Gecko', 'Chameleon', 'Veiled Chameleon',
  'Komodo Dragon', 'Monitor Lizard', 'Nile Monitor', 'Gila Monster', 'Frilled Lizard',
  'Blue-tongued Skink', 'Skink', 'Anole', 'Bearded Dragon', 'Basilisk', 'Agama',
  'Thorny Devil', 'Glass Lizard',
  // Snakes
  'Python', 'Ball Python', 'Burmese Python', 'Reticulated Python',
  'Boa Constrictor', 'Anaconda', 'Green Anaconda',
  'Cobra', 'King Cobra', 'Egyptian Cobra', 'Spitting Cobra',
  'Mamba', 'Black Mamba', 'Green Mamba',
  'Rattlesnake', 'Diamondback Rattlesnake', 'Viper', 'Gaboon Viper', 'Puff Adder',
  'King Snake', 'Corn Snake', 'Garter Snake', 'Milk Snake', 'Boomslang',
  'Cottonmouth', 'Copperhead', 'Coral Snake', 'Sidewinder', 'Bushmaster',
  // Crocodilians & turtles
  'Crocodile', 'Nile Crocodile', 'Saltwater Crocodile', 'American Alligator',
  'Chinese Alligator', 'Alligator', 'Caiman', 'Black Caiman', 'Gharial', 'Tuatara',
  'Tortoise', 'Galapagos Tortoise', 'Sea Turtle', 'Green Sea Turtle',
  'Leatherback Turtle', 'Loggerhead Turtle', 'Hawksbill Turtle',
  'Box Turtle', 'Snapping Turtle', 'Painted Turtle',
  // Amphibians
  'Frog', 'Tree Frog', 'Red-eyed Tree Frog', 'Bullfrog', 'American Bullfrog',
  'Goliath Frog', 'Poison Dart Frog', 'Golden Poison Frog',
  'Toad', 'Common Toad', 'American Toad', 'Cane Toad', 'Fire-bellied Toad',
  'Salamander', 'Tiger Salamander', 'Fire Salamander', 'Giant Salamander',
  'Newt', 'Great Crested Newt', 'Axolotl', 'Mudpuppy', 'Hellbender', 'Caecilian',
  // Fish - Freshwater
  'Salmon', 'Atlantic Salmon', 'Chinook Salmon', 'Trout', 'Rainbow Trout', 'Brown Trout',
  'Bass', 'Largemouth Bass', 'Striped Bass', 'Pike', 'Northern Pike', 'Perch',
  'Walleye', 'Catfish', 'Carp', 'Koi', 'Goldfish', 'Tilapia', 'Eel',
  'Moray Eel', 'Piranha', 'Clownfish', 'Angelfish', 'Guppy', 'Neon Tetra',
  'Betta Fish', 'Zebrafish', 'Sturgeon', 'Paddlefish', 'Lamprey',
  // Fish - Marine
  'Tuna', 'Bluefin Tuna', 'Cod', 'Atlantic Cod', 'Mackerel', 'Herring', 'Sardine',
  'Swordfish', 'Marlin', 'Sailfish', 'Snapper', 'Grouper', 'Flounder', 'Halibut',
  'Sole', 'Barracuda', 'Lionfish', 'Puffer Fish', 'Flying Fish', 'Seahorse',
  'Ocean Sunfish', 'Mudskipper',
  // Sharks & rays
  'Shark', 'Great White Shark', 'Hammerhead Shark', 'Bull Shark', 'Tiger Shark',
  'Whale Shark', 'Mako Shark', 'Nurse Shark', 'Lemon Shark',
  'Ray', 'Manta Ray', 'Stingray', 'Spotted Eagle Ray',
  // Insects
  'Ant', 'Fire Ant', 'Leafcutter Ant', 'Army Ant', 'Carpenter Ant',
  'Bee', 'Honeybee', 'Bumblebee', 'Mason Bee',
  'Wasp', 'Yellow Jacket', 'Hornet', 'Paper Wasp',
  'Butterfly', 'Monarch Butterfly', 'Swallowtail', 'Morpho Butterfly', 'Painted Lady',
  'Moth', 'Luna Moth', 'Atlas Moth', 'Hawk Moth', 'Silk Moth',
  'Beetle', 'Ladybug', 'Firefly', 'Stag Beetle', 'Rhinoceros Beetle', 'Scarab Beetle',
  'Titan Beetle', 'Dung Beetle', 'Longhorn Beetle', 'Click Beetle',
  'Cricket', 'Grasshopper', 'Locust', 'Desert Locust',
  'Cicada', 'Dragonfly', 'Damselfly', 'Mosquito', 'Housefly', 'Horsefly',
  'Termite', 'Cockroach', 'Praying Mantis', 'Stick Insect', 'Leaf Insect',
  'Earwig', 'Silverfish', 'Flea', 'Aphid', 'Weevil', 'Mayfly',
  // Arachnids
  'Spider', 'Tarantula', 'Black Widow', 'Brown Recluse', 'Wolf Spider',
  'Jumping Spider', 'Orb Weaver', 'Funnel Web Spider', 'Trapdoor Spider',
  'Scorpion', 'Emperor Scorpion', 'Deathstalker', 'Tick', 'Mite', 'Daddy Longlegs',
  // Crustaceans
  'Crab', 'Hermit Crab', 'Horseshoe Crab', 'Fiddler Crab', 'King Crab',
  'Blue Crab', 'Dungeness Crab', 'Coconut Crab', 'Spider Crab',
  'Lobster', 'American Lobster', 'Spiny Lobster',
  'Shrimp', 'Mantis Shrimp', 'Tiger Shrimp', 'Prawn', 'Crayfish',
  'Barnacle', 'Krill', 'Giant Isopod',
  // Mollusks
  'Octopus', 'Giant Pacific Octopus', 'Blue-ringed Octopus',
  'Squid', 'Giant Squid', 'Colossal Squid',
  'Cuttlefish', 'Nautilus',
  'Snail', 'Giant African Snail', 'Cone Snail', 'Slug', 'Nudibranch',
  'Mussel', 'Clam', 'Giant Clam', 'Oyster', 'Scallop', 'Abalone', 'Conch', 'Chiton',
  // Other invertebrates
  'Jellyfish', 'Box Jellyfish', 'Lion\'s Mane Jellyfish', 'Portuguese Man o\' War',
  'Starfish', 'Brittle Star', 'Sea Urchin', 'Sand Dollar', 'Sea Cucumber',
  'Sea Anemone', 'Coral', 'Earthworm', 'Leech', 'Centipede', 'Millipede', 'Pill Bug',
];

export const ANIMALS_CACHE = new Map<string, string>(
  [...new Set(ANIMALS_SEED)].map(a => [a.toLowerCase(), a]),
);

// =====================================================================
// CATEGORY TYPES & CONFIG
// =====================================================================
export type Category =
  | 'US States'
  | 'Countries of the World'
  | 'Fruits'
  | 'Sports'
  | 'Animals'
  | 'Software Engineering Students';

export const CATEGORIES: Category[] = [
  'US States',
  'Countries of the World',
  'Fruits',
  'Sports',
  'Animals',
  'Software Engineering Students',
];

export type ValidationMethod = 'list' | 'ai';

/**
 * Resolves an already-normalized (lowercase, trimmed) answer to its canonical
 * form so that aliases like "usa", "america", "united states" all map to the
 * same key for deduplication purposes.
 */
export function resolveCanonical(normalized: string, category: Category): string {
  if (category === 'US States') return US_STATE_ALIASES[normalized] ?? normalized;
  if (category === 'Countries of the World') return COUNTRY_ALIASES[normalized] ?? normalized;
  return normalized;
}

export const VALIDATION_METHOD: Record<Category, ValidationMethod> = {
  'US States': 'list',
  'Countries of the World': 'list',
  'Fruits': 'ai',
  'Sports': 'ai',
  'Animals': 'ai',
  'Software Engineering Students': 'list',
};
