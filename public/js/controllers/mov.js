eva.controller('mov', ['$scope', '$http', function ($scope, $http) {

    $scope.list = function () {
        $('#listadoMov').bootstrapTable({
            url: '/api/common?db=mov',
            pagination: true,
            search: true,
            searchTimeOut: 1000,
            locale: locale().CODE,
            columns: [{
                field: 'nombre',
                title: locale().COMMON.NAME,
                sortable: true,
                searchable: true,
                align: 'left',
                width: 350,
                widthUnit: 'px',
            }, {
                field: 'codigo',
                title: locale().MOVEMENT.CODE,
                sortable: true,
                searchable: true,
                width: 350,
                widthUnit: 'px',
            }, {
                title: locale().COMMON.OPTIONS,
                align: 'center',
                width: 200,
                widthUnit: 'px',
                formatter: function (value, row, index) {
                    return [`<span class="btn btn-default" onclick="executeMov('${row.codigo}')">
                    <i class="fa fa-play fa-sm"></i>
                    </span>
                    <span class="btn btn-default" onclick="setForUpdateMov('${row._id}')">
                    <i class="fa fa-edit fa-sm"></i>
                    </span>
                    <span class="btn btn-default" onclick="deleteMov('${row._id}')">
                    <i class="fa fa-trash fa-sm"></i>
                    </span>`];
                }
            }]
        })
    }
    $scope.list();
}]);

function newMov() {
    postData(`/api/common?db=mov`, {
        nombre: document.getElementById('movNombre').value,
        codigo: document.getElementById('movCodigo').value
    }).then((data) => {
        notify(locale().MOVEMENT.NOTIFY.POST.SUCCESS);
        cleanMovModal();
    }).catch((error) => {
        notify(locale().MOVEMENT.NOTIFY.ERROR, 'danger');
    });
}

function setForUpdateMov(id) {
    getData(`/api/common/${id}?db=mov`).then(edit => {
        document.getElementById('movId').value = id;
        document.getElementById('movNombre').value = edit.nombre;
        document.getElementById('movCodigo').value = edit.codigo;
        openMovModalEdit();
    });
}

function updateMov() {
    let id = document.getElementById('movId').value;
    putData(`/api/common/${id}?db=mov`, {
        nombre: document.getElementById('movNombre').value,
        codigo: document.getElementById('movCodigo').value
    }).then((data) => {
        notify(locale().MOVEMENT.NOTIFY.UPDATE.SUCCESS);
        cleanMovModal();
    })
        .catch((error) => {
            notify(locale().MOVEMENT.NOTIFY.ERROR, 'danger');
        });
}

function deleteMov(id) {
    deleteData(`/api/common/${id}?db=mov`)
        .then((data) => {
            notify(locale().MOVEMENT.NOTIFY.DELETE.SUCCESS);
        })
        .catch((error) => {
            notify(locale().MOVEMENT.NOTIFY.ERROR, 'danger');
        });
    $('#listadoMov').bootstrapTable('refresh');
}

function modalTitle(id, title) {
    document.getElementById(id).innerText = title;
}

function cleanMovModal() {
    document.getElementById('movId').value = "";
    document.getElementById('movNombre').value = "";
    document.getElementById('movCodigo').value = "";
    modal.hide();
    $('#listadoMov').bootstrapTable('refresh');
}

function openMovModalAdd() {
    document.getElementById('bUpdate').style.display = 'none';
    document.getElementById('bSave').style.display = 'block';
    modalTitle('modalMovLabel', `${locale().COMMON.ADD} ${locale().MOVEMENT.MODAL}`);
    modal = new bootstrap.Modal('#modalMov', {
        keyboard: false
    })
    modal.show();
}

function openMovModalEdit() {
    document.getElementById('bSave').style.display = 'none';
    document.getElementById('bUpdate').style.display = 'block';
    modalTitle('modalMovLabel', `${locale().COMMON.EDIT} ${locale().MOVEMENT.MODAL}`);
    modal = new bootstrap.Modal('#modalMov', {
        keyboard: false
    })
    modal.show();
}

function addCode(code) {
    let mc = document.getElementById('movCodigo');
    mc.value = mc.value + code;
}

function executeMov(code) {
    postData(`/nodes`, { type: 'mov', mov: code }).then((data) => {
    }).catch((error) => {
        notify(locale().MOVEMENT.NOTIFY.ERROR, 'danger');
    });
}