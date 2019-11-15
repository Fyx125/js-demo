onmessage=function (event) {
  var intArray=JSON.parse(event.data);
  var resultStr='';
  for (var i = 0; i < intArray.length; i++) {
      if (parseInt(intArray[i]) % 3 == 0) {
          if (resultStr != "") {
              resultStr+=';';
          }
          resultStr+=intArray[i];
      }
  }
  postMessage(resultStr);
  console.log(resultStr);
  close();
};