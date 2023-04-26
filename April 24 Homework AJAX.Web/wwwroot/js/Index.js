$(() => {

    const modal = new bootstrap.Modal($('.modal')[0]);

    function refreshTable() {
        $("tbody").empty();
        $.get('/home/getpeople', function (people) {
            people.forEach(function (person) {
                $("tbody").append(`<tr>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.age}</td>
            <td>
                <button class="btn btn-warning" id="edit-button" data-id="${person.id}">Edit</button>
                <button class="btn btn-danger" id="delete-button" data-id="${person.id}">Delete</button>
            </td>
            </tr>`)
            });
        });
    }

    refreshTable();

    $("#add-person").on('click', function () {
        resetModal();
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        modal.show();
    });

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();

        $.post('/home/addperson', { firstName, lastName, age }, function () {
            modal.hide();
            refreshTable();
        });
    });

    $("tbody").on('click', '#edit-button', function () {
        const id = $(this).data('id');
        $.get('/home/getpersonbyid', { id }, function (person) {
            $("#firstName").val(person.firstName);
            $("#lastName").val(person.lastName);
            $("#age").val(person.age);
            $("#save-person").attr('id', 'update-person')
            $(".modal-title").text('Edit Person');
            $("#update-person").text('Update');
           modal.show();
        });
    });

    function resetModal() {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        $('.modal-title').text('Add Person')
        $('#update-person').attr('id', 'save-person')
        $('#save-person').text('Save')
    };


    $("#edit-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();
        const id = $("#edit-person").data('id');

        $.post('/home/updateperson', { firstName, lastName, age, id }, function () {
            modal.hide();
            refreshTable();
        });
    });

    $("tbody").on('click', '#delete-button', function () {
        const id = $(this).data('id');
        $.post('/home/deleteperson', { id }, function () {
            refreshTable();
        });
    });
})