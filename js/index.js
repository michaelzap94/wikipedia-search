/**
 * Created by zapatacajas on 06/07/2016.
 */
$(document).ready(function() {
  var listEntries = $("#listEntries");

  var urlApi = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
  var cb = '&callback=?';
  var pageHeader = 'https://en.wikipedia.org/?curid=';

  var form = $('#searchForm'); // contact form
  form.on('submit', function(e) {
    e.preventDefault(); // prevent default form submit

    var input = $("#searchText[type='text']").val();

    if (input !== "") {
      $("ul").html("");

      $("#containerForm").fadeOut(100, function() {
        $(this).removeClass("classMiddle");
        $("#containerForm").addClass("classTop");

      });
      $("#containerForm").fadeIn(100);

      var finalUrl = urlApi + input.toString() + cb;

      $.getJSON(finalUrl, function(dataRet) {
        var arrRes = dataRet.query.pages;
        //ITERATE OVER JSON OBJECT.
        for (var key in arrRes) {
          if (arrRes.hasOwnProperty(key)) {
            var val = arrRes[key];
            var link = pageHeader + val.pageid;
            var str = "<a href='" + link + "'><li><p><strong>" + val.title + "</strong></p>" + "<p>" + val.extract + "</p></li></a>"
            $("ul").append(str);
            $("a").attr("target", "_blank");
          }
        }
        ///////////////////////////////////////

      });

    }
  });

});