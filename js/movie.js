let $select = {
    body: $('body'),
    overlay: $('#blackout'),
    modal: $('#trailerModal'),
    showButton: $('#showTrailer'),
    hideButton: $('#hideTrailer')
}

let play = {
    obj: null,
    query: {
        autoplay: 1,
        controls: 0,
        iv_load_policy: 3
    }
}

/* $select.showButton.click(()=>{
    showPlayer();
}); */


$select.showButton.click(showPlayer);
$select.hideButton.click(hidePlayer);

function setPlayer(id) {
    play.obj = new YT.Player('trailer', { //#trailer를 불러서 사용
        videoId: id,
        playerVars: play.query
    });

    resizePlayer();
}

function resizePlayer() {
    let viewport_w = $(window).width(); // 현재화면의 넓이
    let viewport_h = $(window).height(); // 현재화면의 높이

    let frame_w = viewport_w; //16
    let frame_h = viewport_w / 1.6; //10

    let modal_t = (viewport_h - frame_h)/2 + "px";
    let modal_l = 0;
    
    $select.modal.css({top:modal_t, lefr: modal_l})
    play.obj.setSize(frame_w, frame_h);

    //리사이즈 : 화면이 회전이 되거나 화면의 사이즈를 바꿀때 다시 설정
    $(window).on("resize orientationchange", function () {
        resizePlayer();
    })
}

function showPlayer() {
    if (!play.obj) {
        setPlayer($select.showButton.data('youtube'));
    }

    // console.log(showPlayer);

    $select.overlay.show();
}

function hidePlayer() {
    play.obj.stopVideo();
    $select.overlay.hide();
}