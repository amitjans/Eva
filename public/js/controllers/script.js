eva.controller("script", ["$scope", "$http", function ($scope, $http) {
  $scope.list = function () {
    $('#listadoScript').bootstrapTable({
      url: '/api/common?db=script',
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
        width: 500,
        widthUnit: 'px',
      }, {
        title: locale().COMMON.OPTIONS,
        align: 'center',
        width: 200,
        widthUnit: 'px',
        formatter: function (value, row, index) {
          return [`<a class="btn btn-default" href="/#!/scriptdata/${row._id}">
          <span class="fa fa-list"></span>
          </a>
          <span class="btn btn-default" onclick="setForUpdateScript('${row._id}')">
          <i class="fa fa-edit fa-sm"></i>
          </span>
          <span class="btn btn-default" onclick="deleteScript('${row._id}')">
          <i class="fa fa-trash fa-sm"></i>
          </span>`];
        }
      }]
    })
  };
  $scope.list();
},
]);

function newScript() {
  postData(`/api/common?db=script`, {
    nombre: document.getElementById('scriptNombre').value,
  }).then((data) => {
    notify(locale().SCRIPT.NOTIFY.POST.SUCCESS);
    cleanScriptModal();
  })
    .catch((error) => {
      notify(locale().SCRIPT.NOTIFY.ERROR, 'danger');
    });
}

function setForUpdateScript(id) {
  getData(`/api/common/${id}?db=script`).then(edit => {
    document.getElementById('scriptId').value = id;
    document.getElementById('scriptNombre').value = edit.nombre;
    openScriptModalEdit();
  });
}

function updateScript() {
  let id = document.getElementById('scriptId').value;
  putData(`/api/common/${id}?db=script`, {
    nombre: document.getElementById('scriptNombre').value
  }).then((data) => {
    notify(locale().SCRIPT.NOTIFY.UPDATE.SUCCESS);
    cleanScriptModal();
  })
    .catch((error) => {
      notify(locale().SCRIPT.NOTIFY.ERROR, 'danger');
    });
}

function deleteScript(id) {
  deleteData(`/api/common/${id}?db=script`)
    .then((data) => {
      notify(locale().SCRIPT.NOTIFY.DELETE.SUCCESS);
    })
    .catch((error) => {
      notify(locale().SCRIPT.NOTIFY.ERROR, 'danger');
    });
  $('#listadoScript').bootstrapTable('refresh');
}

function modalTitle(id, title) {
  document.getElementById(id).innerText = title;
}

function cleanScriptModal() {
  document.getElementById('scriptId').value = "";
  document.getElementById('scriptNombre').value = "";
  modal.hide();
  $('#listadoScript').bootstrapTable('refresh');
}

function openScriptModalAdd() {
  document.getElementById('bUpdate').style.display = 'none';
  document.getElementById('bSave').style.display = 'block';
  modalTitle('modalScriptLabel', `${locale().COMMON.ADD} ${locale().SCRIPT.MODAL}`);
  modal = new bootstrap.Modal('#modalScript', {
    keyboard: false
  })
  modal.show();
}

function openScriptModalEdit() {
  document.getElementById('bSave').style.display = 'none';
  document.getElementById('bUpdate').style.display = 'block';
  modalTitle('modalScriptLabel', `${locale().COMMON.EDIT} ${locale().LISTEN.MODAL}`);
  modal = new bootstrap.Modal('#modalScript', {
    keyboard: false
  })
  modal.show();
}
