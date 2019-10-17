document.getElementById("submit").addEventListener("click", formSubmissionHandler)


//this function will be used when we assign a value to the "next arrival" column
//given the frequency of the train's arrival in minutes,
//calculate when the train will next arrive
function calculateNextArrival(train) {


    //get the current time 
    const currentTime = moment();


    //get the time since the train's first arrival
    const firstArrivalTime = moment(train.firstArrival, "hh:mm").subtract(1, "years");
    //calculate the difference
    const diffTime = currentTime.diff(moment(firstArrivalTime), "minutes")
    //find the time since the train's most recent arrival
    //difference % frequency = time since arrival
    const sinceMostRecent = diffTime % train.frequency;
    //find the time until the next arrival
    //frequency - time since most recent arrival = time until next arrival
    const timeUntilArrival = train.frequency - sinceMostRecent;
    const nextArrivalTime = moment().add(timeUntilArrival, "m").format("hh:mm");



    return {
        timeUntilArrival,
        nextArrivalTime
    };
}

function formSubmissionHandler(event) {
    const newTrain = {}
    event.preventDefault();
    const inputEls = document.getElementsByClassName("form-control");
    console.table(inputEls)
    newTrain.name = document.getElementById("name").value.trim();
    newTrain.destination = document.getElementById("destination").value.trim();
    newTrain.firstArrival = document.getElementById("first-arrival").value.trim();
    newTrain.frequency = document.getElementById("frequency").value.trim();

    console.log("this is the train we submitted:" + JSON.stringify(newTrain));


    getTrains(function (trains) {

        trains.push(newTrain);
        setTrain(trains).then(loadTable);
    })

}

function loadTable() {
    getTrains(function (trains) {
        const tbodyEl = document.getElementById("tbody");
        tbodyEl.innerHTML = "";
        console.log(trains)
        trains.forEach(function (train) {
            const rowEl = document.createElement("tr");


            const nameEl = document.createElement("td");
            const destinationEl = document.createElement("td");
            const frequencyEl = document.createElement("td");
            const nextArrivalEl = document.createElement("td");
            const minutesAwayEl = document.createElement("td");

            nameEl.innerHTML = train.name;
            destinationEl.innerHTML = train.destination;
            frequencyEl.innerHTML = train.frequency;

            const {
                timeUntilArrival,
                nextArrivalTime
            } = calculateNextArrival(train)


            minutesAwayEl.innerHTML = timeUntilArrival;
            nextArrivalEl.innerHTML = nextArrivalTime;

            rowEl.append(nameEl);
            rowEl.append(destinationEl);
            rowEl.append(frequencyEl);
            rowEl.append(nextArrivalEl);
            rowEl.append(minutesAwayEl);

            tbodyEl.append(rowEl)

        })

    })
}

loadTable();


function setTrain(train) {
    return localforage.setItem("trains", train);
}


function getTrains(cb) {
    localforage.getItem("trains").then(function (result) {
        cb(result || []); //{name, score}
    });
}