eva.controller('images', ['$scope', '$http', function ($scope, $http) {

    $scope.list = function () {
        $('#listadoImg').bootstrapTable({
            url: '/api/images',
            pagination: true,
            search: true,
            searchTimeOut: 1000,
            locale: 'es-MX',
            columns: [{
                field: 'nombre',
                title: locale().COMMON.NAME,
                sortable: true,
                searchable: true,
                align: 'left',
                width: 575,
                widthUnit: 'px',
            }, {
                width: 25,
                widthUnit: 'px',
                formatter: function (value, row, index) {
                    return [`<img src="/images/${row.nombre}" width="25" />`];
                }
            }, {
                field: 'ext',
                title: locale().IMG.FORMAT,
                sortable: true,
                width: 50,
                widthUnit: 'px',
            }, {
                title: locale().COMMON.OPTIONS,
                align: 'center',
                width: 200,
                widthUnit: 'px',
                formatter: function (value, row, index) {
                    return [`<span class="btn btn-default" onclick="deleteImg('${row.nombre}')">
                    <i class="fa fa-trash fa-sm"></i></span>`];
                }
            }]
        })
    }

    $("div#drop").dropzone({ url: "/api/images", acceptedFiles: 'image/*', timeout: 100000, maxFilesize: 100 });
    $scope.list();
}]);

function deleteImg(id) {
    if (confirm(locale().COMMON.DELETE)) {
        fetch(`/api/images/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((data) => {
                notify(locale().AUDIO.NOTIFY.DELETE.SUCCESS);
            })
            .catch((error) => {
                notify(locale().AUDIO.NOTIFY.ERROR, 'danger');
            });
        $('#listadoImg').bootstrapTable('refresh');
    }
}