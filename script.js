
//this function will be used when we assign a value to the "next arrival" column
function calculateNextArrival(placeholderParam){

}





function setTrain(train) {
    localforage.setItem("trains", train)
}


function getTrains(cb) {
    localforage.getItem("trains").then(function (result) {
      cb(result || []); //{name, score}
    });
  }