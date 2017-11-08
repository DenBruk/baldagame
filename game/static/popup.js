 $(document).ready(function(){
        //Скрыть PopUp при загрузке страницы
        PopUpHide();
        PopUp2Hide();
        //PopUpStartHide();

    });
    //Функция отображения PopUp
    function PopUpShow(){
        $("#popup1").show();
    }
    //Функция скрытия PopUp
    function PopUpHide(){
        $("#popup1").hide();
    }

    function PopUp2Show(){
        $("#popup2").show();
    }

    function PopUp2Hide(){
        $("#popup2").hide();
    }

    function PopUpStart(){
        $("#popupStart").show();
    }

    function PopUpStartHide(){
        $("#popupStart").hide();
    }