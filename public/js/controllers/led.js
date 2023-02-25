eva.controller('led', ['$scope', '$http', function ($scope, $http) {

    $scope.list = function () {
        $('#listadoLeds').bootstrapTable({
            url: '/api/common?db=led',
            pagination: true,
            search: true,
            searchTimeOut: 1000,
            locale: 'es-MX',
            columns: [{
                field: 'name',
                title: locale().COMMON.NAME,
                sortable: true,
                searchable: true,
                align: 'left',
                width: 700,
                widthUnit: 'px'
            }, {
                field: 'bucle',
                title: locale().LED.LOOP,
                width: 100,
                widthUnit: 'px',
                formatter: function (value, row, index) {
                    return [`${row.bucle ? '<i class="fa-solid fa-repeat"></i>' : '<i class="fa-solid fa-1"></i>'}`];
                }
            }, {
                title: locale().COMMON.OPTIONS,
                align: 'center',
                width: 200,
                widthUnit: 'px',
                formatter: function (value, row, index) {
                    return [`<span class="btn btn-default hand" id="${row._id}" onclick="executeById(this)"><i class="fa fa-play fa-sm"></i></span>
                    <a class="btn btn-default hand" href="/#!/lededitor/${row._id}"><i class="fa-solid fa-pen-to-square"></i></a>
                    <span class="btn btn-default hand" onclick="deleteLed('${row._id}')"><i class="fa fa-trash fa-sm"></i></span>`];
                }
            }]
        })
    }
    $scope.list();
}]);

function deleteLed(id) {
    fetch(`/api/common/${id}?db=led`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json())
        .then((data) => {
            notify(locale().LED.NOTIFY.DELETE.SUCCESS);
        })
        .catch((error) => {
            notify(locale().LED.NOTIFY.ERROR, 'danger');
        });
    $('#listadoLeds').bootstrapTable('refresh');
}