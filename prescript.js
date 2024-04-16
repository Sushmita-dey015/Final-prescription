$(document).ready(function() {
	Date.prototype.calcDate = function(days) {
		let date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return `(Untill ${date.getUTCDate()}-${date.getUTCMonth() +
			1}-${date.getUTCFullYear()})`;
	};
  let timeout;
	function snackSaving() {
		let snack = document.getElementById("snacking");
		snack.className = "show";
    timeout = setTimeout(() => {
      alert('ERR: Conection timeout.')
    }, 8000);
	}
	function snackSaved() {
    clearTimeout(timeout);
		let snack = document.getElementById("snacking");
		snack.className = snack.className.replace("show", "");
		let snacked = document.getElementById("snacked");
		snacked.className = "show";
		setTimeout(function() {
			snacked.className = snacked.className.replace("show", "");
		}, 1500);
	}

// Event listener for daily taking selection
$(document).ready(function() {
    // Event listener for adding new card
    $("#add-card").click(function() {
        addMedicineCard();
    });

    // Event listener for medicine name input
    $(document).on("input", ".medicine-name", function() {
        let card = $(this).closest(".medicine-card");
        let medName = $(this).val().trim();
        if (medName !== "") {
            card.find(".daily-taking").prop("disabled", false);
        } else {
            disableFields(card);
        }
    });

    // Event listener for daily taking selection
    $(document).on("change", ".daily-taking", function() {
        let card = $(this).closest(".medicine-card");
        verifyFields(card);
    });

    // Event listener for meal selection
    $(document).on("change", ".meal", function() {
        let card = $(this).closest(".medicine-card");
        verifyFields(card);
    });

    // Event listener for duration selection
    $(document).on("change", ".duration", function() {
        let card = $(this).closest(".medicine-card");
        verifyFields(card);
    });
    // Event listener for save button
    $(document).on("click", ".save-btn", function() {
        let card = $(this).closest(".medicine-card");
		append(card);
        // Here you can add code to save the medicine details
    });

    // Event listener for remove button
    $(document).on("click", ".remove-btn", function() {
        let card = $(this).closest(".medicine-card");
        removeMedicineCard(card);
    });
});

// Function to add a new medicine card
function addMedicineCard() {
    let newCard = `
        <div class="medicine-card">
            <input class="medicine-name" type="text" placeholder="Enter medicine name">
			<select class="daily-taking">
			<option value="0">Select Dose </option>
			<option value="1+1+1">1+1+1</option>
			<option value="1+0+1">1+0+1</option>
			<option value="0+1+1">0+1+1</option>
			<option value="1+0+0">1+0+0</option>
			<option value="0+0+1">0+0+1</option>
			<option value="1+1+1+1">1+1+1+1</option>
		</select>
            <select class="meal">
			<option value="0">Select meal</option>
			<option value="before">Before meal</option>
			<option value="after">After meal</option>
			<option value="evening">Take Evening Time</option>
			<option value="anytime">Take Anytime</option>
            </select>
            <select class="duration">
			<option value="0">Select duration</option>
			<option value="15">15 days</option>
			<option value="30">30 days</option>
			<option value="60">60 days</option>
			<option value="5">5 days</option>
			<option value="7">7 days</option>
            </select>         
            <button class="btn btn-sm btn-danger remove-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
    `;
    $("#medicine-container").append(newCard);
}

// Function to verify if all fields are selected
function verifyFields(card) {
    let dailyTaking = card.find(".daily-taking").val();
    let meal = card.find(".meal").val();
    let duration = card.find(".duration").val();

    if (dailyTaking && meal && duration) {
        card.find(".save-btn").prop("disabled", false).show();
    } else {
        card.find(".save-btn").prop("disabled", true).hide();
    }
}

// Function to disable all fields except medicine name
function disableFields(card) {
    card.find(".daily-taking").prop("disabled", true).val("");
    card.find(".meal").prop("disabled", true).val("");
    card.find(".duration").prop("disabled", true).val("");
    // card.find(".save-btn").prop("disabled", true).hide();
}

// Function to remove medicine card, ensuring at least one card remains
function removeMedicineCard(card) {
    if ($("#medicine-container").children(".medicine-card").length > 1) {
        card.remove();
    } else {
        alert("At least one medicine card should be present!");
    }
}

function autocomplete(inputElement) {
    $(inputElement).autocomplete({
        source: testSuggestions,
        minLength: 1,
        delay: 0
    }).focus(function() {
        $(this).autocomplete("search", "");
    });
}

// Array containing possible autocompletion values
// var testSuggestions = [
//     "Blood Tests",
//     "Biopsy",
//     "Kidney test",
//     "Liver test",
//     "Hemoglobinuria test",
//     "CT scan",
//     "Diabetes test"
// ];

// // Initialize autocomplete on the input field
// $(document).ready(function() {
//     var testInput = document.getElementById("testInput");
//     autocomplete(testInput);
// });

// $('#add-item').on('click', function() {
//     const inputValue = $('#testInput').val().trim();
// 	// console.log(inputValue);


//     // Check if the input value is not empty
//     if (inputValue !== '') {
// 		const newinput = document.querySelectorAll('#testInput');
// 		console.log(newinput);
// 		newinput.forEach((item, testInput) => {
// 			let incrementingValue = testInput+ 1;
// 			// You can now use incrementingValue within this loop
// 			console.log("Incrementing value:", incrementingValue);
// 		});
			
		
//         const $newCard = $('<div class="Test-card">' +
// 		   '<input type="text" id="testInput"  placeholder="Type a test..." class="autocomplete-input">'+
//             '<button class="btn btn-sm btn-danger delete-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>' +
//             '</div>');

//         $('#Test-container').append($newCard);

//         setupCardActions($newCard);
//     } else {
//         alert('Please type a test before adding.');
//     }
// });

// function setupCardActions($card) {
//     $card.find('.delete-btn').on('click', function() {
//         $card.remove();
//     });
// }

var testSuggestions = [
    "Blood Tests",
    "Biopsy",
    "Kidney test",
    "Liver test",
    "Hemoglobinuria test",
    "CT scan",
    "Diabetes test"
];

function addTestField() {
    var testCardContainer = document.getElementById("testCardContainer");
    var newTestField = document.createElement("div");
    newTestField.classList.add("Test-card");

    var inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "Type a test...";
    inputField.classList.add("autocomplete");

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-sm", "btn-danger");
    deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    deleteButton.onclick = function() {
        testCardContainer.removeChild(newTestField);
    };

    newTestField.appendChild(inputField);
    newTestField.appendChild(deleteButton);

    testCardContainer.appendChild(newTestField);
}

// Populate the initial field with suggestions
var initialField = document.getElementById("testInput");
initialField.setAttribute("list", "testSuggestions");
var datalist = document.createElement("datalist");
datalist.id = "testSuggestions";
testSuggestions.forEach(function(suggestion) {
    var option = document.createElement("option");
    option.value = suggestion;
    datalist.appendChild(option);
});
initialField.parentNode.insertBefore(datalist, initialField.nextSibling);

});


	
	

	
	
	
