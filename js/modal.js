$(function () {
    var modal = $('#myModal');

    var btn = $('#myBtn');

    var span = $('#idCancelar, .close');

    // window.onclick = function (event) {
    //     console.log(object);
    //     if (event.target == modal) {
    //         close();
    //     }
    // };
    span.click(() => modal.hide(1000));

    btn.click(() => modal.show('slow'));
    $('#enviar').click(function () {
        let modal = $('#modal');
        let data = {};

        modal.find('input').each(function () {
            if (this.type === 'checkbox') {
                data[`${this.name}`] = this.checked;
            } else {
                data[`${this.name}`] = this.value;
            }
        });
        crearPlaylist(data);
    });
});