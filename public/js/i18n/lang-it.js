const it = {
	TOOLBAR: {
		NAME: "Controllo di Eva",
		INI: "Inizio",
		INTERACTION: "Interazione",
		SCRIPT: "Script",
		SCRIPTS: "Script",
		DATA: "Dati",
		AUDIOS: "Audios",
		LANGUAGE: "Lingue dei robot",
		VOICE: "Voce",
		LISTEN: "Ascolta",
		LED: "Led",
		MOVEMENT: "Movimento",
		WOO: "Procedura guidata di Oz",
		CONFIG: "Configurazioni",
		SOCIAL_ROBOT: "Robot sociale",
		SERVICES: "Servizi",
		IMGS: "Immagini"
	},
	LANG: {
		MENU: "Lingua",
		ES: "Spagnolo",
		EN: "Inglese",
		PT: "Portoghese",
		FR: "Francese",
		IT: "Italiano",
		JA: "Giapponese"
	},
	DATATABLE: {
		SHOW: "Mostra",
		SEARCH: "Ricerca",
		SHOWING: "Visualizzazione",
		TO: "a",
		OF: "di",
		ENTRIES: "record",
		PREVIOUS: "Precedente",
		NEXT: "Successivo"
	},
	AUDIO: {
		TITLE: "Elenco degli Audisti",
		FORMAT: "Formato",
		DURATION: "Durata",
		ADD: "Aggiungi Audio",
		UPLOAD: "Rilasciare i file qui o clicca per caricarli.",
		NOTIFY: {
			DELETE: {
				SUCCESS: "Audio rimosso correttamente."
			},
			ERROR: "Si è verificato un errore durante l'elaborazione della richiesta."
		}
	},
	CLOUD: {
		TITLE: "Servizi",
		SERVICE: "Servizio",
		VAR: "Variabile",
		VALUE: "Valore",
		STATUS: "Stato",
		EDIT: "Modifica",
		NOTIFY: {
			UPDATE: {
				SUCCESS: "Servizio Credenziale aggiornato correttamente."
			},
			DELETE: {
				SUCCESS: "Credenziale di servizio rimossa correttamente."
			}
		},
		TELEPHONE: "Numero di telefono",
		CODE: "Codice",
		NEXT: "Successivo",
		SEND: "Invia"
	},
	CONFIG: {
		TITLE: "Configurazione",
		VOICE: "Voce",
		VOICELED: "Animazione vocale",
		LISTEN: "Ascolta",
		LISTENLED: "Animazione Ascolta",
		SPEAK_LISTEN: "Parla e ascolta",
		LED_ANIM: "Animazione guidata",
		MOV: "Movimento",
		NOTIFY: {
			UPDATE: {
				SUCCESS: "La configurazione è stata applicata correttamente.",
				ERROR: "Si è verificato un errore durante il tentativo di applicare la configurazione."
			}
		}
	},
	CONTROL: {
		WARNING: "Assistenza",
		INTERACTIONS: "Interazioni",
		EXPORT: "Esportazione",
		CONTROL_SCRIPT: "Controllo script",
		SCRIPTS: "Script"
	},
	INTERACTION: {
		TITLE: "Elenco delle Interazioni",
		NODES: "Nodi",
		ADD_INT: "Nuova interazione",
		IMPORT: "Importa",
		IMPORT_INT: "Importazione dell'interazione",
		NODE: "Nodo",
		TYPE: "Tipo",
		DOWNLOAD: "Scarica",
		SAVE: "Salva",
		UPDATE: "Aggiornamento",
		UPDATE_FINISH: "Aggiornamento e Terminale",
		REFRESH: "Aggiornamento",
		VOICE: "Voce",
		SPEAK: "Talk",
		LISTEN: "Ascolta",
		EMOTION: "Emozione",
		MOV: "Movimento",
		LED: "Leds",
		SOUND: "Audio",
		FOR: "Ciclo",
		IF: "Condizione",
		IF_DESC: "Utilizza #nombre_contador per confronarsi con questo.",
		WAIT: "Aspetta",
		INT: "Interazione",
		SCRIPT: "Script",
		SCRIPT_DESC: "Questo nodo include la funzione parlante, leggendo il primo campo dell'elemento script attualmente in esecuzione.",
		COUNTER: "Contatore",
		COUNTER_OPTS: {
			VALUE: "Valore",
			OPERATION: "Operazione",
			SUM: "Somma",
			SUBTRACTION: "Sottrazione",
			MULTIPLICATION: "Moltiplicazione",
			DIVISION: "Divisione",
			ASSIGN: "Assegnazione"
		},
		API: "Rest Api",
		DIALOGFLOW: "Dialogflow",
		TRANSLATE: "Translate",
		RANDOM: "Casuale",
		GROUP: "Gruppo",
		NONE: "Nessuno",
		PREVIOUS: "Precedente",
		SPEED: "Velocità",
		LEVEL: "Livello",
		ONLY_EYES: "Solo occhi",
		INCREMENTAL: "Incrementale",
		DIALOGUE: "Dialogo",
		DIALOGUE_DESC: "Utilizza '$' per includere l'ultima risposta,' $1 'per includere il primo e' $-1 ' per includere il penultimo. Utilizza '%' se si dispone di un nodo tipo 'Script' prima di includere il secondo campo o '%1' per specificare il campo 1. Utilizzo \" /' per separare più frasi (il robot dirà solo uno casualmente). Se si utilizza qualsiasi contatore, è possibile utilizzare #contador per includere il valore del contatore.",
		TEXT_TO_SPEAK: "Testo da leggere",
		SERVICE: "Servizio",
		LANGUAGE: "Lingua",
		GET: "Prendi",
		ALL: "Tutto",
		TIME: "Tempo",
		TIME_TO_WAIT: "Tempo di attesa in ms",
		ITERATIONS: "Iterazioni",
		ITERATIONS_DESC: "Utilizza il valore '-1' per abbinare gli elementi 'script'.",
		AMOUNT_ITERATIONS: "Importo delle Iterazioni",
		COMPARISON: {
			LABEL: "Confronto",
			EXACT: "Esatto",
			PHONETIC: "Fonetico",
			INCLUDE: "Include",
			MATH: "Matematica"
		},
		DEFAULT: "Per impostazione predefinita",
		API_REST: {
			VERSION: "Versione",
			SERVER: "Server",
			QUERY: "Consultazione",
			PORT: "Porta"
		},
		PROYECT: "Progetto",
		PROYECT_NAME: "Nome del progetto",
		SOURCE: "Lingua di origine",
		RECORD: "Record",
		SCRIPT_OPTS: {
			ORDERBY: "Ordina per:",
			UNIQUE: "Singolo",
			DELETEONUSE: "Rimuovere quando si utilizza",
			DESC: "Questo nodo include la funzione parlante, leggendo il primo campo dell'elemento script attualmente in esecuzione.",
			DSCI: "Rimuovere l'elemento corrente dallo script",
			DSCI_DESC: "Utilizzato quando l'opzione 'Rimuovi quando l'utilizzo' non viene selezionata."
		},
		IMAGE: "Immagine"
	},
	LED: {
		TITLE: "Elenco delle Animazioni Led",
		BASE: "Animazione di base",
		MODAL: "Animazione guidata",
		COLOR: "Colore",
		LED: "Led",
		NUM: "Num",
		TIME: "Tempo",
		MS: "Millisecondi",
		NOTIFY: {
			POST: {
				SUCCESS: "Animazione guidata creata correttamente."
			},
			CLONE: {
				SUCCESS: "L'animazione guidata duplicata correttamente."
			},
			UPDATE: {
				SUCCESS: "Animazione guidata aggiornata correttamente."
			},
			DELETE: {
				SUCCESS: "Animazione guidata rimossa correttamente."
			},
			ERROR: "Si è verificato un errore durante l'elaborazione della richiesta."
		}
	},
	LISTEN: {
		TITLE: "Elenco dei modelli di voce",
		MODAL: "Modello vocale",
		LANGUAGE: "Lingua",
		CODE: "Codice",
		NOTIFY: {
			POST: {
				SUCCESS: "Modello vocale creato correttamente."
			},
			UPDATE: {
				SUCCESS: "Modello vocale aggiornato correttamente."
			},
			DELETE: {
				SUCCESS: "Modello vocale rimosso correttamente."
			},
			ERROR: "Si è verificato un errore durante l'elaborazione della richiesta."
		}
	},
	MOVEMENT: {
		TITLE: "Elenco dei movimenti",
		MODAL: "Movimento",
		CODE: "Codice",
		ACTIONS: "Azioni",
		NOTIFY: {
			POST: {
				SUCCESS: "Movimento creato correttamente."
			},
			UPDATE: {
				SUCCESS: "Muoversi correttamente aggiornato."
			},
			DELETE: {
				SUCCESS: "Muoviti rimosso correttamente."
			},
			ERROR: "Si è verificato un errore durante l'elaborazione della richiesta."
		}
	},
	SCRIPT: {
		TITLE: "Elenco script",
		MODAL: "Script",
		QTY: "Quantità",
		NOTIFY: {
			POST: {
				SUCCESS: "Script creato correttamente."
			},
			UPDATE: {
				SUCCESS: "Script aggiornato correttamente."
			},
			DELETE: {
				SUCCESS: "Script rimosso correttamente."
			},
			ERROR: "Si è verificato un errore durante l'elaborazione della richiesta."
		}
	},
	SCRIPT_DATA: {
		TITLE: "Dati da Scripts",
		SCRIPT: "Script",
		FIELD: "Campo",
		NOTIFY: {
			POST: {
				SUCCESS: "Dati aggiunti correttamente."
			},
			UPDATE: {
				SUCCESS: "Dati aggiornati correttamente."
			},
			DELETE: {
				SUCCESS: "Dati rimossi correttamente."
			},
			ERROR: "Si è verificato un errore durante l'elaborazione della richiesta."
		}
	},
	VOICE: {
		TITLE: "Elenco delle voci",
		LANGUAGE: "Lingua",
		CODE: "Codice",
		VOICE: "Voce",
		NOTIFY: {
			POST: {
				SUCCESS: "Voce aggiunta correttamente."
			},
			UPDATE: {
				SUCCESS: "Voce aggiornata correttamente."
			},
			DELETE: {
				SUCCESS: "Voce rimossa correttamente."
			},
			ERROR: "Si è verificato un errore durante l'elaborazione della richiesta."
		},
		SERVICE: "Servizio"
	},
	WOO: {
		PHRASE: "Frase",
		VOICE: "Voce",
		CUSTOM_PHRASE: "Frase Personalizzata",
		SEND: "Invia",
		MOVEMENT: "Movimento",
		WOO: "Procedura guidata di Oz",
		COMMAND: "Comando",
		SEQUENCE: "Sequenza",
		SCRIPT_DATA: "Dati da Scripts",
		TYPE: "Tipo",
		DESCRIPTION: "Descrizione",
		ORDER: "Ordine",
		SPEAK: "Talk",
		SOUND: "Suono",
		LED: "Led",
		TEXT: "Testo",
		AUDIO: "Audio",
		NONE: "Nessuno",
		NOTIFY: {
			UPDATE: {
				SUCCESS: "Interazione salvata correttamente.",
				ERROR: "Si è verificato un errore durante il salvataggio dell'interazione."
			},
			ERROR: "Si è verificato un errore durante l'elaborazione della richiesta."
		}
	},
	COMMON: {
		NAME: "Nome",
		OPTIONS: "Opzioni",
		CLOSE: "Chiudi",
		SAVE: "Salva",
		UPDATE: "Aggiornamento",
		ADD: "Aggiungi",
		EDIT: "Modifica",
		DELETE: "Sei sicuro di voler rimuovere definitivamente questo articolo?"
	},
	EMOTION_TYPE: {
		NEUTRAL: "Neutro",
		JOY: "Gioia",
		SURPRISE: "Sorpresa",
		SAD: "Tristezza",
		ANGER: "Rabbia"
	},
	IMG: {
		TITLE: "Elenco immagini",
		FORMAT: "Formato",
		ADD: "Aggiungi immagine",
		UPLOAD: "Rilasciare i file qui o clicca per caricarli.",
		NOTIFY: {
			DELETE: {
				SUCCESS: "Immagine rimossa correttamente."
			},
			ERROR: "Si è verificato un errore durante l'elaborazione della richiesta."
		}
	}
}