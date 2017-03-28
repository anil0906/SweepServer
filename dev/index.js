    (function() {
      console.log('on page load');
      var getSelectedItem = function(operationType) {
        var mapping = window.mapping;
        var selectedItem = mapping.find(function(item) {
            return item.operation === operationType;
        });
        if (selectedItem) {
            return selectedItem;
        }
        return null;
    }
    document.getElementById('test-api-form').addEventListener('submit', function(event) {
        event.preventDefault();
        var connectionType = document.querySelector("input[name='connectionType']:checked").value,
            payload = document.querySelector("#payloadTextarea").value,
            url = document.getElementById('selectedUrl').innerHTML;
        if(connectionType === 'rest') {
          postData(url,payload);
        }
    })
    document.getElementById('operation-select').addEventListener('change', function(event) {
        var selectedItem = getSelectedItem(event.target.value);
        document.getElementById('payloadTextarea').value = JSON.stringify(selectedItem.payload);
        document.getElementById('selectedUrl').innerHTML = selectedItem.url;
    })
    function postData(url,payload) {
      console.log('http://localhost:3000'+url);
      $.ajax ({
          url: 'http://localhost:3000'+url,
          type: "POST",
          data: payload,
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          success: function(data, textStatus, jqXHR) {
            document.getElementById('server-response-text').innerHTML = data;
            console.log('data posted succesful with response', data, textStatus);
          },
          error( jqXHR, textStatus, errorThrown ) {
            document.getElementById('server-response-text').innerHTML = errorThrown;
            console.log('data post error', textStatus, errorThrown);
          }
      })
    }
  })();
