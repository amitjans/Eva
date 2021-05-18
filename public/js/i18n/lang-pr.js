const pr = {
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
        SERVICES: "Serviços"
    },
    LANG: {
        MENU: "Idioma",
        ES: "Espanhol",
        EN: "Inglês",
        PR: "Português"
    },
    DATATABLE: {
        SHOW: "Mostar",
        SEARCH: "Pesquisar",
        SHOWING: "Mostrando",
        TO: "a",
        OF: "de",
        ENTRIES: "registros",
        PREVIOUS: "Anterior",
        NEXT: "Próximo",
    },
    AUDIO: {
        TITLE: "Lista de Áudios",
        FORMAT: "Formato",
        DURATION: "Duração",
        ADD: "Adicionar Áudio",
        UPLOAD: "Solte os arquivos aqui ou clique para enviar."
    },
    CLOUD: {
        TITLE: "Serviços",
        SERVICE: "Serviço",
        VAR: "Variável",
        VALUE: "Valor",
        STATUS: "Doença",
        EDIT: "Editar"
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
        ADD_INT: "Adicionar interação",
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
        API_REST: "Api Rest",
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
        SOURCE: "Idioma de origem"
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
            }
        }
    },
    LISTEN: {
        TITLE: "Lista de vozes",
        LANGUAGE: "Idioma",
        CODE: "Código",
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
            }
        }
    },
    SCRIPT: {
        TITLE: "Lista de scripts",
        MODAL: "Script",
        QTY: "Quantidade"
    },
    SCRIPT_DATA: {
        TITLE: "Dados de script",
        SCRIPT: "Script",
        FIELD: "Campo"
    },
    VOICE: {
        TITLE: "Lista de vozes",
        LANGUAGE: "Idioma",
        CODE: "Código",
        VOICE: "Voz"
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
            }
        }
    },
    COMMON: {
        NAME: "Nome",
        OPTIONS: "Opções",
        CLOSE: "Fechar",
        SAVE: "Salvar",
        UPDATE: "Atualizar",
        ADD: "Adicionar",
        EDIT: "Editar"
    },
    EMOTION_TYPE: {
        NEUTRAL: "Neutro",
        JOY: "Surpresa",
        SURPRISE: "Surprise",
        SAD: "Tristeza",
        ANGER: "Raiva"
    }
}