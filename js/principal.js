$(function () {
    var token = localStorage.getItem('token');
    mePlayList(token);
});

function mePerfil(token) {
    $.get({ url: 'https://api.spotify.com/v1/me', headers: { Authorization: 'Bearer ' + token } })
        .done(function (response) {
            console.log('cargar los datos personales');
        })
        .fail(function (error) {
            alert('No se ha podido cargar los datos personales: ' + error.responseText);
        });
}

function mePlayList(token) {
    $('article').remove();
    $.get({ url: 'https://api.spotify.com/v1/me/playlists', headers: { Authorization: 'Bearer ' + token } })
        .done(function (response) {
            $.each(response.items, function (i, item) {
                var urlImage = item.images.length === 0 ? null : item.images[0].url;
                agregarItem(
                    item.name,
                    urlImage,
                    'Ingresar a la Playlist',
                    item.external_urls.spotify,
                    item.id,
                    'playlist'
                );
            });
            $.notify('Access granted', { position: 'top center', className: 'success' });
        })
        .fail(function (error) {
            alert('No se ha podido cargar sus playlist: ' + error.responseText);
        });
}

function tracksForPlayList(token, idPlayList) {
    $.get({
        url: 'https://api.spotify.com/v1/playlists/' + idPlayList + '/tracks',
        headers: { Authorization: 'Bearer ' + token },
    })
        .done(function (response) {
            console.log(response);
            localStorage.setItem('canciones', JSON.stringify(response));
            $.each(response.items, function (i, item) {
                var nameArtist = ' - ',
                    urlNameArtist = $('<li/>');
                if (item.artists.length > 0) {
                    $.each(item.artists, function (i, artist) {
                        nameArtist += i == 0 ? artist.name : ', ' + artist.name;
                        urlNameArtist.append(
                            $('<span/>').text(i == 0 ? ', ' : ''),
                            $('<a/>').text(artist.name).attr({ target: '_blank', href: artist.external_urls })
                        );
                    });
                }
                $('.prl-articles').append(
                    $('<li/>')
                        .append(
                            $('<a/>')
                                .text(item.tracks.name + nameArtist)
                                .attr({ target: '_blank', href: item.tracks.external_urls })
                        )
                        .attr({ title: 'Pista ' + item.tracks.name + ' en Spotify' })
                );
            });
        })
        .fail(function (error) {
            alert('No se ha podido cargar sus playlist: ' + error.responseText);
        });
}

function deletePlaylist(playList) {
    var settings = {
        url: `https://api.spotify.com/v1/playlists/${playList}/followers`,
        method: 'DELETE',
        timeout: 0,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };

    $.ajax(settings).done(function () {
        $(`#${playList}`).closest('article').hide(500);
    });
}
