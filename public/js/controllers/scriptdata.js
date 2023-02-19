var scriptDataId = "";
eva.controller('scriptdata', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.slist = function () {
        $http.get('/api/common?db=script').then(function successCallback(response) {
            $scope.slistado = response.data;
            if (!!$routeParams.id) {
                scriptDataId = $routeParams.id;
                document.getElementById("inlineFormCustomSelect").value = scriptDataId;
                table({ value: scriptDataId });
            }
        }, function errorCallback(response) {
        });
    }
    $scope.slist();
}]);

function table(obj) {
    $('#listadoScriptdata').bootstrapTable('destroy');
    $('#listadoScriptdata').bootstrapTable({
        url: `/api/script/data/${obj.value}`,
        pagination: true,
        search: true,
        searchTimeOut: 1000,
        locale: locale().CODE,
        columns: [{
            field: 'campo1',
            title: locale().SCRIPT_DATA.FIELD + '1',
            sortable: true,
            searchable: true,
            align: 'left',
            width: 300,
            widthUnit: 'px',
        }, {
            field: 'campo2',
            title: locale().SCRIPT_DATA.FIELD + '2',
            sortable: true,
            searchable: true,
            align: 'left',
            width: 300,
            widthUnit: 'px',
        }, {
            field: 'campo3',
            title: locale().SCRIPT_DATA.FIELD + '3',
            sortable: true,
            searchable: true,
            align: 'left',
            width: 300,
            widthUnit: 'px',
        }, {
            field: 'campo4',
            title: locale().SCRIPT_DATA.FIELD + '4',
            sortable: true,
            searchable: true,
            align: 'left',
            width: 300,
            widthUnit: 'px',
        }, {
            title: locale().COMMON.OPTIONS,
            align: 'center',
            width: 200,
            widthUnit: 'px',
            formatter: function (value, row, index) {
                return [`<span class="btn btn-default" onclick="setForUpdateScriptdata('${row._id}')">
                    <i class="fa fa-edit fa-sm"></i>
                    </span>
                    <span class="btn btn-default" onclick="deleteScriptdata('${row._id}')">
                    <i class="fa fa-trash fa-sm"></i>
                    </span>`];
            }
        }]
    });
}

function newScriptdata() {
    postData(`/api/common?db=scriptdata`, {
        script: document.getElementById("inlineFormCustomSelect").value,
        campo1: document.getElementById('scriptdataCampo1').value,
        campo2: document.getElementById('scriptdataCampo2').value,
        campo3: document.getElementById('scriptdataCampo3').value,
        campo4: document.getElementById('scriptdataCampo4').value
    }).then((data) => {
        notify(locale().SCRIPT_DATA.NOTIFY.POST.SUCCESS);
        cleanScriptdataModal();
    }).catch((error) => {
        notify(locale().SCRIPT_DATA.NOTIFY.ERROR, 'danger');
    });
}

function setForUpdateScriptdata(id) {
    getData(`/api/common/${id}?db=scriptdata`).then(edit => {
        document.getElementById('scriptdataId').value = id;
        document.getElementById('scriptdataCampo1').value = edit.campo1;
        document.getElementById('scriptdataCampo2').value = edit.campo2;
        document.getElementById('scriptdataCampo3').value = edit.campo3;
        document.getElementById('scriptdataCampo4').value = edit.campo4;
        openScriptdataModalEdit();
    });
}

function updateScriptdata() {
    let id = document.getElementById('scriptdataId').value;
    putData(`/api/common/${id}?db=scriptdata`, {
        script: document.getElementById("inlineFormCustomSelect").value,
        campo1: document.getElementById('scriptdataCampo1').value,
        campo2: document.getElementById('scriptdataCampo2').value,
        campo3: document.getElementById('scriptdataCampo3').value,
        campo4: document.getElementById('scriptdataCampo4').value
    }).then((data) => {
        notify(locale().SCRIPT_DATA.NOTIFY.UPDATE.SUCCESS);
        cleanScriptdataModal();
    })
        .catch((error) => {
            notify(locale().SCRIPT_DATA.NOTIFY.ERROR, 'danger');
        });
}

function deleteScriptdata(id) {
    deleteData(`/api/common/${id}?db=scriptdata`)
        .then((data) => {
            notify(locale().SCRIPT_DATA.NOTIFY.DELETE.SUCCESS);
        })
        .catch((error) => {
            notify(locale().SCRIPT_DATA.NOTIFY.ERROR, 'danger');
        });
    $('#listadoScriptdata').bootstrapTable('refresh');
}

function modalTitle(id, title) {
    document.getElementById(id).innerText = title;
}

function cleanScriptdataModal() {
    document.getElementById('scriptdataId').value = "";
    document.getElementById('scriptdataCampo1').value = "";
    document.getElementById('scriptdataCampo2').value = "";
    document.getElementById('scriptdataCampo3').value = "";
    document.getElementById('scriptdataCampo4').value = "";
    modal.hide();
    $('#listadoScriptdata').bootstrapTable('refresh');
}

function openScriptdataModalAdd() {
    document.getElementById('bUpdate').style.display = 'none';
    document.getElementById('bSave').style.display = 'block';
    modalTitle('modalScriptdataLabel', `${locale().COMMON.ADD} ${locale().LISTEN.MODAL}`);
    modal = new bootstrap.Modal('#modalScriptdata', {
        keyboard: false
    })
    modal.show();
}

function openScriptdataModalEdit() {
    document.getElementById('bSave').style.display = 'none';
    document.getElementById('bUpdate').style.display = 'block';
    modalTitle('modalScriptdataLabel', `${locale().COMMON.EDIT} ${locale().LISTEN.MODAL}`);
    modal = new bootstrap.Modal('#modalScriptdata', {
        keyboard: false
    })
    modal.show();
}