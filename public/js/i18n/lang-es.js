const es = {
    TOOLBAR: {
        NAME: "Control Eva",
        INI: "Inicio",
        INTERACTION: "Interacción",
        SCRIPT: "Script",
        SCRIPTS: "Scripts",
        DATA: "Datos",
        AUDIOS: "Audios",
        LANGUAGE: "Lenguajes del Robot",
        VOICE: "Voz",
        LISTEN: "Escuchar",
        LED: "Led",
        MOVEMENT: "Movimiento",
        WOO: "Mago de Oz",
        CONFIG: "Configuraciones",
        SOCIAL_ROBOT: "Robot Social",
        SERVICES: "Servicios",
        IMGS: "Imagenes"
    },
    LANG: {
        MENU: "Idioma",
        ES: "Español",
        EN: "Inglés",
        PT: "Portugues",
        FR: "Francés",
        IT: "Italiano",
        JA: "Japonés"
    },
    DATATABLE: {
        SHOW: "Mostra",
        SEARCH: "Buscar",
        SHOWING: "Mostrando",
        TO: "a",
        OF: "de",
        ENTRIES: "registros",
        PREVIOUS: "Anterior",
        NEXT: "Siguiente",
    },
    AUDIO: {
        TITLE: "Listado de Audios",
        FORMAT: "Formato",
        DURATION: "Duración",
        ADD: "Agregar Audio",
        UPLOAD: "Suelta los archivos aquí o haz clic para subirlos.",
        NOTIFY: {
            DELETE: {
                SUCCESS: "Audio eliminado correctamente."
            },
            ERROR: "A ocurrido un error al procesar su solicitud."
        }
    },
    IMG: {
        TITLE: "Listado de Imagenes",
        FORMAT: "Formato",
        ADD: "Agregar Imagen",
        UPLOAD: "Suelta los archivos aquí o haz clic para subirlos.",
        NOTIFY: {
            DELETE: {
                SUCCESS: "Imagen eliminada correctamente."
            },
            ERROR: "A ocurrido un error al procesar su solicitud."
        }
    },
    CLOUD: {
        TITLE: "Servicios",
        SERVICE: "Servicio",
        VAR: "Variable",
        VALUE: "Valor",
        STATUS: "Estado",
        EDIT: "Editar",
        TELEPHONE: "Número de Teléfono",
        CODE: "Código",
        NEXT: "Siguiente",
        SEND: "Enviar",
        NOTIFY: {
            UPDATE: {
                SUCCESS: "Credencial del servicio actualizada correctamente."
            },
            DELETE: {
                SUCCESS: "Credencial del servicio eliminada correctamente."
            }
        }
    },
    CONFIG: {
        TITLE: "Configuración",
        VOICE: "Voz",
        VOICELED: "Animación Voz",
        LISTEN: "Escuchar",
        LISTENLED: "Animación Escuchar",
        SPEAK_LISTEN: "Hablar y Escuchar",
        LED_ANIM: "Animacin Led",
        MOV: "Movimiento",
        NOTIFY: {
            UPDATE: {
                SUCCESS: "Se ha aplicado la configuración correctamente.",
                ERROR: "Ha ocurrido un error al intentar aplicar la configuración."
            }
        }
    },
    CONTROL: {
        WARNING: "Cuidado",
        INTERACTIONS: "Interacciones",
        EXPORT: "Exportar",
        CONTROL_SCRIPT: "Control Script",
        SCRIPTS: "Scripts"
    },
    INTERACTION: {
        TITLE: "Listado de Interacciones",
        NODES: "Nodes",
        ADD_INT: "Nueva interacción",
        IMPORT: "Importar",
        IMPORT_INT: "Importar interacción",
        NODE: "Node",
        TYPE: "Tipo",
        DOWNLOAD: "Descarga",
        SAVE: "Guardar",
        UPDATE: "Actualizar",
        UPDATE_FINISH: "Actualizar y Terminar",
        REFRESH: "Refrescar",
        VOICE: "Voz",
        SPEAK: "Hablar",
        LISTEN: "Escuchar",
        EMOTION: "Emoción",
        MOV: "Movimiento",
        LED: "Leds",
        SOUND: "Audio",
        FOR: "Ciclo",
        IF: "Condición",
        IF_DESC: "Utiliza #nombre_contador para comparar contra este.",
        WAIT: "Esperar",
        INT: "Interacción",
        SCRIPT: "Script",
        SCRIPT_OPTS: {
            ORDERBY: "Ordenar por:",
            UNIQUE: "Único",
            DELETEONUSE: "Eliminar al usar",
            DESC: "Este nodo incluye la función de hablar, leyendo el primer campo del elemento del script que se esté ejecutando en ese momento.",
            DSCI: "Eliminar el elemento actual del script",
            DSCI_DESC: "Se utiliza cuando la opción 'Eliminar al usar' no está seleccionada.",
            READ: "Leer"
        },
        COUNTER: "Contador",
        COUNTER_OPTS: {
            VALUE: "Valor",
            OPERATION: "Operación",
            SUM: "Suma",
            SUBTRACTION: "Resta",
            MULTIPLICATION: "Multiplicación",
            DIVISION: "División",
            ASSIGN: "Asignar"
        },
        API: "Api Rest",
        DIALOGFLOW: "Dialogflow",
        TRANSLATE: "Traducir",
        RANDOM: "Aleatorio",
        GROUP: "Grupo",
        NONE: "Ninguno",
        PREVIOUS: "Anterior",
        SPEED: "Velocidad",
        LEVEL: "Nivel",
        ONLY_EYES: "Solo Ojos",
        INCREMENTAL: "Incremental",
        DIALOGUE: "Diálogo",
        DIALOGUE_DESC: "Utiliza '$' para incluir la última respuesta, '$1' para incluir la primera y '$-1' para incluir la penúltima. Utiliza '%' si tiene un nodo tipo 'Script' antes para incluir el 2do campo o '%1' para especificar el campo 1. Utiliza '/' para separar varias frases (el robot solo dirá una aleatoriamente). Si utiliza algún contador puede usar #contador para incluir el valor del mismo.",
        TEXT_TO_SPEAK: "Texto a Decir",
        SERVICE: "Servicio",
        LANGUAGE: "Idioma",
        GET: "Obtener",
        ALL: "Todo",
        TIME: "Tiempo",
        TIME_TO_WAIT: "Tiempo a esperar en ms",
        ITERATIONS: "Iteraciones",
        ITERATIONS_DESC: "Utiliza el valor '-1' para que las iteraciones coincidan con los elementos del 'script'.",
        AMOUNT_ITERATIONS: "Cantidad de Iteraciones",
        COMPARISON: {
            LABEL: "Comparación",
            EXACT: "Exacta",
            PHONETIC: "Fonética",
            INCLUDE: "Incluye",
            MATH: "Matemática"
        },
        DEFAULT: "Por defecto",
        API_REST: {
            VERSION: "Versión",
            SERVER: "Servidor",
            QUERY: "Consulta",
            PORT: "Puerto"
        },
        PROYECT: "Proyecto",
        PROYECT_NAME: "Nombre del proyecto",
        SOURCE: "Idioma de origen",
        RECORD: "Grabar",
        IMAGE: "Imagen",
        SCREEN_RESET: "Pantalla de inicio",
        UNINSTALL: "Desinstalar",
        UNINSTALL_DESC: "Desinstalar eliminará la interacción y los elementos relacionados con la misma."
    },
    LED: {
        TITLE: "Listado de Animaciones led",
        BASE: "Animación Base",
        MODAL: "Animación Led",
        COLOR: "Color",
        LED: "Led",
        NUM: "Num",
        TIME: "Tiempo",
        MS: "Milisegundos",
        NOTIFY: {
            POST: {
                SUCCESS: "Animación led creada correctamente."
            },
            CLONE: {
                SUCCESS: "Animación led duplicada correctamente."
            },
            UPDATE: {
                SUCCESS: "Animación led actualizada correctamente."
            },
            DELETE: {
                SUCCESS: "Animación led eliminada correctamente."
            },
            ERROR: "A ocurrido un error al procesar su solicitud."
        }
    },
    LISTEN: {
        TITLE: "Listado de modelos de voz",
        MODAL: "Modelo de voz",
        LANGUAGE: "Idioma",
        CODE: "Código",
        NOTIFY: {
            POST: {
                SUCCESS: "Modelo de voz creado correctamente."
            },
            UPDATE: {
                SUCCESS: "Modelo de voz actualizado correctamente."
            },
            DELETE: {
                SUCCESS: "Modelo de voz eliminado correctamente."
            },
            ERROR: "A ocurrido un error al procesar su solicitud."
        }
    },
    MOVEMENT: {
        TITLE: "Listado de Movimientos",
        MODAL: "Movimiento",
        CODE: "Código",
        ACTIONS: "Acciones",
        NOTIFY: {
            POST: {
                SUCCESS: "Movimiento creado correctamente."
            },
            UPDATE: {
                SUCCESS: "Movimiento actualizado correctamente."
            },
            DELETE: {
                SUCCESS: "Movimiento eliminado correctamente."
            },
            ERROR: "A ocurrido un error al procesar su solicitud."
        }
    },
    SCRIPT: {
        TITLE: "Listado de Scripts",
        MODAL: "Script",
        QTY: "Cantidad",
        NOTIFY: {
            POST: {
                SUCCESS: "Script creado correctamente."
            },
            UPDATE: {
                SUCCESS: "Script actualizado correctamente."
            },
            DELETE: {
                SUCCESS: "Script eliminado correctamente."
            },
            ERROR: "A ocurrido un error al procesar su solicitud."
        }
    },
    SCRIPT_DATA: {
        TITLE: "Datos de Scripts",
        SCRIPT: "Script",
        FIELD: "Campo",
        NOTIFY: {
            POST: {
                SUCCESS: "Datos agregados correctamente."
            },
            UPDATE: {
                SUCCESS: "Datos actualizados correctamente."
            },
            DELETE: {
                SUCCESS: "Datos eliminados correctamente."
            },
            ERROR: "A ocurrido un error al procesar su solicitud."
        }
    },
    VOICE: {
        TITLE: "Listado de Voces",
        LANGUAGE: "Idioma",
        SERVICE: "Servicio",
        CODE: "Código",
        VOICE: "Voz",
        NOTIFY: {
            POST: {
                SUCCESS: "Voz agregada correctamente."
            },
            UPDATE: {
                SUCCESS: "Voz actualizada correctamente."
            },
            DELETE: {
                SUCCESS: "Voz eliminada correctamente."
            },
            ERROR: "A ocurrido un error al procesar su solicitud."
        }
    },
    WOO: {
        PHRASE: "Frase",
        VOICE: "Voz",
        CUSTOM_PHRASE: "Frase Personalizada",
        SEND: "Enviar",
        MOVEMENT: "Movimiento",
        WOO: "Mago de Oz",
        COMMAND: "Comando",
        SEQUENCE: "Secuencia",
        SCRIPT_DATA: "Datos de Scripts",
        TYPE: "Tipo",
        DESCRIPTION: "Descripción",
        ORDER: "Orden",
        SPEAK: "Hablar",
        SOUND: "Sonido",
        LED: "Led",
        TEXT: "Texto",
        AUDIO: "Audio",
        NONE: "Ninguno",
        NOTIFY: {
            UPDATE: {
                SUCCESS: "Interacción guardada correctamente.",
                ERROR: "A ocurrido un error al guardar la interacción."
            },
            ERROR: "A ocurrido un error al procesar su solicitud."
        }
    },
    COMMON: {
        NAME: "Nombre",
        OPTIONS: "Opciones",
        CLOSE: "Cerrar",
        SAVE: "Salvar",
        UPDATE: "Actualizar",
        ADD: "Agregar",
        EDIT: "Editar",
        DELETE: "¿Está seguro de que desea eliminar este elemento de forma permanente?"
    },
    EMOTION_TYPE: {
        NEUTRAL: "Neutral",
        JOY: "Alegría",
        SURPRISE: "Sorpresa",
        SAD: "Tristeza",
        ANGER: "Ira"
    }
}