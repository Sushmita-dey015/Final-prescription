document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add');
    const symptomsContainer = document.getElementById('symptoms-container');

    const symptomsInput = document.getElementById('symptoms');

    symptomsInput.addEventListener('input', function() {
        addButton.disabled = symptomsInput.value.trim() === '';
    });

    addButton.addEventListener('click', function() {
        const symptomName = symptomsInput.value.trim();
        if (symptomName !== '') {
            createSymptomsCard(symptomName);
            symptomsInput.value = ''; // Clear the input field after creating the symptom card
            addButton.disabled = true; // Disable add button after adding symptom
        }
    });

    function createSymptomsCard(symptomName) {
        const symptomCard = document.createElement('div');
        symptomCard.classList.add('symptom-card');

        const symptomInput = document.createElement('input');
        symptomInput.setAttribute('class', 'symptoms-name'); // Set CSS class to 'symptoms-name'
        symptomInput.setAttribute('value', symptomName); // Set the value of the input (if needed)
        symptomInput.setAttribute('readonly', true);



        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-sm btn-danger delete-btn'; // Set button CSS classes
        removeButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
     

        removeButton.addEventListener('click', function() {
            if (symptomsContainer.children.length > 1) {
                symptomCard.remove();
                addButton.disabled = false; // Enable add button when a symptom is removed
            } else {
                alert('At least one symptom is required!');
            }
        });

        symptomCard.appendChild(symptomInput);
        symptomCard.appendChild(removeButton);
        symptomsContainer.appendChild(symptomCard);
    }
});
