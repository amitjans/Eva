eva.controller('voice', ['$scope', '$http', function ($scope, $http) {

    $scope.list = function () {
        $('#listadoVoice').bootstrapTable({
            url: '/api/common?db=voice',
            pagination: true,
            search: true,
            searchTimeOut: 1000,
            locale: locale().CODE,
            columns: [{
                field: 'idioma',
                title: locale().VOICE.LANGUAGE,
                sortable: true,
                searchable: true,
                align: 'left',
                width: 350,
                widthUnit: 'px',
            }, {
                field: 'servicio',
                title: locale().VOICE.SERVICE,
                sortable: true,
                searchable: true,
                width: 175,
                widthUnit: 'px',
            }, {
                field: 'codigo',
                title: locale().VOICE.CODE,
                sortable: true,
                searchable: true,
                width: 175,
                widthUnit: 'px',
            }, {
                field: 'nombre',
                title: locale().COMMON.OPTIONS,
                sortable: true,
                searchable: true,
                width: 175,
                widthUnit: 'px',
            }, {
                title: locale().COMMON.OPTIONS,
                align: 'center',
                width: 200,
                widthUnit: 'px',
                formatter: function (value, row, index) {
                    return [`<span class="btn btn-default" onclick="enableVoice('${row._id}')">
                    <i class="fa fa-eye${(!!row.enable ? '' : '-slash')} fa-sm"></i>
                    </span>
                    <span class="btn btn-default" onclick="setForUpdateVoice('${row._id}')">
                    <i class="fa fa-edit fa-sm"></i>
                    </span>
                    <span class="btn btn-default" onclick="deleteVoice('${row._id}')">
                    <i class="fa fa-trash fa-sm"></i>
                    </span>`];
                }
            }]
        })
    }
    $scope.list();
}]);

function newVoice() {
    postData(`/api/common?db=voice`, {
        idioma: document.getElementById('voiceIdioma').value,
        servicio: document.getElementById('voiceServicio').value,
        codigo: document.getElementById('voiceCodigo').value,
        nombre: document.getElementById('voiceNombre').value,
    }).then((data) => {
        notify(locale().VOICE.NOTIFY.POST.SUCCESS);
        cleanVoiceModal();
    })
        .catch((error) => {
            notify(locale().VOICE.NOTIFY.ERROR, 'danger');
        });
}

function setForUpdateVoice(id) {
    getData(`/api/common/${id}?db=voice`).then(edit => {
        document.getElementById('voiceId').value = id;
        document.getElementById('voiceIdioma').value = edit.idioma;
        document.getElementById('voiceServicio').value = edit.servicio;
        document.getElementById('voiceCodigo').value = edit.codigo;
        document.getElementById('voiceNombre').value = edit.nombre;
        openVoiceModalEdit();
    });
}

function enableVoice(id) {
    getData(`/api/common/${id}?db=voice`).then(edit => {
        edit.enable = !edit.enable;
        putData(`/api/common/${id}?db=voice`, edit)
            .then((data) => {
                $('#listadoVoice').bootstrapTable('refresh');
            })
            .catch((error) => {
                $('#listadoVoice').bootstrapTable('refresh');
            });
    });
}

function updateVoice() {
    let id = document.getElementById('voiceId').value;
    putData(`/api/common/${id}?db=voice`, {
        idioma: document.getElementById('voiceIdioma').value,
        servicio: document.getElementById('voiceServicio').value,
        codigo: document.getElementById('voiceCodigo').value,
        nombre: document.getElementById('voiceNombre').value,
    }).then((data) => {
        notify(locale().VOICE.NOTIFY.UPDATE.SUCCESS);
        cleanVoiceModal();
    })
        .catch((error) => {
            notify(locale().VOICE.NOTIFY.ERROR, 'danger');
        });
}

function deleteVoice(id) {
    deleteData(`/api/common/${id}?db=voice`)
        .then((data) => {
            notify(locale().VOICE.NOTIFY.DELETE.SUCCESS);
        })
        .catch((error) => {
            notify(locale().VOICE.NOTIFY.ERROR, 'danger');
        });
    $('#listadoVoice').bootstrapTable('refresh');
}

function modalTitle(id, title) {
    document.getElementById(id).innerText = title;
}

function cleanVoiceModal() {
    document.getElementById('voiceId').value = "";
    document.getElementById('voiceIdioma').value = "";
    document.getElementById('voiceServicio').value = "";
    document.getElementById('voiceCodigo').value = "";
    document.getElementById('voiceNombre').value = "";
    modal.hide();
    $('#listadoVoice').bootstrapTable('refresh');
}

function openVoiceModalAdd() {
    document.getElementById('bUpdate').style.display = 'none';
    document.getElementById('bSave').style.display = 'block';
    modalTitle('modalVoiceLabel', `${locale().COMMON.ADD} ${locale().VOICE.MODAL}`);
    modal = new bootstrap.Modal('#modalVoice', {
        keyboard: false
    })
    modal.show();
}

function openVoiceModalEdit() {
    document.getElementById('bSave').style.display = 'none';
    document.getElementById('bUpdate').style.display = 'block';
    modalTitle('modalVoiceLabel', `${locale().COMMON.EDIT} ${locale().VOICE.MODAL}`);
    modal = new bootstrap.Modal('#modalVoice', {
        keyboard: false
    })
    modal.show();
}