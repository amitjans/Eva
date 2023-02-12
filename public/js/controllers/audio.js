eva.controller('audio', ['$scope', '$http', function ($scope, $http) {

    $scope.list = function () {
        $('#listadoAudio').bootstrapTable({
            url: '/api/audio',
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
                width: 600,
                widthUnit: 'px',
            }, {
                field: 'ext',
                title: locale().AUDIO.FORMAT,
                sortable: true,
                searchable: true,
                align: 'left',
                width: 50,
                widthUnit: 'px',
            }, {
                field: 'duration',
                title: locale().AUDIO.DURATION,
                sortable: true,
                searchable: true,
                align: 'left',
                width: 150,
                widthUnit: 'px',
            }, {
                title: locale().COMMON.OPTIONS,
                align: 'center',
                width: 200,
                widthUnit: 'px',
                formatter: function (value, row, index) {
                    return [`<span class="btn btn-default" onclick="playAudio(${row.nombre})"><i class="fa fa-play fa-sm"></i></span>
                    <span class="btn btn-default" onclick="deleteAudio(${row.nombre})"><i class="fa fa-trash fa-sm"></i></span>`];
                }
            }]
        })
    }

    $("div#drop").dropzone({ url: "/api/audio", acceptedFiles: '.wav', timeout: 100000, maxFilesize: 100 });
    $scope.list();
}]);

function playAudio(id) {
    postData('/nodes', { type: 'sound', src: id });
}

function deleteAudio(id) {
    fetch(`/api/audio/${id}`, {
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
    $('#listadoAudio').bootstrapTable('refresh');
}