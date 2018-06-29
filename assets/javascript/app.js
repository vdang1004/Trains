// Initialize Firebase
var config = {
    apiKey: "AIzaSyCe3LTQhY0O4fwbJWIG8b5BeWjSilJSx-g",
    authDomain: "train-howework.firebaseapp.com",
    databaseURL: "https://train-howework.firebaseio.com",
    projectId: "train-howework",
    storageBucket: "train-howework.appspot.com",
    messagingSenderId: "572254181230"
  };

  firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTime = 0;
var frequency = "";

$("#submit-Button").on("click", function(event) {
    event.preventDefault();
    
    trainName = $("#trainName-Input").val().trim();
    destination = $("#destination-Input").val().trim();
    firstTime = $("#firstTime-Input").val().trim();
    frequency = $("#frequency-Input").val().trim();
    // Code for the push
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    
    $('#trainName-Input').val("");
	$('#destination-Input').val("");
	$('#firstTime-Input').val("");
    $('#frequency-Input').val("");
   
});

database.ref().on("child_added", function(childSnapshot) {
    
    var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;
    
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTime);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().joinDate);


    
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	// console.log(firstTimeConverted);

	//current time
	var currentTime = moment();
	// console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	//difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	// console.log("DIFFERENCE IN TIME: " + diffTime);

	//time apart (remainder)
	var tRemainder = diffTime % frequency;
	// console.log(tRemainder);

	//minute until train
	var tMinutesTillTrain = frequency - tRemainder;
	// console.log("MINUTES TIL TRAIN: " + tMinutesTillTrain);

	//next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainConverted = moment(nextTrain).format("hh:mm a");
	// console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

	//add data into the table
	$("#mainTable").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");
          
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });