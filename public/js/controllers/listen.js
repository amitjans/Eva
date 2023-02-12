eva.controller('listen', ['$scope', '$http', function ($scope, $http) {
    $scope.list = function () {
        $('#listadoListen').bootstrapTable({
            url: '/api/common?db=googlestt',
            pagination: true,
            search: true,
            searchTimeOut: 1000,
            locale: locale().CODE,
            columns: [{
                field: 'idioma',
                title: locale().LISTEN.LANGUAGE,
                sortable: true,
                searchable: true,
                align: 'left',
                width: 350,
                widthUnit: 'px',
            }, {
                field: 'codigo',
                title: locale().LISTEN.CODE + ' (Google)',
                sortable: true,
                searchable: true,
                width: 175,
                widthUnit: 'px',
            }, {
                field: 'watson',
                title: locale().LISTEN.CODE + ' (Watson)',
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
                    return [`<span class="btn btn-default" onclick="enableListen('${row._id}')">
                    <i class="fa fa-eye${(!!row.enable ? '' : '-slash')} fa-sm"></i>
                    </span>
                    <span class="btn btn-default" onclick="setForUpdateListen('${row._id}')">
                    <i class="fa fa-edit fa-sm"></i>
                    </span>
                    <span class="btn btn-default" onclick="deleteListen('${row._id}')">
                    <i class="fa fa-trash fa-sm"></i>
                    </span>`];
                }
            }]
        })
    }
    $scope.list();
}]);

function newListen() {
    postData(`/api/common?db=googlestt`, {
        idioma: document.getElementById('listenIdioma').value,
        codigo: document.getElementById('listenCodigo').value,
        watson: document.getElementById('listenWatson').value,
    }).then((data) => {
        notify(locale().LISTEN.NOTIFY.POST.SUCCESS);
        cleanListenModal();
    })
        .catch((error) => {
            notify(locale().LISTEN.NOTIFY.ERROR, 'danger');
        });
}

function setForUpdateListen(id) {
    getData(`/api/common/${id}?db=googlestt`).then(edit => {
        document.getElementById('listenId').value = id;
        document.getElementById('listenIdioma').value = edit.idioma;
        document.getElementById('listenCodigo').value = edit.codigo;
        document.getElementById('listenWatson').value = edit.watson;
        openListenModalEdit();
    });
}

function enableListen(id) {
    getData(`/api/common/${id}?db=googlestt`).then(edit => {
        edit.enable = !edit.enable;
        putData(`/api/common/${id}?db=googlestt`, edit)
            .then((data) => {
                $('#listadoListen').bootstrapTable('refresh');
            })
            .catch((error) => {
                $('#listadoListen').bootstrapTable('refresh');
            });
    });
}

function updateListen() {
    let id = document.getElementById('listenId').value;
    putData(`/api/common/${id}?db=googlestt`, {
        idioma: document.getElementById('listenIdioma').value,
        codigo: document.getElementById('listenCodigo').value,
        watson: document.getElementById('listenWatson').value
    }).then((data) => {
        notify(locale().LISTEN.NOTIFY.UPDATE.SUCCESS);
        cleanListenModal();
    })
        .catch((error) => {
            notify(locale().LISTEN.NOTIFY.ERROR, 'danger');
        });
}

function deleteListen(id) {
    deleteData(`/api/common/${id}?db=googlestt`)
        .then((data) => {
            notify(locale().LISTEN.NOTIFY.DELETE.SUCCESS);
        })
        .catch((error) => {
            notify(locale().LISTEN.NOTIFY.ERROR, 'danger');
        });
    $('#listadoListen').bootstrapTable('refresh');
}

function modalTitle(id, title) {
    document.getElementById(id).innerText = title;
}

function cleanListenModal() {
    document.getElementById('listenId').value = "";
    document.getElementById('listenIdioma').value = "";
    document.getElementById('listenCodigo').value = "";
    document.getElementById('listenWatson').value = "";
    modal.hide();
    $('#listadoListen').bootstrapTable('refresh');
}

function openListenModalAdd() {
    document.getElementById('bUpdate').style.display = 'none';
    document.getElementById('bSave').style.display = 'block';
    modalTitle('modalListenLabel', `${locale().COMMON.ADD} ${locale().LISTEN.MODAL}`);
    modal = new bootstrap.Modal('#modalListen', {
        keyboard: false
    })
    modal.show();
}

function openListenModalEdit() {
    document.getElementById('bSave').style.display = 'none';
    document.getElementById('bUpdate').style.display = 'block';
    modalTitle('modalListenLabel', `${locale().COMMON.EDIT} ${locale().LISTEN.MODAL}`);
    modal = new bootstrap.Modal('#modalListen', {
        keyboard: false
    })
    modal.show();
}