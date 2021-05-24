const fr = {
	TOOLBAR: {
		NAME: "Contrôle Eva",
		INI: "Démarrer",
		INTERACTION: "Interaction",
		SCRIPT: "Script",
		SCRIPTS: "Scripts",
		DATA: "Données",
		AUDIOS: "Audios",
		LANGUAGE: "Langue du Robot",
		VOICE: "Voix",
		LISTEN: "Ecouter",
		LED: "Led",
		MOVEMENT: "Mouvement",
		WOO: "Magicien d'Oz",
		CONFIG: "Configurations",
		SOCIAL_ROBOT: "Robot social",
		SERVICES: "Services"
	},
	LANG: {
		MENU: "Langue",
		ES: "Espagnol",
		EN: "Anglais",
		PR: "Portugues",
		FR: "Français"
	},
	DATATABLE: {
		SHOW: "Affiche",
		SEARCH: "Rechercher",
		SHOWING: "Affichage",
		TO: "a",
		OF: "de",
		ENTRIES: "enregistrements",
		PREVIOUS: "Précédent",
		NEXT: "Suivant"
	},
	AUDIO: {
		TITLE: "liste des auditions",
		FORMAT: "Forme",
		DURATION: "Durée",
		ADD: "Ajouter Audio",
		UPLOAD: "Lâchez les fichiers ici ou cliquez pour les télécharger.",
		NOTIFY: {
			DELETE: {
				SUCCESS: "L'auteur a été supprimé."
			},
			ERROR: "Une erreur s'est produite lors du traitement de votre demande."
		}
	},
	CLOUD: {
		TITLE: "Services",
		SERVICE: "Service",
		VAR: "Critères",
		VALUE: "Valeur",
		STATUS: "État",
		EDIT: "Editer",
		NOTIFY: {
			UPDATE: {
				SUCCESS: "Données d'identification du service mises à jour."
			},
			DELETE: {
				SUCCESS: "L'identification du service a été supprimée avec succès."
			}
		}
	},
	CONFIG: {
		TITLE: "Configuration",
		VOICE: "Voix",
		VOICELED: "Animation Voz",
		LISTEN: "Ecouter",
		LISTENLED: "Animation Ecouter",
		SPEAK_LISTEN: "Parler et écouter",
		LED_ANIM: "Animation Led",
		MOV: "Mouvement",
		NOTIFY: {
			UPDATE: {
				SUCCESS: "La configuration a été appliquée.",
				ERROR: "Une erreur s'est produite lors de la tentative d'application de la configuration."
			}
		}
	},
	CONTROL: {
		WARNING: "Soyeuse",
		INTERACTIONS: "Interactions",
		EXPORT: "Exportation",
		CONTROL_SCRIPT: "Commande de script",
		SCRIPTS: "Scripts"
	},
	INTERACTION: {
		TITLE: "Liste des Interactions",
		NODES: "Nodes",
		ADD_INT: "Ajouter une Interaction",
		IMPORT: "Importer",
		IMPORT_INT: "Importer l'interaction",
		NODE: "Noeud",
		TYPE: "Type",
		DOWNLOAD: "Déchargement",
		SAVE: "Enregistrer",
		UPDATE: "Mettre à jour",
		UPDATE_FINISH: "Mise à jour et arrêt",
		REFRESH: "Réfraiser",
		VOICE: "Voix",
		SPEAK: "Parler",
		LISTEN: "Ecouter",
		EMOTION: "Émotion",
		MOV: "Mouvement",
		LED: "Leds",
		SOUND: "Audio",
		FOR: "Cycle",
		IF: "Statut",
		IF_DESC: "Vous utilisez #nombre_contador pour comparer cette valeur.",
		WAIT: "Attendre",
		INT: "Interaction",
		SCRIPT: "Script",
		SCRIPT_DESC: "Ce noeud inclut la fonction de discussion, en lisant la première zone de l'élément de script en cours d'exécution.",
		COUNTER: "Compteur",
		COUNTER_OPTS: {
			VALUE: "Valeur",
			OPERATION: "Opération",
			SUM: "Montant",
			SUBTRACTION: "Resta",
			MULTIPLICATION: "Multiplication",
			DIVISION: "Division",
			ASSIGN: "Affecter"
		},
		API: "Api Rest",
		DIALOGFLOW: "Dialogflow",
		TRANSLATE: "Traduire",
		RANDOM: "Aléatoire",
		GROUP: "Groupe",
		NONE: "Néant",
		PREVIOUS: "Précédent",
		SPEED: "Vitesse",
		LEVEL: "Niveau",
		ONLY_EYES: "Ojos uniquement",
		INCREMENTAL: "Incrémentielle",
		DIALOGUE: "Dialogue",
		DIALOGUE_DESC: "Utilisez '$' pour inclure la dernière réponse,' $1 'pour inclure la première et' $-1 ' pour inclure l'avant-dernière réponse. Utilisez '%' si vous disposez d'un noeud type 'Script' avant d'inclure le 2de champ ou '%1' pour indiquer la zone 1. Utilisez ' /' pour séparer plusieurs phrases (le robot ne le dira qu'une seule aléatoire). Si vous utilisez un compteur, vous pouvez utiliser #contador pour inclure la valeur de ce compteur.",
		TEXT_TO_SPEAK: "Texte à Decir",
		SERVICE: "Service",
		LANGUAGE: "Langue",
		GET: "Extraire",
		ALL: "Tout",
		TIME: "Temps",
		TIME_TO_WAIT: "Temps d'attente en ms",
		ITERATIONS: "Itérations",
		ITERATIONS_DESC: "Utilise la valeur '-1' pour que les itérations correspondent aux éléments du script.",
		AMOUNT_ITERATIONS: "Quantité d'Itérations",
		COMPARISON: {
			LABEL: "Comparaison",
			EXACT: "Exact",
			PHONETIC: "Fonétique",
			INCLUDE: "Inclut",
			MATH: "Mathématiques"
		},
		DEFAULT: "Par défaut",
		API_REST: {
			VERSION: "Version",
			SERVER: "Serveur",
			QUERY: "Requête",
			PORT: "Port"
		},
		PROYECT: "Projet",
		PROYECT_NAME: "Nom du projet",
		SOURCE: "Langue source"
	},
	LED: {
		TITLE: "Liste des Animations led",
		BASE: "Animation de base",
		MODAL: "Animation Led",
		COLOR: "Couleur",
		LED: "Led",
		NUM: "Num",
		TIME: "Temps",
		MS: "Millisecondes",
		NOTIFY: {
			POST: {
				SUCCESS: "L'animation led a été créée."
			},
			CLONE: {
				SUCCESS: "L'animation a été mise en miroir correctement."
			},
			UPDATE: {
				SUCCESS: "L'animation a été correctement mise à jour."
			},
			DELETE: {
				SUCCESS: "L'animation a été supprimée avec succès."
			},
			ERROR: "Une erreur s'est produite lors du traitement de votre demande."
		}
	},
	LISTEN: {
		TITLE: "Liste des modèles vocaux",
		MODAL: "Modèle vocal",
		LANGUAGE: "Langue",
		CODE: "Code",
		NOTIFY: {
			POST: {
				SUCCESS: "Le modèle vocal a été créé."
			},
			UPDATE: {
				SUCCESS: "Modèle de voix mis à jour."
			},
			DELETE: {
				SUCCESS: "Le modèle vocal a été supprimé."
			},
			ERROR: "Une erreur s'est produite lors du traitement de votre demande."
		}
	},
	MOVEMENT: {
		TITLE: "Liste des mouvements",
		MODAL: "Mouvement",
		CODE: "Code",
		ACTIONS: "Actions",
		NOTIFY: {
			POST: {
				SUCCESS: "Le déplacement a été créé."
			},
			UPDATE: {
				SUCCESS: "La mise à jour du Mouvement"
			},
			DELETE: {
				SUCCESS: "Le déplacement a été supprimé."
			},
			ERROR: "Une erreur s'est produite lors du traitement de votre demande."
		}
	},
	SCRIPT: {
		TITLE: "Liste des scripts",
		MODAL: "Script",
		QTY: "Montant",
		NOTIFY: {
			POST: {
				SUCCESS: "Script créé avec succès."
			},
			UPDATE: {
				SUCCESS: "Script mis à jour."
			},
			DELETE: {
				SUCCESS: "Le script a été supprimé."
			},
			ERROR: "Une erreur s'est produite lors du traitement de votre demande."
		}
	},
	SCRIPT_DATA: {
		TITLE: "Données de script",
		SCRIPT: "Script",
		FIELD: "Champ",
		NOTIFY: {
			POST: {
				SUCCESS: "Données agrégées avec succès."
			},
			UPDATE: {
				SUCCESS: "Données mises à jour."
			},
			DELETE: {
				SUCCESS: "La suppression des données a abouti."
			},
			ERROR: "Une erreur s'est produite lors du traitement de votre demande."
		}
	},
	VOICE: {
		TITLE: "liste des voix",
		LANGUAGE: "Langue",
		CODE: "Code",
		VOICE: "Voix",
		NOTIFY: {
			POST: {
				SUCCESS: "Voix agrégée avec succès."
			},
			UPDATE: {
				SUCCESS: "Voix mise à jour."
			},
			DELETE: {
				SUCCESS: "Voix effacée avec succès."
			},
			ERROR: "Une erreur s'est produite lors du traitement de votre demande."
		}
	},
	WOO: {
		PHRASE: "Phrase",
		VOICE: "Voix",
		CUSTOM_PHRASE: "Phrase Personnalisé",
		SEND: "Envoyer",
		MOVEMENT: "Mouvement",
		WOO: "Magicien d'Oz",
		COMMAND: "Commande",
		SEQUENCE: "Séquence",
		SCRIPT_DATA: "Données de script",
		TYPE: "Type",
		DESCRIPTION: "Description",
		ORDER: "Ordre",
		SPEAK: "Parler",
		SOUND: "Sonnet",
		LED: "Led",
		TEXT: "Texte",
		AUDIO: "Audio",
		NONE: "Néant",
		NOTIFY: {
			UPDATE: {
				SUCCESS: "Interaction enregistrée avec succès.",
				ERROR: "Une erreur s'est produite lors de la sauvegarde de l'interaction."
			},
			ERROR: "Une erreur s'est produite lors du traitement de votre demande."
		}
	},
	COMMON: {
		NAME: "Nom",
		OPTIONS: "Options",
		CLOSE: "Fermer",
		SAVE: "Sauvegarde",
		UPDATE: "Mettre à jour",
		ADD: "Ajouter",
		EDIT: "Editer"
	},
	EMOTION_TYPE: {
		NEUTRAL: "Neutral",
		JOY: "Joie",
		SURPRISE: "Surprise",
		SAD: "Tristesse",
		ANGER: "Ira"
	}
}