
/*$("#confirmWord-btn").click(function () {
$.ajax({
    type:"GET",
    url: "/balda/confirmWord/",
    data: {
        'word': $("#confirmWordField").val(),
    },

    dataType: "Text",

    cache: false,

    success: function(data) {
        if (data == 'yes') {
            alert('yes')
        }


    }


});

});

var myVar
$("#conf").click(function() {
$.get(
  "/balda/confirmWord",
  {
    param: "1",
  },
onAjaxSuccess
);
});

function onAjaxSuccess(data)
{
  console.log(data)
}

setInterval(function() {
  //каждые 2 секунды запрашиваем данные у серва на изменение переменной

    $.get(
  "/balda/confirmWord",
  {
    param: "2",
  },
  onAjaxSuccess
);

   //все что будет внутри - будет выполняться постоянно
}, 2000)

*/