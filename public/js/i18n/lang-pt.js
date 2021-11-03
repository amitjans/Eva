const pt = {
	TOOLBAR: {
		NAME: "Controle Eva",
		INI: "Iniciar",
		INTERACTION: "Interação",
		SCRIPT: "Script",
		SCRIPTS: "Scripts",
		DATA: "Dados",
		AUDIOS: "Áudios",
		LANGUAGE: "Linguagens de robôs",
		VOICE: "Voz",
		LISTEN: "Ouça",
		LED: "Led",
		MOVEMENT: "Movimento",
		WOO: "Mágico de Oz",
		CONFIG: "Configurações",
		SOCIAL_ROBOT: "Robô Social",
		SERVICES: "Serviços",
		IMGS: "Imagens"
	},
	LANG: {
		MENU: "Idioma",
		ES: "Espanhol",
		EN: "Inglês",
		PT: "Português",
		FR: "Francês",
		IT: "Italiano",
		JA: "Japonês"
	},
	DATATABLE: {
		SHOW: "Mostar",
		SEARCH: "Pesquisar",
		SHOWING: "Mostrando",
		TO: "a",
		OF: "de",
		ENTRIES: "registros",
		PREVIOUS: "Anterior",
		NEXT: "Próximo"
	},
	AUDIO: {
		TITLE: "Lista de Áudios",
		FORMAT: "Formato",
		DURATION: "Duração",
		ADD: "Adicionar Áudio",
		UPLOAD: "Solte os arquivos aqui ou clique para enviar.",
		NOTIFY: {
			DELETE: {
				SUCCESS: "Áudio removido com sucesso."
			},
			ERROR: "Ocorreu um erro ao processar o seu pedido."
		}
	},
	CLOUD: {
		TITLE: "Serviços",
		SERVICE: "Serviço",
		VAR: "Variável",
		VALUE: "Valor",
		STATUS: "Doença",
		EDIT: "Editar",
		NOTIFY: {
			UPDATE: {
				SUCCESS: "Credencial de serviço atualizada com sucesso."
			},
			DELETE: {
				SUCCESS: "Credencial de serviço removida com sucesso."
			}
		},
		TELEPHONE: "Número Telefônico",
		CODE: "Código",
		NEXT: "Próximo",
		SEND: "Enviar"
	},
	CONFIG: {
		TITLE: "Configuração",
		VOICE: "Voz",
		VOICELED: "Animação de voz",
		LISTEN: "Ouvir",
		LISTENLED: "Ouvir animação",
		SPEAK_LISTEN: "Fale e ouça",
		LED_ANIM: "Animação Led",
		MOV: "Movimento",
		NOTIFY: {
			UPDATE: {
				SUCCESS: "A configuração foi aplicada com sucesso.",
				ERROR: "Ocorreu um erro ao tentar aplicar as configurações."
			}
		}
	},
	CONTROL: {
		WARNING: "Cuidado",
		INTERACTIONS: "Interações",
		EXPORT: "Exportar",
		CONTROL_SCRIPT: "Script de controle",
		SCRIPTS: "Scripts"
	},
	INTERACTION: {
		TITLE: "Lista de interações",
		NODES: "Nós",
		ADD_INT: "Nova interação",
		IMPORT: "Importar",
		IMPORT_INT: "Importar interação",
		NODE: "Nó",
		TYPE: "Tipo",
		DOWNLOAD: "Baixar",
		SAVE: "Salvar",
		UPDATE: "Atualizar",
		UPDATE_FINISH: "Atualizar e Concluir",
		REFRESH: "Atualizar",
		VOICE: "Voz",
		SPEAK: "Fale",
		LISTEN: "Ouça",
		EMOTION: "Emoção",
		MOV: "Movimento",
		LED: "Leds",
		SOUND: "Áudio",
		FOR: "Ciclo",
		IF: "Condição",
		IF_DESC: "Use #nome_do_contador para comparar com este.",
		WAIT: "Espera",
		INT: "Interação",
		SCRIPT: "Script",
		SCRIPT_DESC: "Este nodo inclui a função speak, lendo o primeiro campo do elemento do script que está rodando naquele momento.",
		COUNTER: "Contador",
		COUNTER_OPTS: {
			VALUE: "Valor",
			OPERATION: "Operação",
			SUM: "Soma",
			SUBTRACTION: "Subtração",
			MULTIPLICATION: "Multiplicação",
			DIVISION: "Divisão",
			ASSIGN: "Atribuir"
		},
		API: "Api Rest",
		DIALOGFLOW: "Dialogflow",
		TRANSLATE: "Traduzir",
		RANDOM: "Aleatório",
		GROUP: "Grupo",
		NONE: "Nenhum",
		PREVIOUS: "Anterior",
		SPEED: "Velocidade",
		LEVEL: "Nível",
		ONLY_EYES: "Somente olhos",
		INCREMENTAL: "Incremental",
		DIALOGUE: "Diálogo",
		DIALOGUE_DESC: "Use '$' para incluir a última resposta, '$1' para incluir a primeira e '$-1' para incluir a penúltima. Use '%' se você tiver um tipo de nó 'Script' antes de incluir o segundo campo ou '%1' para especificar o campo 1. Use '/' para separar várias frases (o robô só dirá uma aleatoriamente). Se você usar um contador, pode usar #counter para incluir seu valor.",
		TEXT_TO_SPEAK: "Texto a dizer",
		SERVICE: "Serviço",
		LANGUAGE: "Idioma",
		GET: "Get",
		ALL: "Tudo",
		TIME: "Time",
		TIME_TO_WAIT: "Tempo de espera em ms",
		ITERATIONS: "Iterações",
		ITERATIONS_DESC: "Use o valor '-1' para que as iterações correspondam aos elementos do 'script'.",
		AMOUNT_ITERATIONS: "Quantidade de Iterações",
		COMPARISON: {
			LABEL: "Comparação",
			EXACT: "Exato",
			PHONETIC: "Fonética",
			INCLUDE: "Inclui",
			MATH: "Matemática"
		},
		DEFAULT: "Por padrão",
		API_REST: {
			VERSION: "Versão",
			SERVER: "Servidor",
			QUERY: "Query",
			PORT: "Porta"
		},
		PROYECT: "Projeto",
		PROYECT_NAME: "Nome do projeto",
		SOURCE: "Idioma de origem",
		RECORD: "Registro",
		SCRIPT_OPTS: {
			ORDERBY: "Ordenar por:",
			UNIQUE: "Único",
			DELETEONUSE: "Remover ao usar",
			DESC: "Este nó inclui a função de fala, lendo o primeiro campo do elemento de script que está em execução atualmente.",
			DSCI: "Remover o elemento atual do script",
			DSCI_DESC: "Usado quando a opção 'Remover Quando Usar' não é selecionada."
		},
		IMAGE: "Imagem"
	},
	LED: {
		TITLE: "Lista de animações conduzidas",
		BASE: "Animação de base",
		MODAL: "Animação Led",
		COLOR: "Cor",
		LED: "Led",
		NUM: "Num",
		TIME: "Tempo",
		MS: "Milissegundos",
		NOTIFY: {
			POST: {
				SUCCESS: "Animação Led criada corretamente."
			},
			CLONE: {
				SUCCESS: "Animação Led duplicada corretamente."
			},
			UPDATE: {
				SUCCESS: "Animação Led atualizada corretamente."
			},
			DELETE: {
				SUCCESS: "Animação LED removida com sucesso."
			},
			ERROR: "Ocorreu um erro ao processar o seu pedido."
		}
	},
	LISTEN: {
		TITLE: "Lista de modelos de voz",
		MODAL: "Modelo de voz",
		LANGUAGE: "Idioma",
		CODE: "Código",
		NOTIFY: {
			POST: {
				SUCCESS: "Modelo de fala criado com sucesso."
			},
			UPDATE: {
				SUCCESS: "Modelo de fala atualizado com sucesso."
			},
			DELETE: {
				SUCCESS: "Padrão de fala removido com sucesso."
			},
			ERROR: "Ocorreu um erro ao processar o seu pedido."
		}
	},
	MOVEMENT: {
		TITLE: "Lista de Movimentos",
		MODAL: "Movimento",
		CODE: "Código",
		ACTIONS: "Ações",
		NOTIFY: {
			POST: {
				SUCCESS: "Movimento criado com sucesso."
			},
			UPDATE: {
				SUCCESS: "Movimento atualizado com sucesso."
			},
			DELETE: {
				SUCCESS: "Movimento removido com sucesso."
			},
			ERROR: "Ocorreu um erro ao processar o seu pedido."
		}
	},
	SCRIPT: {
		TITLE: "Lista de scripts",
		MODAL: "Script",
		QTY: "Quantidade",
		NOTIFY: {
			POST: {
				SUCCESS: "Script criado com sucesso."
			},
			UPDATE: {
				SUCCESS: "Script atualizado com sucesso."
			},
			DELETE: {
				SUCCESS: "Script removido com sucesso."
			},
			ERROR: "Ocorreu um erro ao processar o seu pedido."
		}
	},
	SCRIPT_DATA: {
		TITLE: "Dados de script",
		SCRIPT: "Script",
		FIELD: "Campo",
		NOTIFY: {
			POST: {
				SUCCESS: "Dados adicionados com sucesso."
			},
			UPDATE: {
				SUCCESS: "Dados atualizados corretamente."
			},
			DELETE: {
				SUCCESS: "Dados removidos com sucesso."
			},
			ERROR: "Ocorreu um erro ao processar o seu pedido."
		}
	},
	VOICE: {
		TITLE: "Lista de vozes",
		LANGUAGE: "Idioma",
		CODE: "Código",
		VOICE: "Voz",
		NOTIFY: {
			POST: {
				SUCCESS: "Voz adicionada com sucesso."
			},
			UPDATE: {
				SUCCESS: "Voz atualizada corretamente."
			},
			DELETE: {
				SUCCESS: "Voz excluída com sucesso."
			},
			ERROR: "An error occurred while processing your request."
		},
		SERVICE: "Serviço"
	},
	WOO: {
		PHRASE: "Frase",
		VOICE: "Voz",
		CUSTOM_PHRASE: "Frase personalizada",
		SEND: "Enviar",
		MOVEMENT: "Movimento",
		WOO: "Mágico de Oz",
		COMMAND: "Comando",
		SEQUENCE: "Sequência",
		SCRIPT_DATA: "Dados de script",
		TYPE: "Tipo",
		DESCRIPTION: "Descrição",
		ORDER: "Pedido",
		SPEAK: "Fale",
		SOUND: "Som",
		LED: "Led",
		TEXT: "Texto",
		AUDIO: "Áudio",
		NONE: "Nenhum",
		NOTIFY: {
			UPDATE: {
				SUCCESS: "Interação salva com sucesso.",
				ERROR: "Ocorreu um erro ao salvar a interação."
			},
			ERROR: "Ocorreu um erro ao processar o seu pedido."
		}
	},
	COMMON: {
		NAME: "Nome",
		OPTIONS: "Opções",
		CLOSE: "Fechar",
		SAVE: "Salvar",
		UPDATE: "Atualizar",
		ADD: "Adicionar",
		EDIT: "Editar",
		DELETE: "Tem certeza de que deseja remover permanentemente este item?"
	},
	EMOTION_TYPE: {
		NEUTRAL: "Neutro",
		JOY: "Surpresa",
		SURPRISE: "Surprise",
		SAD: "Tristeza",
		ANGER: "Raiva"
	},
	IMG: {
		TITLE: "Cotação de imagem",
		FORMAT: "Formato",
		ADD: "Adicionar Imagem",
		UPLOAD: "Solte os arquivos aqui ou clique para fazer o upload deles.",
		NOTIFY: {
			DELETE: {
				SUCCESS: "Imagem removida corretamente."
			},
			ERROR: "Ocorreu um erro ao processar o seu pedido."
		}
	}
}